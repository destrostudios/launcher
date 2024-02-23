const childProcess = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');
const stream = require('stream');

function compareAppFiles(event, app, appFilesResponse, userDataPath) {
  const outdatedFileIds = [];
  const localFilesToBeDeleted = [];
  const localAppDirectoryPath = getLocalFilePath(userDataPath, app, '');
  let localFilePaths = getAllFilePaths(localAppDirectoryPath, '');
  checkNextLocalFileForDeletion(
    localFilePaths,
    appFilesResponse,
    0,
    (localFilePath) => {
      localFilesToBeDeleted.push(localFilePath);
    },
    () => {
      compareNextAppFile(
        app,
        appFilesResponse.files,
        userDataPath,
        0,
        (appFile) => {
          outdatedFileIds.push(appFile.id);
        },
        () => {
          console.log(
            'Comparison results "' +
              app.name +
              '": ' +
              outdatedFileIds.length +
              ' outdated files, ' +
              localFilesToBeDeleted.length +
              ' files to be deleted',
          );
          event.reply(
            'appFilesCompared',
            app.id,
            outdatedFileIds,
            localFilesToBeDeleted,
          );
        },
      );
    },
  );
}

function getAllFilePaths(baseDirectory, directoryPath) {
  const filePaths = [];
  if (fs.existsSync(baseDirectory + directoryPath)) {
    addAllFilePaths(baseDirectory, directoryPath, filePaths);
  }
  return filePaths;
}

function addAllFilePaths(baseDirectory, directoryPath, dest) {
  const files = fs.readdirSync(baseDirectory + directoryPath);
  files.forEach((file) => {
    const filePath = directoryPath + file;
    if (fs.statSync(baseDirectory + filePath).isDirectory()) {
      addAllFilePaths(baseDirectory, filePath + '/', dest);
    } else {
      dest.push(filePath);
    }
  });
}

function checkNextLocalFileForDeletion(
  localFilePaths,
  appFilesResponse,
  currentFileIndex,
  shouldBeDeletedCallback,
  finishedCallback,
) {
  if (currentFileIndex < localFilePaths.length) {
    const localFilePath = localFilePaths[currentFileIndex];
    if (
      appFilesResponse.protections.indexOf(localFilePath) === -1 &&
      !appFilesResponse.files.some((appFile) => appFile.path === localFilePath)
    ) {
      shouldBeDeletedCallback(localFilePath);
    }
    checkNextLocalFileForDeletion(
      localFilePaths,
      appFilesResponse,
      currentFileIndex + 1,
      shouldBeDeletedCallback,
      finishedCallback,
    );
  } else {
    finishedCallback();
  }
}

function compareNextAppFile(
  app,
  appFiles,
  userDataPath,
  currentFileIndex,
  isOutdatedCallback,
  finishedCallback,
) {
  if (currentFileIndex < appFiles.length) {
    const appFile = appFiles[currentFileIndex];
    const localFilePath = getLocalFilePath(userDataPath, app, appFile.path);
    getChecksumSha256(localFilePath, (checksumSha256) => {
      if (checksumSha256 !== appFile.checksumSha256) {
        isOutdatedCallback(appFile);
      }
      compareNextAppFile(
        app,
        appFiles,
        userDataPath,
        currentFileIndex + 1,
        isOutdatedCallback,
        finishedCallback,
      );
    });
  } else {
    finishedCallback();
  }
}

function getChecksumSha256(filePath, callback) {
  const source = fs.createReadStream(filePath);
  const hash = crypto.createHash('sha256');
  stream.pipeline(source, hash, (error) => {
    callback(error ? null : hash.digest().toString('base64'));
  });
}

function updateAppFiles(
  event,
  app,
  outdatedAppFiles,
  localFilesToBeDeleted,
  userDataPath,
) {
  const updateFinishedCallback = (error) => {
    if (error) {
      console.error('Error while updating app ' + app.name + ':');
      console.error(error);
      event.reply('appFilesUpdateError', app.id, error);
    } else {
      event.reply('appFilesUpdated', app.id);
    }
  };
  deleteNextLocalFile(app, localFilesToBeDeleted, userDataPath, 0, (error) => {
    if (error) {
      updateFinishedCallback(error);
    } else {
      let totalBytesToDownload = getTotalBytes(outdatedAppFiles);
      let totalBytesDownloaded = 0;
      downloadNextAppFile(
        app,
        outdatedAppFiles,
        userDataPath,
        0,
        (downloadedBytes) => {
          totalBytesDownloaded += downloadedBytes;
          event.reply(
            'appFilesUpdateProgress',
            app.id,
            totalBytesDownloaded / totalBytesToDownload,
          );
        },
        updateFinishedCallback,
      );
    }
  });
}

function deleteNextLocalFile(
  app,
  localFilesToBeDeleted,
  userDataPath,
  currentFileIndex,
  finishedCallback,
) {
  if (currentFileIndex < localFilesToBeDeleted.length) {
    const localFilePath = getLocalFilePath(
      userDataPath,
      app,
      localFilesToBeDeleted[currentFileIndex],
    );
    console.log('Deleting file: "' + localFilePath + '"');
    fs.unlink(localFilePath, (error) => {
      if (error) {
        finishedCallback(error);
      } else {
        deleteNextLocalFile(
          app,
          localFilesToBeDeleted,
          userDataPath,
          currentFileIndex + 1,
          finishedCallback,
        );
      }
    });
  } else {
    finishedCallback();
  }
}

function getTotalBytes(appFiles) {
  let totalBytes = 0;
  appFiles.forEach((appFile) => {
    totalBytes += appFile.sizeBytes;
  });
  return totalBytes;
}

function downloadNextAppFile(
  app,
  outdatedAppFiles,
  userDataPath,
  currentFileIndex,
  downloadedBytesCallback,
  finishedCallback,
) {
  if (currentFileIndex < outdatedAppFiles.length) {
    const appFile = outdatedAppFiles[currentFileIndex];
    const url = 'https://destrostudios.com' + getAppFilePath(app, appFile.path);
    const localFilePath = getLocalFilePath(userDataPath, app, appFile.path);
    downloadFile(url, localFilePath, downloadedBytesCallback, (error) => {
      if (error) {
        finishedCallback(error);
      } else {
        downloadNextAppFile(
          app,
          outdatedAppFiles,
          userDataPath,
          currentFileIndex + 1,
          downloadedBytesCallback,
          finishedCallback,
        );
      }
    });
  } else {
    finishedCallback();
  }
}

function downloadFile(
  url,
  destination,
  downloadedBytesCallback,
  finishedCallback,
) {
  createDirectoryIfNotExisting(destination);
  const file = fs.createWriteStream(destination);
  console.log('Downloading file: "' + url + '" --> "' + destination + '"');
  https
    .get(url, (response) => {
      response
        .on('data', (chunk) => {
          file.write(chunk);
          downloadedBytesCallback(chunk.length);
        })
        .on('end', () => {
          file.end();
          finishedCallback(null);
        });
    })
    .on('error', (error) => {
      fs.unlink(destination, () => {
        finishedCallback(error);
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
  const executeCommand =
    'cd "' + localAppDirectoryPath + '" & ' + app.executable + ' ' + authToken;
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
