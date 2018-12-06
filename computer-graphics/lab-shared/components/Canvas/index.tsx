import * as React from 'react';
import { connect } from 'redux-zero/react';

import './index.scss';

import Looper, { IUpdateable } from './Looper';
import { AutoLoop } from './AutoLooper';


export interface ICanvas {
    children(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
}

class Canvas extends React.Component<any, any> implements IUpdateable {
    static defaultProps = {
        width: 800,
        height: 800,
    }

    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;

    constructor(props: any) {
        super(props);
        Looper.addToLoop(this);
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
        if (this.props.autoUpdateable) {
            Looper.start();
        }
    }

    render() {
        return (
            <canvas className="canvas" width={this.props.width} height={this.props.height} ref={(canvas: any) => {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
            }}><AutoLoop /></canvas>
        );
    }
}


export default Canvas;