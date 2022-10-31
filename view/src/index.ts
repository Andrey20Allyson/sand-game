import { Screen } from "./uix/screen.js";
import { Game } from "./game/game.js";

let canvas = document.querySelector<HTMLCanvasElement>('canvas#screen');

if (!canvas)
    throw new Error('Canvas not found!')

const screen = new Screen(canvas);
const game = new Game();

screen.on('frame', (ctx) => {
    game.render(ctx);
});

screen.on('click', (pos) => {
    game.createParticle(pos.x, pos.y, '');
});

screen.start();
game.start();