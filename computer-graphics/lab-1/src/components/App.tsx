import * as React from 'react';

import Controls from './Controls';
import Canvas from './Canvas';
import './App.scss';


class BoundaryPlate {
    gridSize: number;
    padding: number;
    
    constructor(gridSize: number) {
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
        const pixelSizeX = width / this.gridSize;
        const pixelSizeY = height / this.gridSize;
        ctx.strokeStyle = '#eee';
        ctx.font = '12px sans-serif';
        for (let i = 0; i < this.gridSize; i++) {
            const posX = x + i * pixelSizeX;
            for (let j = 0; j < this.gridSize; j++) {
                const posY = y + j * pixelSizeY;
                if (i === 0 && j > 0) {
                    ctx.textAlign = 'right';
                    ctx.fillText(j.toString(), posX - 2, posY + 4);
                }
                if (j === 0 && i > 0) {
                    ctx.textAlign = 'center';
                    ctx.fillText(i.toString(), posX, posY + 12);
                }
                ctx.strokeRect(posX, posY, pixelSizeX, pixelSizeY);
            }
        }
        ctx.strokeStyle = '#000';
    }

    render(ctx: CanvasRenderingContext2D) {
        this.drawPlate(ctx);
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
                <div className="container scrollable">
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
                            // items.map((item: any) => {
                            //     ctx.fillRect(item.x, item.y, item.width, item.height);
                            // });
                        }}
                    </Canvas>
                </div>
            </React.Fragment>
        )
    }
}


export default App;