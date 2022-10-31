import { EventEmitter } from "../util/EventEmitter.js";
import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";

export interface ParticleStack {
    [k: string]: Particle;
}

export class Game extends EventEmitter {
    particles: ParticleStack;
    tickRate: number;
    gravityForce: Vector2;
    scenarySize: Vector2;
    tickHandle: NodeJS.Timer | undefined;

    constructor(size: Vector2) {
        super();

        this.tickRate = 10;

        this.gravityForce = new Vector2(0, 1);

        this.particles = {};

        this.scenarySize = size;
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
        const newParticlesStack: ParticleStack = {};

        for (let [ index, particle ] of Object.entries(this.particles)) {

            let indexVector2 = Vector2.fromString(index);

            const downColision = this.particles[new Vector2(0, 1).sum(particle.position).toString()]
            const rightDownColision = this.particles[new Vector2(1, 1).sum(particle.position).toString()]
            const leftDownColision = this.particles[new Vector2(-1, 1).sum(particle.position).toString()]

            if (particle.position.y + 1 < this.scenarySize.y && !downColision) {
                particle.position.sum(new Vector2(0, 1));
            }

            if (downColision && !rightDownColision) {
                particle.position.sum(new Vector2(1, 1));

            } else if(downColision && !leftDownColision) {
                particle.position.sum(new Vector2(-1, 1));

            }

            newParticlesStack[particle.position.toString()] = particle;
        }

        this.particles = newParticlesStack;
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