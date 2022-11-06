import { Color3 } from '../color3.js';
import { Game } from '../game.js';
import { Particle } from '../particle.js';
import { Vector2 } from '../vector2.js';

export class Sand extends Particle {
    constructor(game: Game) {
        super(game);

        this.color = Color3.fromRGB(245, 240, 150);
    }

    move(): void {
        const downColision = this.game.particles[Vector2.fromSum(this.position, new Vector2(0, 1)).toString()];

        if (this.position.y + 1 < this.game.scenarySize.y && !downColision) {
            this.position.sum(new Vector2(0, 1));
            return;
        }

        const rightDownColision = this.game.particles[Vector2.fromSum(this.position, new Vector2(1, 1)).toString()];
        const leftDownColision = this.game.particles[Vector2.fromSum(this.position, new Vector2(-1, 1)).toString()];

        if (!rightDownColision) {
            this.position.sum(new Vector2(1, 1));
            return;
        }

        if(!leftDownColision) {
            this.position.sum(new Vector2(-1, 1));
            return;
        }
    }
}