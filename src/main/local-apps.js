const childProcess = require("child_process");
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

function compareAppFiles(event, app, appFiles, userDataPath) {
  const outdatedFileIds = [];
  compareNextAppFile(app, appFiles, userDataPath, 0, (appFile, isUpToDate) => {
    if (!isUpToDate) {
      outdatedFileIds.push(appFile.id);
    }
  }, () => {
    console.log('Comparison results "' + app.name + '": ' + outdatedFileIds.length + ' outdated files');
    event.reply('appFilesCompared', app.id, outdatedFileIds);
  });
}

function compareNextAppFile(app, appFiles, userDataPath, currentFileIndex, isUpToDateCallback, finishedCallback) {
  const appFile = appFiles[currentFileIndex];
  const localFilePath = getLocalFilePath(userDataPath, app, appFile.path);
  fs.readFile(localFilePath, (error, data) => {
    let isUpToDate = false;
    if (!error) {
      const checksumSha256 = getChecksumSha256(data);
      if (checksumSha256 === appFile.checksumSha256) {
        isUpToDate = true;
      }
    }
    isUpToDateCallback(appFile, isUpToDate);

    const newFileIndex = (currentFileIndex + 1);
    if (newFileIndex < appFiles.length) {
      compareNextAppFile(app, appFiles, userDataPath, currentFileIndex + 1, isUpToDateCallback, finishedCallback);
    } else {
      finishedCallback();
    }
  });
}

function getChecksumSha256(data) {
  return crypto
    .createHash('sha256')
    .update(data, 'utf8')
    .digest()
    .toString('base64');
}

function updateAppFiles(event, app, outdatedAppFiles, userDataPath) {
  let totalBytesToDownload = getTotalBytes(outdatedAppFiles);
  let totalBytesDownloaded = 0;
  downloadNextAppFile(app, outdatedAppFiles, userDataPath, 0, downloadedBytes => {
    totalBytesDownloaded += downloadedBytes;
    event.reply('appFilesUpdateProgress', app.id, (totalBytesDownloaded / totalBytesToDownload));
  }, error => {
    if (error) {
      console.error('Error while downloading app files of ' + app.name + ':');
      console.error(error);
      event.reply('appFilesUpdateError', app.id, error);
    } else {
      event.reply('appFilesUpdated', app.id);
    }
  });
}

function getTotalBytes(appFiles) {
  let totalBytes = 0;
  appFiles.forEach(appFile => {
    totalBytes += appFile.sizeBytes;
  });
  return totalBytes;
}

function downloadNextAppFile(app, outdatedAppFiles, userDataPath, currentFileIndex, downloadedBytesCallback, finishedCallback) {
  const appFile = outdatedAppFiles[currentFileIndex];
  const url = 'https://destrostudios.com' + getAppFilePath(app, appFile.path);
  const localFilePath = getLocalFilePath(userDataPath, app, appFile.path);
  downloadFile(url, localFilePath, downloadedBytesCallback, error => {
    if (error) {
      finishedCallback(error);
    } else {
      const newFileIndex = (currentFileIndex + 1);
      if (newFileIndex < outdatedAppFiles.length) {
        downloadNextAppFile(app, outdatedAppFiles, userDataPath, currentFileIndex + 1, downloadedBytesCallback, finishedCallback);
      } else {
        finishedCallback();
      }
    }
  })
}

function downloadFile(url, destination, downloadedBytesCallback, finishedCallback) {
  createDirectoryIfNotExisting(destination);
  const file = fs.createWriteStream(destination);
  console.log('Downloading file: "' + url + '" --> "' + destination + '"');
  // FIXME: LetsEncrypt deprecated their old root certificate (https://letsencrypt.org/docs/dst-root-ca-x3-expiration-september-2021)
  // The currently used electron-builder version still has an old electron dependency of 11.X - When we have 13.X with the fix, the rejectUnauthorized workaround can be removed
  https.get(url, { rejectUnauthorized: false }, response => {
    response.on('data', chunk => {
      file.write(chunk);
      downloadedBytesCallback(chunk.length);
    }).on('end', () => {
      file.end();
      finishedCallback(null);
    });
  }).on('error', error => {
    fs.unlink(destination, () => {
      finishedCallback(error.message);
    });
  });
}

function createDirectoryIfNotExisting(filePath) {
  const directory = path.dirname(filePath);
  if (fs.existsSync(directory)) {
    return;
  }
  createDirectoryIfNotExisting(directory);
  fs.mkdirSync(directory);
}

function startApp(event, app, authToken, userDataPath) {
  const localAppDirectoryPath = getLocalFilePath(userDataPath, app, '');
  const executeCommand = 'cd "' + localAppDirectoryPath + '" & ' + app.executable + ' ' + authToken;
  console.log('Starting "' + app.name + '": ' + executeCommand);
  childProcess.exec(executeCommand);
}

function getLocalFilePath(userDataPath, app, appFilePath) {
  return userDataPath + getAppFilePath(app, appFilePath);
}

function getAppFilePath(app, appFilePath) {
  return '/apps/' + app.name + '/' + appFilePath;
}

module.exports = { compareAppFiles, updateAppFiles, startApp };
