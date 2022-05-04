function openPlatform(url) {
    console.log(url);
    window.ipcRenderer.send( 'openUrl', url );
}

function shutdown() {
    console.log('shutdown');
    window.ipcRenderer.send( 'shutdown' );
}

function exit() {
    console.log('exit');
    window.ipcRenderer.send( 'exit' );
}