const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const path = require('path');

function compareAppFiles(event, app, appFiles) {
  const outdatedFilePaths = [];
  appFiles.forEach(appFile => {
    const localFilePath = getLocalFilePath(app, appFile);
    let isFileUpToDate = false;
    if (fs.existsSync(localFilePath)) {
      const buffer = fs.readFileSync(localFilePath);
      const checksumSha256 = getChecksumSha256(buffer);
      if (checksumSha256 === appFile.checksumSha256) {
        isFileUpToDate = true;
      }
    }
    if (!isFileUpToDate) {
      outdatedFilePaths.push(appFile.path);
    }
  });
  event.reply('appFilesCompared', app.id, outdatedFilePaths);
}

function getLocalFilePath(app, appFile) {
  return './apps/' + app.name + '/' + appFile.path;
}

function getChecksumSha256(data) {
  return crypto
    .createHash('sha256')
    .update(data, 'utf8')
    .digest()
    .toString('base64');
}

function updateAppFiles(event, app, outdatedAppFiles) {
  downloadAppFiles(app, outdatedAppFiles, 0, () => {
    event.reply('appFilesUpdated', app.id);
  }, () => {
    event.reply('appFilesUpdateError', app.id);
  });
}

function downloadAppFiles(app, outdatedAppFiles, currentFileIndex, finishedCallback, errorCallback) {
  const appFile = outdatedAppFiles[currentFileIndex];
  downloadFile("http://localhost:8080/api/apps/file/" + appFile.id, './apps/' + app.name + '/' + appFile.path, (error) => {
    if (error) {
      errorCallback();
    }
    const newFileIndex = (currentFileIndex + 1);
    if (newFileIndex < outdatedAppFiles.length) {
      downloadAppFiles(app, outdatedAppFiles, currentFileIndex + 1, finishedCallback);
    } else {
      finishedCallback();
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

function startApp(event, app) {
  console.log('startApp ' + app.name);
}

module.exports = { compareAppFiles, updateAppFiles, startApp };
