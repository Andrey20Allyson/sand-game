export class Vector2 {
    static vector2RegExp = /^-{0,1}\d+(\.\d+){0,1}, -{0,1}\d+(\.\d+){0,1}$/;
    
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x}, ${this.y}`;
    }

    sum(value: Vector2): this;
    sum(value: number): this;
    sum(value: number | Vector2) {
        if (value instanceof Vector2) {
            this.x += value.x;
            this.y += value.y;
        } else {
            this.x += value;
            this.y += value;
        }

        return this;
    }

    sub(value: Vector2): this;
    sub(value: number): this;
    sub(value: number | Vector2) {
        if (value instanceof Vector2) {
            this.x -= value.x;
            this.y -= value.y;
        } else {
            this.x -= value;
            this.y -= value;
        }

        return this;
    }

    mult(value: Vector2): this;
    mult(value: number): this;
    mult(value: number | Vector2) {
        if (value instanceof Vector2) {
            this.x *= value.x;
            this.y *= value.y;
        } else {
            this.x *= value;
            this.y *= value;
        }

        return this;
    }

    div(value: Vector2): this;
    div(value: number): this;
    div(value: number | Vector2) {
        if (value instanceof Vector2) {
            this.x /= value.x;
            this.y /= value.y;
        } else {
            this.x /= value;
            this.y /= value;
        }

        return this;
    }

    exp(value: Vector2): this;
    exp(value: number): this;
    exp(value: number | Vector2) {
        if (value instanceof Vector2) {
            this.x **= value.x;
            this.y **= value.y;
        } else {
            this.x **= value;
            this.y **= value;
        }

        return this;
    }

    mod(value: Vector2): this;
    mod(value: number): this;
    mod(value: number | Vector2) {
        if (value instanceof Vector2) {
            this.x %= value.x;
            this.y %= value.y;
        } else {
            this.x %= value;
            this.y %= value;
        }

        return this;
    }

    static fromString(value: string) {
        if (!this.vector2RegExp.test(value))
            throw new Error('value cant be parse to Vector2!');

        const [ x, y ] = value.split(', ').map(v => Number.parseFloat(v));

        return new Vector2(x, y);
    }

    static fromSum(vectorA: Vector2, vectorb: Vector2) {
        return new Vector2(vectorA.x + vectorb.y, vectorA.y + vectorb.y);
    }
}