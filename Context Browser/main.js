// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView } = require('electron')
const { ipcMain } = require('electron')

const { webContents } = require('electron')


const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let mainInstance;
let browserInstance;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        minHeight: 600,
        minWidth: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })

    mainInstance = new BrowserView({ alwaysOnTop: true, webPreferences: { webSecurity: false,nodeIntegration: true, nodeIntegrationInWorker: true } })

    // mainWindow.loadFile('index.html');

    mainWindow.addBrowserView(mainInstance)

    //mainInstance.setBounds(getControlBounds())
    mainInstance.setBounds({
        width: 900,
        height: 600,
        x: 0,
        y: 0
    })
    mainInstance.webContents.loadFile('index.html');
    mainInstance.webContents.openDevTools({ mode: 'undocked' })

    mainInstance.webContents.on('dom-ready', () => {
        console.log("focus");
        console.log(mainInstance);
    });



    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    browserInstance = new BrowserView()
    browserInstance.setAutoResize({
        width:true,
        height:true
    });
  
    let browserInView = false;
    // Event handler for asynchronous incoming messages
    ipcMain.on('render-browser', (event, arg) => {
        if(!browserInView){
            console.log("browser-added");
            mainWindow.addBrowserView(browserInstance)
        }

        browserInView = true;
        console.log("moving ...")
        browserInstance.setBounds({ x: arg.left+5, y: arg.top+30, width:arg.width-10, height:arg.height-40 })
        browserInstance.webContents.loadURL('https://airbnb.com')
       
        // Event emitter for sending asynchronous messages
        event.reply('browser-open', 'pong')
    })

    ipcMain.on('close-browser', (event, arg) => {
        mainWindow.removeBrowserView(browserInstance);
        browserInView = false;
    });
    
    function getControlBounds() {
        const winBounds = mainWindow.getBounds();
        const contentBounds = mainWindow.getContentBounds();
        const y = process.platform === 'darwin' ? contentBounds.y - winBounds.y : 0;
        return {
            x: 0,
            y,
            width: contentBounds.width,
            height: 130
        };
    }

    function setContentBounds(view) {
        const [contentWidth, contentHeight] = mainWindow.getContentSize();
        const controlBounds = getControlBounds();
        view.setBounds({
            x: 0,
            y: controlBounds.y + controlBounds.height,
            width: contentWidth,
            height: contentHeight - controlBounds.height
        });
    }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})


function updateBrowserView(view) {

}



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.