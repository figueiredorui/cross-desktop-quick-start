const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const autoUpdater = electron.autoUpdater

const path = require('path')
const url = require('url')
const os = require('os');

var apiProcess = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var isDevelopment = true;// process.env.NODE_ENV === 'development';

var feedURL = "";

initAutoUpdaterEvents();

function createWindow() {
  writeLog('createWindow');
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app\\index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  checkForUpdates();
}

function startApi() {
  var proc = require('child_process').spawn;
  //  run server
  var apipath = path.join(__dirname, '..\\Api\\bin\\Debug\\netcoreapp1.1\\win10-x64\\publish\\Api.exe')
  if (os.platform() === 'darwin') {
    apipath = path.join(__dirname, '..//Api//bin//Debug//netcoreapp1.1//osx.10.11-x64//publish//Api')
  }
  apiProcess = proc(apipath)

  apiProcess.stdout.on('data', (data) => {
    writeLog(`stdout: ${data}`);
    if (mainWindow == null) {
      createWindow();
    }
  });

  apiProcess.stderr.on('data', (data) => {
    writeLog(`stderr: ${data}`);
  });

  apiProcess.on('close', (code) => {
    writeLog(`child process exited with code ${code}`);
  });

  writeLog('server running ' + os.platform())
}

function initAutoUpdaterEvents() {
  var updateFeed = 'http://localhost:3000/updates/latest';    

  // Don't use auto-updater if we are in development 
  if (!isDevelopment) {
    if (os.platform() === 'darwin') {
      updateFeed = updateFeed + '/mac';
    }
    else if (os.platform() === 'win32') {
      updateFeed = updateFeed + '/win' + (os.arch() === 'x64' ? '64' : '32');
    }

    autoUpdater.addListener("update-available", function (event) {
     writeLog("A new update is available");
      if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-available');
      }
    });
    autoUpdater.addListener("update-downloaded", function (event, releaseNotes, releaseName, releaseDate, updateURL) {
     writeLog("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`);
      if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-downloaded');
      }
    });
    autoUpdater.addListener("error", function (error) {
      writeLog(error);
      if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-error');
      }
    });
    autoUpdater.addListener("checking-for-update", function (event) {
     writeLog("Checking for update");
      if (mainWindow) {
        mainWindow.webContents.send('update-message', 'checking-for-update');
      }
    });
    autoUpdater.addListener("update-not-available", function () {
     writeLog("Update not available");
      if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-not-available');
      }
    });

    const appVersion = require('./package.json').version;
    const feedURL = updateFeed + '?v=' + appVersion;
    writeLog("setFeedURL: " + feedURL);
    autoUpdater.setFeedURL(feedURL);
  }
}

function checkForUpdates(){
  if (!isDevelopment) {
        mainWindow.webContents.on('did-frame-finish-load', function() {
            writeLog("Checking for updates: " + feedURL);
            autoUpdater.checkForUpdates();
        });
    }
}

function writeLog(msg){
  console.log(msg);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  startApi();
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    writeLog('activate')
    createWindow()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
    apiProcess.kill();
  }
})

process.on('exit', function () {
  writeLog('exit');
  apiProcess.kill();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
