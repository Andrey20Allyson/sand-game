import { Color3 } from '../color3.js';
import { Game } from '../game.js';
import { Particle } from '../particle.js';
import { Vector2 } from '../vector2.js';

export class Water extends Particle {
    constructor(game: Game) {
        super(game);

        this.color = Color3.fromRGB(100, 100, 255);
    }

    move(): void {
        const bottonNeighbor = this.game.particles[Vector2.fromSum(this.position, new Vector2(0, 1)).toString()];
        const isOnFloor = this.position.y + 1 >= this.game.scenarySize.y;
        
        if (!isOnFloor && !bottonNeighbor) {
            this.position.sum(new Vector2(0, 1));
            return;

        }

        const rightBottonNeighbor = this.game.particles[Vector2.fromSum(this.position, new Vector2(1, 1)).toString()];
        const leftBottonNeighbor = this.game.particles[Vector2.fromSum(this.position, new Vector2(-1, 1)).toString()];

        if (!isOnFloor && !rightBottonNeighbor) {
            this.position.sum(new Vector2(1, 1));
            return;

        } else if(!isOnFloor && !leftBottonNeighbor) {
            this.position.sum(new Vector2(-1, 1));
            return;

        }

        const rightNeighbor = this.game.particles[Vector2.fromSum(this.position, new Vector2(1, 0)).toString()];
        const leftNeighbor = this.game.particles[Vector2.fromSum(this.position, new Vector2(-1, 0)).toString()];

        if (!rightNeighbor && !leftNeighbor) {
            this.position.sum(new Vector2(Math.random() > .5? 1: -1, 0));
            return;
        }
        
        if (!rightNeighbor) {
            this.position.sum(new Vector2(1, 0));
            return;
        }
        
        if (!leftNeighbor){
            this.position.sum(new Vector2(-1, 0));
            return;
        }
    }
}