import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './utils/registerServiceWorker';
import React, {Component} from 'react';
import {defaultState} from './constants'

class Provider extends Component {
	state = defaultState;

	componentWillMount() {
		fetch('./api')
			.then(function (res) {
				return res.json();
			})
			.then((data) => {
				this.setState(data);
			});
	}

	onSetState = (state) => {
		this.setState(state);
		fetch("./api",
			{
				method: "POST",
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(state)
			})
	};

	render() {
		return (
			<App onSetState={this.onSetState} state={this.state}/>
		);
	}
}


ReactDOM.render(<Provider/>, document.getElementById('root'));
registerServiceWorker();
