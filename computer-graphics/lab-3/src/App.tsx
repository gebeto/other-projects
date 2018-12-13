import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions, itemsSelector } from './store';
import { Wrapper, Container } from 'lab-shared/components/Wrapper/';


import BoundaryPlate, { Paralelogram } from './BoundaryPlate';
import { Point, Translate, Scale, Rotate, actionByType } from './AffinaMatrix';
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


const ControlTranslate = ({ data, title, update, remove, globals }: any) => {
    return (
        <DatGui data={data} onUpdate={update}>
            <DatFolder title={title}>
                <DatNumber path='x' label='X' min={-(globals.gridSize / 2)} max={globals.gridSize / 2} step={1} />
                <DatNumber path='y' label='Y' min={-(globals.gridSize / 2)} max={globals.gridSize / 2} step={1} />
                <DatBoolean path='apply' label='Використати ефект' />
                <DatButton label='Видалити' onClick={() => remove(data)} />
            </DatFolder>
        </DatGui>
    );
}

const ControlScale = ({ data, title, update, remove, globals }: any) => {
    return (
        <DatGui data={data} onUpdate={update}>
            <DatFolder title={title}>
                <DatNumber path='x' label='X' min={0.1} max={3} step={0.05} />
                <DatNumber path='y' label='Y' min={0.1} max={3} step={0.05} />
                <DatBoolean path='apply' label='Використати ефект' />
                <DatButton label='Видалити' onClick={() => remove(data)} />
            </DatFolder>
        </DatGui>
    );
}

const ControlRotate = ({ data, title, update, remove, globals }: any) => {
    return (
        <DatGui data={data} onUpdate={update}>
            <DatFolder title={title}>
                <DatNumber path='angle' label='Кут повороту' min={-Math.PI} max={Math.PI} step={0.01} />
                <DatBoolean path='apply' label='Використати ефект' />
                <DatButton label='Видалити' onClick={() => remove(data)} />
            </DatFolder>
        </DatGui>
    );
}

const Control = (props: any) => {
    if (props.data.type === 'translate') {
        return <ControlTranslate {...props} />
    }
    if (props.data.type === 'scale') {
        return <ControlScale {...props} />
    }
    if (props.data.type === 'rotate') {
        return <ControlRotate {...props} />
    }
    return null;
}

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
                    ...state.globals,
                    ...data,
                    gridSize: minSize
                }
            }
        });
    }}>
        <DatNumber path='gridSize' label='Розмір площини' min={2} max={100} step={2} />
        <DatNumber path='x' label='x' min={-props.globals.gridSize / 2} max={props.globals.gridSize / 2} step={1} />
        <DatNumber path='y' label='y' min={-props.globals.gridSize / 2} max={props.globals.gridSize / 2} step={1} />
        <DatButton label='Додати переміщення' onClick={props.addTranslateItem} />
        <DatButton label='Додати масштаування' onClick={props.addScaleItem} />
        <DatButton label='Додати поворот' onClick={props.addRotateItem} />
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

                            const p1 = new Point(globals.x + 0, globals.y + 0);
                            const p2 = new Point(globals.x + 5, globals.y + 10);
                            const p3 = new Point(globals.x + 15, globals.y + 10);
                            const p4 = new Point(globals.x + 10, globals.y + 0);

                            items.map((item: any) => {
                                if (!item.apply) return;
                                const action = actionByType(item.type);
                                if (action) {
                                    p1.pipe(action(item));
                                    p2.pipe(action(item));
                                    p3.pipe(action(item));
                                    p4.pipe(action(item));
                                }
                            });

                            this.plate.drawParalelogram(ctx, new Paralelogram(p1, p2, p3, p4));
                        }}
                    </CanvasConnected>
                </Container>
            </Wrapper>
        )
    }
}


export default App;