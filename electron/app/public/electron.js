const { app, BrowserWindow, globalShortcut, session } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
// let installExtension = require('electron-devtools-installer')

// app.whenReady().then(() => {
//     installExtension(REDUX_DEVTOOLS)
//         .then((name) => console.log(`Added Extension:  ${name}`))
//         .catch((err) => console.log('An error occurred: ', err));
// });

//session.loadExtension(path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.6.4.2101_0'))


function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 480,
        frame: false,
        kiosk: true,

        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule:true,

        }
    })

    require('./server')(win);
        //***//
        globalShortcut.register('f5', function() {
            console.log('f5 is pressed')
            win.webContents.openDevTools()
        })
        globalShortcut.register('CommandOrControl+R', function() {
            console.log('CommandOrControl+R is pressed')
            mainWindow.reload()
        })

    //load the index.html from a url
    win.loadURL('http://localhost:3000');
    // installExtension.default(installExtension.REACT_DEVELOPER_TOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err));
    // installExtension.default(installExtension.REDUX_DEVTOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err));
    // Open the DevTools.
    //
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
