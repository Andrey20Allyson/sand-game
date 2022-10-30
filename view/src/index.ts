import { Screen } from "./uix/screen.js";

let canvas = document.querySelector<HTMLCanvasElement>('canvas#screen');

if (!canvas)
    throw new Error('Canvas not found!')

const screen = new Screen(canvas);

screen.on('frame', (ctx) => {
    ctx.fillStyle = '#ffffff';
});

screen.start()