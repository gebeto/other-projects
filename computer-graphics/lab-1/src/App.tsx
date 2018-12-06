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


const CanvasConnected = connect(itemsSelector, actions)(Canvas);
const ControlsConnected = connect(itemsSelector, actions)(ControlsNew);


const Control = ({ data, title, update, remove }: any) => (
    <DatGui data={data} onUpdate={update}>
        <DatFolder title={title}>
            <DatString path='name' label='Назва' />
            <DatBoolean path='shown_name' label='Відображати назву' />
            <DatBoolean path='shown' label='Відображати' />
            <DatNumber path='x' label='X' min={0} max={30} step={1} />
            <DatNumber path='y' label='Y' min={0} max={30} step={1} />
            <DatNumber path='width' label='Ширина' min={0} max={30} step={1} />
            <DatNumber path='height' label='Висота' min={0} max={30} step={1} />
            <DatColor path='circleColor' label='Коло' />
            <DatColor path='diagonalColor' label='Діагональ' />
            <DatButton label='Видалити' onClick={() => remove(data)} />
        </DatFolder>
    </DatGui>
);


class App extends React.Component<any, any> {
    plate: BoundaryPlate;

    constructor(props: any) {
        super(props);
        this.plate = new BoundaryPlate(30);
    }

    render() {
        return (
            <Wrapper>
                <Container>
                    <ControlsConnected
                        ControlItem={Control}
                    />
                </Container>
                <Container>
                    <CanvasConnected>
                        {(ctx: CanvasRenderingContext2D, props: any) => {
                            const { items } = props;
                            const { width: w, height: h } = ctx.canvas;
                            const time = (Date.now() - window.performance.timeOrigin) / 1000;
                            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                            
                            
                            this.plate.render(ctx);
                            items.map((item: any) => {
                                item.shown && this.plate.renderItem(ctx, item);
                            });
                        }}
                    </CanvasConnected>
                </Container>
            </Wrapper>
        )
    }
}


export default App;