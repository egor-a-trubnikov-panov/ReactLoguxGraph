import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './utils/registerServiceWorker';
import React, {Component} from 'react';
import storage from './utils/storage';
import loguxEventsHandler from './utils/loguxEventsHandler'
import Client from 'logux-client/client'
import {defaultState} from './constants'

const logux = new Client({
	credentials: 'token',
	subprotocol: '1.0.0',
	url: window.location.origin.replace(/^http/, 'ws').replace(/:[0-9]*$/, ':1337')
});

logux.sync.connection.connect();


class Provider extends Component {
	state = defaultState;

	componentWillMount() {
		loguxEventsHandler(logux, storage, (storage) => {
			this.setState(storage.getState());
		});
	}

	onSetState = (state) => {
		logux.log.add({
			type: 'setState',
			payload: state
		});
	};

	render() {
		return (
			<App onSetState={this.onSetState} state={this.state}/>
		);
	}
}


ReactDOM.render(<Provider/>, document.getElementById('root'));
registerServiceWorker();
