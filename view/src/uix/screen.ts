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
    }

    start() {
        this.animationFrameHandler = requestAnimationFrame(this.render.bind(this))
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

        console.log(this.context);

        this.emit('frame', this.context);
    }

    on(event: 'frame', listener: (ctx: CanvasRenderingContext2D) => void): this;
    on(event: string, listener: (...args: any[]) => any): this {
        return super.on(event, listener);
    }

    emit(event: 'frame', ctx: CanvasRenderingContext2D): boolean;
    emit(event: string, ...args: any[]): boolean {
        return super.emit(event, ...args)
    }
}