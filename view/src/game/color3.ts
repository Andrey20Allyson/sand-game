import { shortToHex } from '../util/HexDecimal.js';

export class Color3 {
    private redHex: string;
    private greenHex: string;
    private blueHex: string;

    constructor() {
        this.redHex = shortToHex(255);
        this.greenHex = shortToHex(255);
        this.blueHex = shortToHex(255);
    }

    get hex() {
        return `#${this.redHex}${this.greenHex}${this.blueHex}`;
    }

    static fromRGB(r: number, g: number, b: number) {
        const color = new this();

        const [rHex, gHex, bHex] = [r, g, b].map(shortToHex);

        color.redHex = rHex;
        color.greenHex = gHex;
        color.blueHex = bHex;

        return color;
    }
}