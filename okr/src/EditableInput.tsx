import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions, selectorAll } from './store';

class EditableInput extends React.Component<any, any> {
	onChange = (e: any) => {
		const { storeRoot, elementKey, elementIndex, index } = this.props;
		const elementCoefs = this.props[storeRoot][elementIndex][elementKey].concat([]);
		elementCoefs[index] = e.target.value;
		this.props.updateItem(storeRoot, this.props[storeRoot][elementIndex], elementKey, elementCoefs);
	}

	shouldComponentUpdate(newProps: any) {
		const { storeRoot, elementKey, elementIndex, index } = this.props;
		const elementCoefs = this.props[storeRoot][elementIndex][elementKey][index];
		return !(
			this.props[storeRoot][elementIndex][elementKey][index]
			===
			newProps[storeRoot][elementIndex][elementKey][index]
		);

	}

	render() {
		const { storeRoot, elementKey, elementIndex, index } = this.props;
		console.log("RENDER");
	    return (
	    	<input
	    		type="text"
	    		value={this.props[storeRoot][elementIndex][elementKey][index]}
	    		onChange={this.onChange}
	    	/>
	    );
	}
}

export default connect( selectorAll, actions )(EditableInput);