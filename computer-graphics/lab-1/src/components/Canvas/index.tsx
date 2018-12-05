import * as React from 'react';
import { connect } from 'redux-zero/react';

import { actions } from '../../store';
import './index.scss';

import Looper, { IUpdateable } from './Looper';


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
        return false;
    }

    render() {
        return (
            <canvas className="canvas" width="600" height="600" ref={(canvas: any) => {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
            }}></canvas>
        );
    }
}


export default connect(
    (state: any) => ({
        items: state.items,
    }),
    actions
)(Canvas)