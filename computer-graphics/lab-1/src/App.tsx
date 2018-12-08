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
            <DatString path='name' label='Назва' />
            <DatBoolean path='shown_name' label='Відображати назву' />
            <DatBoolean path='shown' label='Відображати' />
            <DatNumber path='x' label='X' min={0} max={globals.gridSize} step={1} />
            <DatNumber path='y' label='Y' min={0} max={globals.gridSize} step={1} />
            <DatNumber path='width' label='Ширина' min={0} max={globals.gridSize} step={1} />
            <DatNumber path='height' label='Висота' min={0} max={globals.gridSize} step={1} />
            <DatColor path='circleColor' label='Коло' />
            <DatColor path='diagonalColor' label='Діагональ' />
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
        <DatNumber path='gridSize' label='Розмір площини' min={1} max={50} step={1} />
    </DatGui>
);

const ControlCoreConnected = connect(itemsSelector, actions)(ControlCore);


class App extends React.Component<any, any> {
    plate: BoundaryPlate;

    constructor(props: any) {
        super(props);
        this.plate = new BoundaryPlate(30);
    }

    render() {
                // <About author="Slavik Nychkalo">
                //     <h2>Варіант #11.</h2>
                //     <p>
                //         Відобразити координатну площину з осями, підписами та напрямними стрілками (центр осей в нижньому лівому куті Canvas). Забезпечити побудову ромбів за заданими довжинами діагоналей та координатами точки перетину діагоналей (діагоналі паралельні осям координат) лише у першій координатній чверті із автоматичною побудовою діагоналей та вписаних кіл. Забезпечити можливість задання кольору діагоналей та заливки кіл.
                //     </p>
                    
                //     <ul>
                //         <li>Hello</li>
                //         <li>World</li>
                //     </ul>
                // </About>
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
                            
                            
                            this.plate.render(ctx, globals);
                            items.map((item: any) => {
                                item.shown && this.plate.renderItem(ctx, globals, item);
                            });
                        }}
                    </CanvasConnected>
                </Container>
            </Wrapper>
        )
    }
}


export default App;