const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const os = require('os');
var proc = require('child_process').spawn;
var p = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  console.log('createWindow');
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


}

function startApi() {
  //  run server
  var apipath = path.join(__dirname, '..\\Api\\bin\\Debug\\netcoreapp1.1\\win10-x64\\publish\\Api.exe')
  if (os.platform() === 'darwin') {
    apipath = path.join(__dirname, '..//Api//bin//Debug//netcoreapp1.1//osx.10.11-x64//publish//Api')
  }
  p = proc(apipath)

  p.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    if (mainWindow == null) {
      createWindow();
    }


  });

  p.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  p.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  console.log('server running ' + os.platform())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  startApi();

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
    p.kill();
  }


})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    console.log('activate')
    createWindow()
  }
})

process.on('exit', function () {
  console.log('exit');
  p.kill();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
