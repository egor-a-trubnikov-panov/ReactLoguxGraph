import React, {Component} from 'react';
import pt from "prop-types";
import Draggable from 'react-draggable';
import './Toolbox.css';
import {
	equals
} from 'ramda';
import {addVertex, addEdge, removeEdge, removeVertex, buildRoute, clearAll} from '../../constants'

class Toolbox extends Component {
	static propTypes = {
		onAddVertex: pt.func,
		onAddEdge: pt.func,
		onRemoveVertex: pt.func,
		onRemoveEdge: pt.func,
		onBuildRoute: pt.func,
		onClearAll: pt.func,
		operation: pt.string
	};

	static defaultProps = {
		onAddVertex: Function.prototype,
		onAddEdge: Function.prototype,
		onRemoveVertex: Function.prototype,
		onRemoveEdge: Function.prototype,
		onBuildRoute: Function.prototype,
		onClearAll: Function.prototype,
		operation: ''
	};

	render() {
		const {
			onAddVertex,
			onAddEdge,
			onRemoveVertex,
			onRemoveEdge,
			onBuildRoute,
			onClearAll,
			operation
		} = this.props;
		return (
			<Draggable>
				<div className="Toolbox window">
					<h1 className="header">Toolbox</h1>
					<div className="content">
						<button className={equals(operation, addVertex) ? 'active' : ''} onClick={onAddVertex}>Add vertex</button>
						<button className={equals(operation, removeVertex) ? 'active' : ''} onClick={onRemoveVertex}>Remove vertex</button>
						<br/>
						<button className={equals(operation, addEdge) ? 'active' : ''} onClick={onAddEdge}>Add edge</button>
						<button className={equals(operation, removeEdge) ? 'active' : ''} onClick={onRemoveEdge}>Remove edge</button>
						<br/>
						<button className={equals(operation, buildRoute) ? 'active' : ''} onClick={onBuildRoute}>Build a route</button>
						<button className={equals(operation, clearAll) ? 'active' : ''} onClick={onClearAll}>Clear all</button>
					</div>
				</div>
			</Draggable>
		);
	}
}

export default Toolbox;
