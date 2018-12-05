import * as React from 'react';

import Controls from './Controls';
import Canvas from './Canvas';
import './App.scss';


class BoundaryPlate {
    pixelSizeX: number;
    pixelSizeY: number;
    gridSize: number;
    padding: number;
    
    constructor(gridSize: number) {
        this.pixelSizeX = 0;
        this.pixelSizeY = 0;
        this.gridSize = gridSize;
        this.padding = 20;
    }

    private drawPlate(ctx: CanvasRenderingContext2D) {
        const { width: w, height: h } = ctx.canvas;

        this.drawGrid(ctx, this.padding, h - this.padding, w - this.padding * 2, (h - this.padding * 2) * -1);

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

    private drawGrid(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        this.pixelSizeX = width / this.gridSize;
        this.pixelSizeY = height / this.gridSize;
        ctx.strokeStyle = '#eee';
        ctx.font = '12px sans-serif';
        for (let i = 0; i < this.gridSize; i++) {
            const posX = x + i * this.pixelSizeX;
            for (let j = 0; j < this.gridSize; j++) {
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

    render(ctx: CanvasRenderingContext2D) {
        this.drawPlate(ctx);
    }

    renderItem(ctx: CanvasRenderingContext2D, item: any) {
        const x = item.x;
        const y = item.y;
        const width = item.width;
        const height = item.height;

        const plateX = this.padding + x * this.pixelSizeX;
        const plateY = ctx.canvas.height - this.padding + y * this.pixelSizeY;
        const plateWidth = width * this.pixelSizeX;
        const plateHeight = height * this.pixelSizeY;

        // ctx.fillRect(plateX, plateY, plateWidth, plateHeight);

        
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(plateX, plateY + plateHeight / 2);
        ctx.lineTo(plateX + plateWidth / 2, plateY);
        ctx.lineTo(plateX, plateY - plateHeight / 2);
        ctx.lineTo(plateX - plateWidth / 2, plateY);
        ctx.lineTo(plateX, plateY + plateHeight / 2);
        ctx.stroke();
        ctx.lineWidth = 1;
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = item.diagonalColor;
        ctx.beginPath();
        ctx.moveTo(plateX + plateWidth / 2, plateY);
        ctx.lineTo(plateX - plateWidth / 2, plateY);
        ctx.moveTo(plateX, plateY + plateHeight / 2);
        ctx.lineTo(plateX, plateY - plateHeight / 2);
        ctx.stroke();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        
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
        ctx.fillStyle = 'black';
        ctx.lineWidth = 1;
    }
}


class App extends React.Component<any, any> {
    plate: BoundaryPlate;

    constructor(props: any) {
        super(props);
        this.plate = new BoundaryPlate(30);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Controls />
                </div>
                <div className="container">
                    <Canvas>
                        {(ctx: CanvasRenderingContext2D, props: any) => {
                            const { items } = props;
                            const { width: w, height: h } = ctx.canvas;
                            const time = (Date.now() - window.performance.timeOrigin) / 1000;
                            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


                            this.plate.render(ctx);
                            items.map((item: any) => {
                                this.plate.renderItem(ctx, item);
                                // ctx.fillRect(item.x, item.y, item.width, item.height);
                            });
                        }}
                    </Canvas>
                </div>
            </React.Fragment>
        )
    }
}


export default App;