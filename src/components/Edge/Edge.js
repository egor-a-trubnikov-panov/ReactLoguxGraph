import React, {Component} from 'react';
import pt from "prop-types"
import './Edge.css';


class Edge extends Component {
	static propTypes = {
		x1: pt.number,
		y1: pt.number,
		x2: pt.number,
		y2: pt.number,
		selected: pt.bool,
		onClick: pt.func
	};

	static defaultProps = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		selected: false,
		onClick: Function.prototype
	};

	render() {
		const {x1, y1, x2, y2, onClick, selected} = this.props;
		return (
			<line
				className={`Edge ${selected && 'selected'}`}
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
				onClick={onClick}
			/>
		);
	}
}

export default Edge;
