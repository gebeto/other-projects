import * as React from 'react';
import './index.scss';


export class Wrapper extends React.Component<any, any> {
    render() {
        return (
            <div className="wrapper">
                {this.props.children}
            </div>
        )
    }
}

export const Container = ({ children }: any) => (
    <div className="wrapper__container">
        {children}
    </div>
)