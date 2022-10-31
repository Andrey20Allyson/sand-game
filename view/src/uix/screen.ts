import { Vector2 } from "../game/vector2.js";
import { EventEmitter } from "../util/EventEmitter.js";

export class Screen extends EventEmitter {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    animationFrameHandler: number | undefined;

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;

        let context = canvas.getContext('2d');
        if (!context)
            throw new Error('Context not found!');

        this.context = context;

        this.canvas.addEventListener('click', this.click.bind(this));
    }

    click({ offsetX, offsetY }: MouseEvent) {
        this.emit('click', new Vector2(
            Math.trunc(offsetX / this.canvas.clientWidth * this.canvas.width),
            Math.trunc(offsetY / this.canvas.clientHeight * this.canvas.height) 
        ));
    }

    start() {
        // this.animationFrameHandler = requestAnimationFrame(this.render.bind(this))
        setInterval(this.render.bind(this), 1000 / 10);
    }

    stop() {
        let handler = this.animationFrameHandler;

        if (!handler) 
            return;

        cancelAnimationFrame(handler);

        this.animationFrameHandler = undefined;
    }

    render() {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.emit('frame', this.context);
    }

    on(event: 'frame', listener: (ctx: CanvasRenderingContext2D) => void): this;
    on(event: 'click', listener: (pos: Vector2) => void): this;
    on(event: string, listener: (...args: any[]) => any): this {
        return super.on(event, listener);
    }

    emit(event: 'frame', ctx: CanvasRenderingContext2D): boolean;
    emit(event: 'click', pos: Vector2): boolean;
    emit(event: string, ...args: any[]): boolean {
        return super.emit(event, ...args)
    }
}