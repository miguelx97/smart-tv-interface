import { app, ipcMain, BrowserWindow, shell } from "electron";
import { join } from "path";
import {shutdown} from 'electron-shutdown-command';
const autoLaunch = require('auto-launch');

let mainWindow: Electron.CrossProcessExports.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 600,
    fullscreen: true,
    icon: join(__dirname, "icon.png"),
    webPreferences: {
        preload: join(app.getAppPath(), 'build/preload.js'),
        // nodeIntegration: true,
        // contextIsolation: false
    },
  });

  mainWindow.loadURL(`file://${__dirname}/../../web/index.html`);
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
  setupAutolaunch();
});

// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") app.quit();
// });

// app.on("activate", function () {
//   if (mainWindow === null) createWindow();
// });

/**
 * Enable auto-lunch to start app on the system boot
 */
 async function setupAutolaunch() {
  let path:string|undefined = undefined;
  try {
    if(process.env.APPIMAGE) path = process.env.APPIMAGE;
    
    //path = "Siptize.DitUC_7sg2371kvhs50!Siptize.DitUC"
    //console.log('Auto Launch Path',path);    
    const autoLaunchObj = new autoLaunch({  name: 'mi_cine', path, isHidden: true });
    
    // const isAutoLaunchEnabled = await autoLaunchObj.isEnabled();
    // if(!isAutoLaunchEnabled) {
    //   console.log("Auto launch enabled");
    // }
    await autoLaunchObj.enable();
  }
  catch(ex){
    console.error(ex);    
  }
}


///// IPC /////
ipcMain.on("openUrl", (_, url:string) => {
    console.log(url);    
    shell.openExternal(url)
});

ipcMain.on("shutdown", () => {
  console.log("shutdown");    
  shutdown({ quitapp: true });
});

ipcMain.on("exit", () => {
  console.log("exit");    
  app.quit();
});