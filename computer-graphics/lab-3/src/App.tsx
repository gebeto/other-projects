import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions, itemsSelector } from './store';
import { Wrapper, Container } from 'lab-shared/components/Wrapper/';


import BoundaryPlate from './BoundaryPlate';
import Canvas from 'lab-shared/components/Canvas';
import ControlsNew from 'lab-shared/components/ControlsNew';

import DatGui, {
    DatBoolean,
    DatButton,
    DatColor,
    DatNumber,
    DatString,
    DatFolder
} from 'react-dat-gui';
import Controls from 'lab-shared/components/Controls';
import About from 'lab-shared/components/About';


const CanvasConnected = connect(itemsSelector, actions)(Canvas);
const ControlsConnected = connect(itemsSelector, actions)(ControlsNew);


const Control = ({ data, title, update, remove, globals }: any) => (
    <DatGui data={data} onUpdate={update}>
        <DatFolder title={title}>
            <DatNumber path='x' label='X' min={0} max={globals.gridSize} step={1} />
            <DatNumber path='y' label='Y' min={0} max={globals.gridSize} step={1} />
            <DatButton label='Видалити' onClick={() => remove(data)} />
        </DatFolder>
    </DatGui>
);

const ControlCore = (props: any) => (
    <DatGui data={props.globals} onUpdate={(data: any) => {
        props.store.setState((state: any) => {
            let anyItemHasError = false;
            const minSize = state.items.reduce((min: number, item: any) => {
                const max = Math.max(item.x, item.y);
                if (max > data.gridSize && max > min) {
                    return max;
                }
                return min;
            }, data.gridSize);
            return {
                globals: {
                    gridSize: minSize
                }
            }
        });
    }}>
        <DatButton label='Додати елемент' onClick={props.addItem} />
        <DatNumber path='gridSize' label='Розмір площини' min={2} max={100} step={2} />
    </DatGui>
);

const ControlCoreConnected = connect(itemsSelector, actions)(ControlCore);


class App extends React.Component<any, any> {
    plate: BoundaryPlate;

    constructor(props: any) {
        super(props);
        this.plate = new BoundaryPlate(0, 0, 800, 800, 50);
    }

    render() {
        return (
            <Wrapper>
                <Container>
                    <ControlsConnected
                        ControlItem={Control}
                        ControlCoreItem={ControlCoreConnected}
                    />
                </Container>
                <Container>
                    <CanvasConnected autoUpdateable>
                        {(ctx: CanvasRenderingContext2D, props: any) => {
                            const { items, globals } = props;
                            const { width: w, height: h } = ctx.canvas;
                            const time = (Date.now() - window.performance.timeOrigin) / 1000;
                            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                            
                            this.plate.setGridSize(globals.gridSize);
                            this.plate.draw(ctx);
                            // items.map((item: any) => {
                            //     item.shown && this.plate.renderItem(ctx, globals, item);
                            // });
                        }}
                    </CanvasConnected>
                </Container>
            </Wrapper>
        )
    }
}


export default App;