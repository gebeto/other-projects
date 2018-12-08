import * as React from 'react';
import './index.scss';

export default class About extends React.Component<any, any> {
	state = {
		shown: false,
	}

	show = () => {
		this.setState((state: any) => ({
			shown: true,
		}));
	}

	hide = () => {
		this.setState((state: any) => ({
			shown: false,
		}));
	}

	render() {
		const { author, children } = this.props;
	    return (
	        <div className={`about`}>
	        	<button className="about__show-button" onClick={this.state.shown ? this.hide : this.show}>
	        		i
	        	</button>
	        	<div className={`about__content ${this.state.shown && 'shown'}`}>
	        		<h2 className="about__content-title">{author}</h2>
	        		<p className="about__content-info">{children}</p>
	        	</div>
	        </div>
	    );
	}
};