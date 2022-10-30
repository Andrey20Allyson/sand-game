import { EventEmitter } from "../util/EventEmitter.js";
import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";

export interface ParticleStack {
    [k: string]: Particle
}

export class Game extends EventEmitter {
    particles: ParticleStack;
    tickRate: number;
    tickHandle: NodeJS.Timer | undefined;

    constructor() {
        super();

        this.tickRate = 35;

        this.particles = {};
    }

    createParticle(x: number, y: number, type: string) {
        const particle = new Particle(this);

        this.on('frame', particle.render.bind(particle));

        particle.position = new Vector2(x, y);
        this.particles[particle.position.toString()] = particle;

        return particle;
    }

    start() {
        this.tickHandle = setInterval(this.simulate.bind(this));
    }

    simulate() {

    }

    render(ctx: CanvasRenderingContext2D) {
        this.emit('frame', ctx);
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