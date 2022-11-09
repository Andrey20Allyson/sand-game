import { app, BrowserWindow, Event } from 'electron';
import path from 'path';

function createWindow() {
    const window = new BrowserWindow({
        width: 1080,
        height: 720,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    window.loadFile('../view/index.html');

    return window;
}

app.on('ready', (ev: Event) => {
    createWindow()

    app.on('activate', (ev: Event) => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
});

app.on('window-all-closed', (ev: Event) => {
    if (process.platform !== 'darwin')
        app.quit();
})