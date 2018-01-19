import {min, max, gt} from 'ramda';
import {gridSize} from '../constants'

const screen = {};
const sectionsSize = {};

const handleResize = () => {
	screen.width = window.innerWidth;
	screen.height = window.innerHeight;
	screen.min = min(screen.width, screen.height);
	screen.max = max(screen.width, screen.height);
	screen.isLandscape = gt(screen.width, screen.height);
	screen.padding = screen.max - screen.min;

	if (screen.isLandscape) {
		sectionsSize.width = (screen.width - screen.padding) / gridSize;
		sectionsSize.height = screen.height / gridSize
	} else {
		sectionsSize.width = screen.width / gridSize;
		sectionsSize.height = (screen.height - screen.padding) / gridSize
	}
};

window.addEventListener('resize', handleResize);
handleResize();

export default (event) => {
	const {clientX, clientY} = event;
	let positionX, positionY;

	if (screen.isLandscape) {
		positionX = (clientX - screen.padding / 2 ) / sectionsSize.width;
		positionY = clientY / sectionsSize.height
	} else {
		positionX = clientX / sectionsSize.width;
		positionY = (clientY - screen.padding / 2) / sectionsSize.height
	}
	return {positionY, positionX}
}