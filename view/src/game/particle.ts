import { Vector2 } from './vector2.js'
import { Game } from './game.js';
import { Color3 } from './color3.js';

export class Particle {
    position: Vector2;
    velocity: Vector2;
    color: Color3;
    temperature: number;
    alive: boolean;
    game: Game;
    
    constructor(game: Game) {
        this.position = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.alive = true;
        this.temperature = 30;
        this.color = Color3.fromRGB(255, 255, 255);
        this.game = game;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color.hex;
        ctx.fillRect(this.position.x, this.position.y, 1, 1);
    }

    move() {
        const downColision = this.game.particles[Vector2.fromSum(this.position, new Vector2(0, 1)).toString()]

        if (this.position.y + 1 < this.game.scenarySize.y && !downColision) {
            this.position.sum(new Vector2(0, 1));
        }
    }
}