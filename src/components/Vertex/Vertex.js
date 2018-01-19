import React, {Component} from 'react';
import pt from "prop-types"
import './Vertex.css';


class Vertex extends Component {
	static propTypes = {
		positionX: pt.number,
		positionY: pt.number,
		radius: pt.number,
		children: pt.number,
		selected: pt.bool,
		onClick: pt.func
	};

	static defaultProps = {
		positionX: 0,
		positionY: 0,
		radius: 5,
		children: 0,
		selected: false,
		onClick: Function.prototype
	};

	render() {
		const {positionX, positionY, radius, onClick, selected, children} = this.props;
		return [
			<circle
				key={'circle'}
				className={`Vertex ${selected && 'selected'}`}
				r={radius}
				cx={positionX}
				cy={positionY}
				onClick={onClick}
			/>,
			<text
				key={'label'}
				x={positionX + 5}
				y={positionY}
			>
				{children}
			</text>
		]
	}
}

export default Vertex;
