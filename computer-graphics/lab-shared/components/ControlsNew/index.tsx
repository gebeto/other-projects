import 'react-dat-gui/build/react-dat-gui.css';

import * as React from 'react';
import DatGui, { DatButton } from 'react-dat-gui';
import './index.scss';

export interface ControlItemProps {
    key: any;
    data: any;
    update: (...args: any) => any,
    remove: (...args: any) => any,
    title: any,
    globals: any,
}

export interface ControlsProps {
    addButtonTitle: string,
    ControlItem: React.ComponentClass<ControlItemProps, any>;
    ControlCoreItem: React.ComponentClass<any, any>;
    updateItem: any;
    addItem: any;
    removeItem: any;
    items: any[];
    calssName?: string;
    addable?: boolean;
    [key: string]: any;
}

export default class Controls extends React.Component<ControlsProps, any> {
    static defaultProps = {
        addable: true,
    };

    update = (data: any) => this.props.updateItem(data, data);
    add = () => this.props.addItem();
    remove = (...args: any) => this.props.removeItem(...args);

    render() {
        const { ControlItem, ControlCoreItem, calssName} = this.props;
        return (
            <div className="scrollable">
                {ControlCoreItem ? <ControlCoreItem /> : null}
                {this.props.items.map((item: any, index: number) =>
                    <ControlItem
                        key={index}
                        data={item}
                        update={this.update}
                        remove={this.remove}
                        title={item.name}
                        globals={this.props.globals}
                    />
                )}
            </div>
        );
    }
}