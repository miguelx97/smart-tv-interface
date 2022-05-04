const $ = document.querySelector.bind(document)

async function openPlatform(url) {
    console.log(url);
    window.ipcRenderer.send( 'openUrl', url );
    $(".sk-circle").style.display = "block";
    await wait(10000);
    $(".sk-circle").style.display = "none";
}

function shutdown() {
    console.log('shutdown');
    window.ipcRenderer.send( 'shutdown' );
}

function exit() {
    console.log('exit');
    window.ipcRenderer.send( 'exit' );
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}