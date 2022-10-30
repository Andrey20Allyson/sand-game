import { EventEmitter } from "../util/EventEmitter.js";
export class Screen extends EventEmitter {
    canvas;
    context;
    animationFrameHandler;
    constructor(canvas) {
        super();
        this.canvas = canvas;
        let context = canvas.getContext('2d');
        if (!context)
            throw new Error('Context not found!');
        this.context = context;
    }
    start() {
        this.animationFrameHandler = requestAnimationFrame(this.render.bind(this));
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
    on(event, listener) {
        return super.on(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
}
