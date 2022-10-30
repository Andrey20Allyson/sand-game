import { app, BrowserWindow, Event } from 'electron';

function createWindow() {
    const window = new BrowserWindow({
        width: 680,
        height: 500,
        resizable: false
    });

    window.loadFile('../view/index.html')
    // window.loadURL('http://localhost:3000');

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