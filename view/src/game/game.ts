import { EventEmitter } from "../util/EventEmitter.js";
import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";

export interface ParticleStack {
    [k: string]: Particle
}

export class Game extends EventEmitter {
    particles: ParticleStack;
    tickRate: number;
    gravityForce: Vector2;
    tickHandle: NodeJS.Timer | undefined;

    constructor() {
        super();

        this.tickRate = 3;

        this.gravityForce = new Vector2(0, 1);

        this.particles = {};
    }

    createParticle(x: number, y: number, type: string) {
        const pos = new Vector2(x, y);
        if (this.particles[pos.toString()])
            return;

        const particle = new Particle(this);

        particle.position = pos;

        this.particles[particle.position.toString()] = particle;

        return particle;
    }

    start() {
        this.tickHandle = setInterval(this.tick.bind(this), 1000 / this.tickRate);
    }

    tick() {
        this.emit('tick');
        this.simulate();
    }

    render(ctx: CanvasRenderingContext2D) {
        this.emit('frame', ctx);
    }

    simulate() {
        for (let [ index, particle ] of Object.entries(this.particles)) {
            // particle.velocity.sum(this.gravityForce);

            particle.position.sum(new Vector2(0, 1));
        }
    }

    on(event: string, listener: (...args: any[]) => any): this;
    on(event: 'frame', listener: (ctx: CanvasRenderingContext2D) => void): this;
    on(event: 'tick', listener: () => void): this;
    on(event: string, listener: (...args: any[]) => any): this {
        return super.on(event, listener);
    }

    emit(event: string, ...args: any[]): boolean;
    emit(event: 'frame', ctx: CanvasRenderingContext2D): boolean;
    emit(event: 'tick'): boolean;
    emit(event: string, ...args: any[]): boolean {
        return super.emit(event, ...args);
    }
}