import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions } from '../../store';

import './index.scss';
import propsValidation from 'redux-zero/utils/propsValidation';


const AddButton = ({ onClick }: any) => {
    return (
        <div className="add-button">
            <button onClick={onClick}>Add</button>
        </div>
    );
}

class Control extends React.Component<any, any> {
    updateItem = (e: any) => {
        this.props.updateItem(this.props.data, {
            [e.target.name]: e.target.value || 0
        });
    }

    render() {
        const { data, removeItem, updateItem } = this.props;
        return (
            <li className="control">
                <table><tbody>
                    <tr>
                        <td>X</td>
                        <td><input type="number" name="x" onChange={this.updateItem} value={data.x} /></td>
                    </tr>
                    <tr>
                        <td>Y</td>
                        <td><input type="number" name="y" onChange={this.updateItem} value={data.y} /></td>
                    </tr>
                    <tr>
                        <td>Ширина</td>
                        <td><input type="number" name="width" onChange={this.updateItem} value={data.width} /></td>
                    </tr>
                    <tr>
                        <td>Висота</td>
                        <td><input type="number" name="height" onChange={this.updateItem} value={data.height} /></td>
                    </tr>
                    <tr>
                        <td>Колір кола</td>
                        <td><input type="color" name="circleColor" onChange={this.updateItem} value={data.circleColor} /></td>
                    </tr>
                    <tr>
                        <td>Колір діагоналей</td>
                        <td><input type="color" name="diagonalColor" onChange={this.updateItem} value={data.diagonalColor} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><input type="button" value="Видалити" onClick={() => removeItem(data)} /></td>
                    </tr>
                </tbody></table>
            </li>
        );
    }
}

class Controls extends React.Component<any, any> {
    render() {
        return (
            <div className="controls">
                <AddButton onClick={this.props.addItem} />
                <ul className="controls-wrapper">
                    {this.props.items.map((item: any, index: number) =>
                        <Control
                        key={index} data={item}
                        removeItem={this.props.removeItem}
                        updateItem={this.props.updateItem}
                        />
                    )}
                </ul>
            </div>
        );
    }
}


export default connect(
    (state: any) => ({
        items: state.items,
    }),
    actions
)(Controls);