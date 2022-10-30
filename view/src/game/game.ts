import { EventEmitter } from "../util/EventEmitter.js";
import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";

export class Game extends EventEmitter {
    particles: Particle[];

    constructor() {
        super();

        this.particles = [];
    }

    createParticle(x: number, y: number, type: string) {
        
    }

    on(event: string, listener: (...args: any[]) => any): this {
        return super.on(event, listener);
    }

    emit(event: string, ...args: any[]): boolean {
        return super.emit(event, ...args);
    }
}