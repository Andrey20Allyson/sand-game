"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function createWindow() {
    const window = new electron_1.BrowserWindow({
        width: 680,
        height: 500,
        resizable: false
    });
    window.loadFile('../view/index.html');
    // window.loadURL('http://localhost:3000');
    return window;
}
electron_1.app.on('ready', (ev) => {
    createWindow();
    electron_1.app.on('activate', (ev) => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', (ev) => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
