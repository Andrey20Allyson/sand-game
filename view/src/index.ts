import { Screen } from "./uix/screen.js";
import { Vector2 } from "./game/vector2.js";
import { Game } from "./game/game.js";

let canvas = document.querySelector<HTMLCanvasElement>('canvas#screen');

if (!canvas)
    throw new Error('Canvas not found!')

const screen = new Screen(canvas);
const game = new Game(new Vector2(canvas.width, canvas.height));

screen.on('frame', (ctx) => {
    game.render(ctx);
});

screen.on('click', (pos) => {
    game.createParticle(pos.x, pos.y, '');
});

screen.start();
game.start();