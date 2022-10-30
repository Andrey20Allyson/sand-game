import { Screen } from "./uix/screen.js";
let canvas = document.querySelector('canvas#screen');
if (!canvas)
    throw new Error('Canvas not found!');
const screen = new Screen(canvas);
screen.on('frame', (ctx) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, 9, 1, 2);
});
screen.start();
