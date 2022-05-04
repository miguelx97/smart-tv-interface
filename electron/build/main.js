"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAutolaunch = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
const electron_shutdown_command_1 = require("electron-shutdown-command");
const autoLaunch = require('auto-launch');
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1080,
        height: 600,
        fullscreen: true,
        webPreferences: {
            preload: (0, path_1.join)(electron_1.app.getAppPath(), 'build/preload.js'),
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
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.app.on("activate", function () {
    if (mainWindow === null)
        createWindow();
});
/**
 * Enable auto-lunch to start app on the system boot
 */
function setupAutolaunch() {
    return __awaiter(this, void 0, void 0, function* () {
        let path = "";
        try {
            if (process.env.APPIMAGE)
                path = process.env.APPIMAGE;
            //path = "Siptize.DitUC_7sg2371kvhs50!Siptize.DitUC"
            //console.log('Auto Launch Path',path);    
            const autoLaunchObj = new autoLaunch({ name: 'mi_cine', path, isHidden: true });
            // const isAutoLaunchEnabled = await autoLaunchObj.isEnabled();
            // if(!isAutoLaunchEnabled) {
            //   console.log("Auto launch enabled");
            // }
            yield autoLaunchObj.enable();
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
exports.setupAutolaunch = setupAutolaunch;
///// IPC /////
electron_1.ipcMain.on("openUrl", (_, url) => {
    console.log(url);
    electron_1.shell.openExternal(url);
});
electron_1.ipcMain.on("shutdown", () => {
    console.log("shutdown");
    (0, electron_shutdown_command_1.shutdown)({ quitapp: true });
});
electron_1.ipcMain.on("exit", () => {
    console.log("exit");
    electron_1.app.quit();
});
