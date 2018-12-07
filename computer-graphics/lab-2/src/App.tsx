import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions, itemsSelector } from './store';
import { Wrapper, Container } from 'lab-shared/components/Wrapper/';


import { Fractal } from './Fractal';
import Canvas from 'lab-shared/components/Canvas';
import ControlsNew from 'lab-shared/components/ControlsNew';

import DatGui, {
    DatBoolean,
    DatButton,
    DatColor,
    DatNumber,
    DatSelect,
    DatString,
    DatFolder
} from 'react-dat-gui';
import Controls from 'lab-shared/components/Controls';


const CanvasConnected = connect(itemsSelector, actions)(Canvas);
const ControlsConnected = connect(itemsSelector, actions)(ControlsNew);


const Control = ({ data, title, update, remove }: any) => (
    <DatGui data={data} onUpdate={update}>
        <DatNumber path='deep' label='Глибина' min={1} max={7} step={1} />
        <DatNumber path='angle' label='Кут нахилу' min={-Math.PI} max={Math.PI} step={0.01} />
        <DatBoolean path='zigZagAngle' label='Кожен рівень в різні боки'/>
        <DatNumber path='width' label='Ширина' min={300} max={1000} step={1} />
        <DatNumber path='height' label='Висота' min={300} max={1000} step={1} />
        <DatNumber path='stepScale' label='Крок зменшення' min={0.1} max={1.0} step={0.01} />
        <DatBoolean path='dynamicLineWidth' label='Динамічна ширина гілки'/>
        <DatSelect path='fractal' label='Фрактал' options={[
            'halfhfractal',
            'treefractal',
        ]} />
    </DatGui>
);


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Wrapper>
                <Container>
                    <ControlsConnected
                        addable={false}
                        ControlItem={Control}
                    />
                </Container>
                <Container>
                    <CanvasConnected width={1000} height={1000} autoUpdateable={false}>
                        {(ctx: CanvasRenderingContext2D, props: any) => {
                            const { items } = props;
                            const { width: w, height: h } = ctx.canvas;
                            const time = (Date.now() - window.performance.timeOrigin) / 1000;
                            (window as any).TIME = time;
                            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                            // console.log(props);
                            
                            ctx.translate(w / 2, h / 2);
                            Fractal(ctx, 0, 0, items[0]);
                            ctx.translate(-w / 2, -h / 2);

                            // props.updateItem({
                            //     ...items[0],
                            //     angle: Math.cos(time), 
                            // });
                        }}
                    </CanvasConnected>
                </Container>
            </Wrapper>
        )
    }
}


export default App;