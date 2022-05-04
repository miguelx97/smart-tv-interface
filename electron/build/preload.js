"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel, listener) => electron_1.ipcRenderer.on(channel, listener),
    send: (channel, ...args) => electron_1.ipcRenderer.send(channel, ...args),
    removeAllListeners: (channel) => electron_1.ipcRenderer.removeAllListeners(channel)
});
