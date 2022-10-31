import { Vector2 } from "./vector2.js"
import { Game } from "./game.js";

export class Particle {
    position: Vector2;
    velocity: Vector2;
    game: Game;
    
    constructor(game: Game) {
        this.position = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.game = game;

        this.game.on('frame', this.render.bind(this));
    }

    render(ctx: CanvasRenderingContext2D) {
        console.log(ctx);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.position.x, this.position.y, 1, 1);
    }
}