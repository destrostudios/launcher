// An async wrapping method is needed to use dynamic imports for the Electron dependencies (ESM is not supported in these versions)
async function main() {
  const { app, BrowserWindow, ipcMain } = await import('electron');
  const isDev = await import('electron-is-dev');
  const { autoUpdater } = require('electron-updater');
  const path = require('path');
  const url = require('url');

  const {
    compareAppFiles,
    startApp,
    updateAppFiles,
  } = require('./main/local-apps');

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({
      show: false,
      frame: false,
      width: 1280,
      height: 720,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        // Fixes node-related issues, should be removable once we update all dependencies
        contextIsolation: false,
      },
    });

    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.show();
      // mainWindow.webContents.openDevTools();

      if (isDev) {
        mainWindow.webContents.send('selfUpdateNotAvailable');
      } else {
        autoUpdater.checkForUpdates();
      }
    });
  }
  // Since we wrap the startup in an async wrapper, we have to use app.whenReady().then(...), instead of app.on('event', ...), because it seems like we miss the event emit timing
  app.whenReady().then(createWindow);

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

  autoUpdater.on('update-available', () =>
    mainWindow.webContents.send('selfUpdateAvailable'),
  );
  autoUpdater.on('update-not-available', () =>
    mainWindow.webContents.send('selfUpdateNotAvailable'),
  );
  autoUpdater.on('update-downloaded', () =>
    mainWindow.webContents.send('selfUpdateDownloaded'),
  );
  autoUpdater.on('error', () => mainWindow.webContents.send('selfUpdateError'));

  const userDataPath = app.getPath('userData');
  ipcMain.on('minimizeWindow', () => mainWindow.minimize());
  ipcMain.on('closeWindow', () => mainWindow.close());
  ipcMain.on('restartAndInstall', () => autoUpdater.quitAndInstall());
  ipcMain.on('compareAppFiles', (event, app, appFilesResponse) =>
    compareAppFiles(event, app, appFilesResponse, userDataPath),
  );
  ipcMain.on(
    'updateAppFiles',
    (event, app, outdatedAppFiles, localFilesToBeDeleted) =>
      updateAppFiles(
        event,
        app,
        outdatedAppFiles,
        localFilesToBeDeleted,
        userDataPath,
      ),
  );
  ipcMain.on('startApp', (event, app, authToken) =>
    startApp(event, app, authToken, userDataPath),
  );
}

main();
