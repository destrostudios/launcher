const {app, BrowserWindow, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');
const path = require('path');
const url = require('url');

const {compareAppFiles, startApp, updateAppFiles} = require('./main/local-apps');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    width: 1280,
    height: 720,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on('update-available', () => mainWindow.webContents.send('selfUpdateAvailable'));
autoUpdater.on('update-not-available', () => mainWindow.webContents.send('selfUpdateNotAvailable'));
autoUpdater.on('update-downloaded', () => mainWindow.webContents.send('selfUpdateDownloaded'));
autoUpdater.on('error', () => mainWindow.webContents.send('selfUpdateError'));

const userDataPath = app.getPath('userData');
ipcMain.on('minimizeWindow', () => mainWindow.minimize());
ipcMain.on('closeWindow', () => mainWindow.close());
ipcMain.on('restartAndInstall', () => autoUpdater.quitAndInstall());
ipcMain.on('compareAppFiles', (event, app, appFiles) => compareAppFiles(event, app, appFiles, userDataPath));
ipcMain.on('updateAppFiles', (event, app, outdatedAppFiles) => updateAppFiles(event, app, outdatedAppFiles, userDataPath));
ipcMain.on('startApp', (event, app) => startApp(event, app, userDataPath));
