import React, {Component} from 'react';
import pt from "prop-types"
import './Path.css';
import dino from './dino.gif'

class Path extends Component {
	static propTypes = {
		path: pt.string
	};

	static defaultProps = {
		path: ''
	};

	render() {
		const {path} = this.props;
		if (path) {
			return [
				<path key={'path'} className={'Path'} id={'path'} d={path}/>,
				<image key={'marker'} x="-47" y="-47" width="95" height="95" xlinkHref={dino}>
					<animateMotion dur="12s" rotate="auto" fill="freeze" repeatCount="indefinite">
						<mpath xlinkHref="#path"/>
					</animateMotion>
				</image>
			]
		}
		return null
	}
}

export default Path;
