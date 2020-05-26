const childProcess = require("child_process");
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const path = require('path');

function compareAppFiles(event, app, appFiles, appDataPath) {
  const outdatedFilePaths = [];
  compareNextAppFile(app, appFiles, appDataPath, 0, (appFile, isUpToDate) => {
    if (!isUpToDate) {
      outdatedFilePaths.push(appFile.path);
    }
  }, () => {
    console.log('Comparison results "' + app.name + '": ' + outdatedFilePaths.length + ' outdated files');
    event.reply('appFilesCompared', app.id, outdatedFilePaths);
  });
}

function compareNextAppFile(app, appFiles, appDataPath, currentFileIndex, isUpToDateCallback, finishedCallback) {
  const appFile = appFiles[currentFileIndex];
  const localFilePath = getLocalFilePath(appDataPath, app, appFile.path);
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
      compareNextAppFile(app, appFiles, appDataPath, currentFileIndex + 1, isUpToDateCallback, finishedCallback);
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

function updateAppFiles(event, app, outdatedAppFiles, appDataPath) {
  downloadNextAppFile(app, outdatedAppFiles, appDataPath, 0, () => {
    event.reply('appFilesUpdated', app.id);
  }, () => {
    console.error('Error while downloading app files of ' + app.name);
    event.reply('appFilesUpdateError', app.id);
  });
}

function downloadNextAppFile(app, outdatedAppFiles, appDataPath, currentFileIndex, finishedCallback, errorCallback) {
  const appFile = outdatedAppFiles[currentFileIndex];
  const url = "http://localhost:8080/api/apps/file/" + appFile.id;
  const localFilePath = getLocalFilePath(appDataPath, app, appFile.path);
  downloadFile(url, localFilePath, error => {
    if (error) {
      errorCallback();
    } else {
      const newFileIndex = (currentFileIndex + 1);
      if (newFileIndex < outdatedAppFiles.length) {
        downloadNextAppFile(app, outdatedAppFiles, appDataPath, currentFileIndex + 1, finishedCallback);
      } else {
        finishedCallback();
      }
    }
  })
}

function downloadFile(url, destination, callback) {
  createDirectoryIfNotExisting(destination);
  const file = fs.createWriteStream(destination);
  http.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(callback);
    });
  }).on('error', error => {
    fs.unlink(destination);
    callback(error.message);
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

function startApp(event, app, appDataPath) {
  const localAppDirectoryPath = getLocalFilePath(appDataPath, app, '');
  const executeCommand = 'cd "' + localAppDirectoryPath + '" & ' + app.executable;
  console.log('Starting "' + app.name + '": ' + executeCommand);
  childProcess.exec(executeCommand);
}

function getLocalFilePath(appDataPath, app, appFilePath) {
  return appDataPath + '/destrostudios/' + app.name + '/' + appFilePath;
}

module.exports = { compareAppFiles, updateAppFiles, startApp };
