const fs = require('fs');
const SftpClient = require('ssh2-sftp-client');
const deploymentConfig = require('../config');

let sftpClient = new SftpClient();
sftpClient.connect(deploymentConfig.serverCredentials).then(() => {
  uploadFiles(sftpClient).then(() => {
    console.log('\nDeployed sucessfully.');
    // TODO: The uploads aren't finished here yet (although the returned promises say so...), so we can't exit
    // Find another way to listen for the finished upload or use another library
    //process.exit();
  });
}).catch((error) => {
  throw error;
});

function uploadFiles(sftpClient) {
  console.log('\nUploading files...');

  let localFiles = getAllFiles(deploymentConfig.localDirectory);
  let previousUploadPromise = Promise.resolve();
  localFiles.forEach((filePath) => {
    previousUploadPromise.then(() => {
      let relativeFilePath = filePath.substring(deploymentConfig.localDirectory.length);
      console.log(relativeFilePath);
      previousUploadPromise = sftpClient.put(filePath, deploymentConfig.remoteDirectory + relativeFilePath);
    });
  });

  return previousUploadPromise.then(() => {
    console.log('Uploaded files.');
  });
}

function getAllFiles(directoryPath, files = []) {
  let directoryFiles = fs.readdirSync(directoryPath);
  directoryFiles.forEach((fileName) => {
    let filePath = directoryPath + fileName;
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath + '/', files);
    } else {
      files.push(filePath);
    }
  });
  return files;
}
