import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel:string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
    send: (channel:string, ...args: any[]) => ipcRenderer.send(channel, ...args),
    removeAllListeners: (channel:string) => ipcRenderer.removeAllListeners(channel)
})