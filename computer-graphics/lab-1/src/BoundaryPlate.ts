export default class BoundaryPlate {
    pixelSizeX: number;
    pixelSizeY: number;
    padding: number;

    constructor(opts: any) {
        this.pixelSizeX = 0;
        this.pixelSizeY = 0;
        this.padding = 20;
    }

    private drawPlate(ctx: CanvasRenderingContext2D, opts: any) {
        const { width: w, height: h } = ctx.canvas;

        this.drawGrid(ctx, opts, this.padding, h - this.padding, w - this.padding * 2, (h - this.padding * 2) * -1);

        ctx.beginPath();
        const padding = this.padding;
        const arrowSize = {
            w: 10,
            h: 10,
        }
        ctx.moveTo(padding, h - padding);
        ctx.lineTo(padding, padding);
        ctx.moveTo(padding - arrowSize.w / 2, padding + arrowSize.h);
        ctx.lineTo(padding, padding);
        ctx.moveTo(padding + arrowSize.w / 2, padding + arrowSize.h);
        ctx.lineTo(padding, padding);

        ctx.moveTo(padding, h - padding);
        ctx.lineTo(w - padding, h - padding);
        ctx.moveTo(w - padding - arrowSize.h, h - padding - arrowSize.w / 2);
        ctx.lineTo(w - padding, h - padding);
        ctx.moveTo(w - padding - arrowSize.h, h - padding + arrowSize.w / 2);
        ctx.lineTo(w - padding, h - padding);

        ctx.stroke();
    }

    private drawGrid(ctx: CanvasRenderingContext2D, opts: any, x: number, y: number, width: number, height: number) {
        this.pixelSizeX = width / opts.gridSize;
        this.pixelSizeY = height / opts.gridSize;
        ctx.strokeStyle = '#eee';
        ctx.font = '12px sans-serif';
        for (let i = 0; i < opts.gridSize; i++) {
            const posX = x + i * this.pixelSizeX;
            for (let j = 0; j < opts.gridSize; j++) {
                const posY = y + j * this.pixelSizeY;
                if (i === 0 && j > 0) {
                    ctx.textAlign = 'right';
                    ctx.fillText(j.toString(), posX - 2, posY + 4);
                }
                if (j === 0 && i > 0) {
                    ctx.textAlign = 'center';
                    ctx.fillText(i.toString(), posX, posY + 12);
                }
                ctx.strokeRect(posX, posY, this.pixelSizeX, this.pixelSizeY);
            }
        }
        ctx.strokeStyle = '#000';
    }

    render(ctx: CanvasRenderingContext2D, opts: any) {
        this.drawPlate(ctx, opts);
    }

    renderItem(ctx: CanvasRenderingContext2D, opts: any, item: any) {
        const x = item.x;
        const y = item.y;
        const width = item.width;
        const height = item.height;

        const plateX = this.padding + x * this.pixelSizeX;
        const plateY = ctx.canvas.height - this.padding + y * this.pixelSizeY;
        const plateWidth = width * this.pixelSizeX;
        const plateHeight = height * this.pixelSizeY;

        ctx.save();
        // Draw sides
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(plateX, plateY + plateHeight / 2);
        ctx.lineTo(plateX + plateWidth / 2, plateY);
        ctx.lineTo(plateX, plateY - plateHeight / 2);
        ctx.lineTo(plateX - plateWidth / 2, plateY);
        ctx.lineTo(plateX, plateY + plateHeight / 2);
        ctx.stroke();
        ctx.restore();
        
        ctx.save();
        // Draw diagonals
        ctx.strokeStyle = item.diagonalColor;
        ctx.beginPath();
        ctx.moveTo(plateX + plateWidth / 2, plateY);
        ctx.lineTo(plateX - plateWidth / 2, plateY);
        ctx.moveTo(plateX, plateY + plateHeight / 2);
        ctx.lineTo(plateX, plateY - plateHeight / 2);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        // Draw inner Circle
        const w2 = width / 2 * this.pixelSizeX;
        const h2 = height / 2 * this.pixelSizeX;
        const S = w2 * h2;
        const radius = S / Math.sqrt(Math.pow(w2, 2) + Math.pow(h2, 2))
        ctx.lineWidth = 2;
        ctx.fillStyle = item.circleColor;
        ctx.beginPath();
        ctx.arc(plateX, plateY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        
        if (item.shown_name) {
            ctx.save();
            // Draw Shape name
            ctx.fillStyle = 'white';
            ctx.font = 'bold 15px sans-serif';
            ctx.shadowBlur = 30;
            ctx.shadowColor = 'black'
            ctx.fillText(item.name, plateX, plateY + 6);
            ctx.restore();
        }
    }
}