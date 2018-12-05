import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions } from '../../store';

import './index.scss';
import propsValidation from 'redux-zero/utils/propsValidation';

const ControlContainer = ({ children }: any) => (
    <tr className="control">
        {children}
    </tr>
);

const AddButton = ({ onClick }: any) => {
    return (
        <ControlContainer>
            <td colSpan={5}>
                <button className="add-button" onClick={onClick}>Add</button>
            </td>
        </ControlContainer>
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
            <ControlContainer>
                <td><input type="number" name="x" onChange={this.updateItem} value={data.x} /></td>
                <td><input type="number" name="y" onChange={this.updateItem} value={data.y} /></td>
                <td><input type="number" name="width" onChange={this.updateItem} value={data.width} /></td>
                <td><input type="number" name="height" onChange={this.updateItem} value={data.height} /></td>
                <td><input type="button" value="x" onClick={() => removeItem(data)} /></td>
            </ControlContainer>
        );
    }
}

class Controls extends React.Component<any, any> {
    render() {
        return (
            <div className="controls">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Width</th>
                            <th>Height</th>
                        </tr>
                        <AddButton onClick={this.props.addItem} />
                    </thead>
                    <tbody>
                        {this.props.items.map((item: any, index: number) =>
                            <Control
                                key={index} data={item}
                                removeItem={this.props.removeItem}
                                updateItem={this.props.updateItem}
                            />
                        )}
                    </tbody>
                </table>
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