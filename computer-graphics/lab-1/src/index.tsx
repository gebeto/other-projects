import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'redux-zero/react';

import { store } from './store';
import App from './components/App';


ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById('app'),
);
