import * as React from 'react';
import { connect } from 'redux-zero/react';

import './index.scss';

import Looper, { IUpdateable } from './Looper';
import { AutoLoop } from './AutoLooper';


export interface ICanvas {
    children(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
}

class Canvas extends React.Component<any, any> implements IUpdateable {
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;

    constructor(props: any) {
        super(props);
        Looper.addToLoop(this);
        Looper.start();
    }

    updateCanvas() {
        const { children } = this.props;
        if (children) {
            if (typeof children === 'function') {
                if (this.canvas) {
                    children(this.ctx, this.props);
                }
            }
        }
    }

    shouldComponentUpdate() {
        Looper.makeLoop();
        return false;
    }

    componentDidMount() {
        Looper.makeLoop();
    }

    render() {
        return (
            <canvas className="canvas" width="800" height="800" ref={(canvas: any) => {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
            }}><AutoLoop /></canvas>
        );
    }
}


export default Canvas;