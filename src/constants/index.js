const addVertex = 'addVertex';
const addEdge = 'addEdge';
const removeVertex = 'removeVertex';
const removeEdge = 'removeEdge';
const buildRoute = 'buildRoute';
const clearAll = 'clearAll';
const gridSize = 1000;
const defaultState = {
	operation: null,
	vertexList: [],
	edgeList: [],
	selectedVertex: null,
	path: ''
};

module.exports = {
	addVertex,
	addEdge,
	removeVertex,
	removeEdge,
	buildRoute,
	clearAll,
	gridSize,
	defaultState
};