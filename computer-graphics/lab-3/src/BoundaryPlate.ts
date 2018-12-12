import { Point } from './AffinaMatrix';

export default class BoundaryPlate {
    x: number;
    y: number;
    width: number;
    height: number;
    gridSize: number;
    pixelSizeX: number;
    pixelSizeY: number;

    centerX: number;
    centerY: number;

    constructor(x: number, y: number, width: number, height: number, gridSize: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.pixelSizeX = width / gridSize;
        this.pixelSizeY = height / gridSize;

        this.centerX = x + width / 2;
        this.centerY = y + height / 2;
    }

    setGridSize(size: number) {
        if (this.gridSize === size) return;
        this.gridSize = size;
        this.pixelSizeX = this.width / this.gridSize;
        this.pixelSizeY = this.height / this.gridSize;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.drawGrid(ctx);
        this.drawAxis(ctx);
    }

    private drawGrid(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = '#aaa';
        const { x, y, width, height } = this;
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                ctx.strokeRect(this.x + i * this.pixelSizeX, this.y + j * this.pixelSizeY, this.pixelSizeX, this.pixelSizeY);
            }
        }
        ctx.restore();
    }

    private drawAxis(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = '#000';
        const { x, y, width, height } = this;
        const arrowHeight = this.pixelSizeY / 1.5;
        const arrowWidth = this.pixelSizeX / 4;

        // X
        ctx.beginPath();
        ctx.moveTo(x, y + height / 2);
        ctx.lineTo(x + width, y + height / 2);
        ctx.moveTo(x + width, y + height / 2);
        ctx.lineTo(x + width - arrowHeight, y + height / 2 - arrowWidth);
        ctx.moveTo(x + width, y + height / 2);
        ctx.lineTo(x + width - arrowHeight, y + height / 2 + arrowWidth);
        
        // Y
        ctx.moveTo(x + width / 2, y);
        ctx.lineTo(x + width / 2, y + height);
        ctx.moveTo(x + width / 2, y);
        ctx.lineTo(x + width / 2 - arrowWidth, y + arrowHeight);
        ctx.moveTo(x + width / 2, y);
        ctx.lineTo(x + width / 2 + arrowWidth, y + arrowHeight);
        ctx.stroke();

        ctx.restore();
    }

    getCoord(p: Point): Point {
        return new Point(
            this.centerX + (p.x * this.pixelSizeX),
            this.centerY + (-p.y * this.pixelSizeY)
        );
    }

    drawLine(ctx: CanvasRenderingContext2D, xFrom: number, yFrom: number, xTo: number, yTo: number) {
        const xy1: Point = this.getCoord(new Point(xFrom, yFrom));
        const xy2: Point = this.getCoord(new Point(xTo, yTo));

        ctx.beginPath();
        ctx.moveTo(xy1.x, xy1.y);
        ctx.lineTo(xy2.x, xy2.y);
        ctx.stroke();
    }

    drawTriangle(ctx: CanvasRenderingContext2D, t: Paralelogram) {
        const a: Point = this.getCoord(t.p1);
        const b: Point = this.getCoord(t.p2);
        const c: Point = this.getCoord(t.p3);
        const d: Point = this.getCoord(t.p4);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.lineTo(d.x, d.y);
        ctx.lineTo(a.x, a.y);
        ctx.stroke();
    }
}

export class Paralelogram {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;

    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
}
