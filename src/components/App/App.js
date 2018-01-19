import React, {Component} from 'react';
import {
	equals,
	append,
	set,
	compose,
	not,
	isNil,
	lensProp,
	remove,
	prop,
	filter,
	memoize,
	indexOf,
	__,
	or,
	and
} from 'ramda';
import pt from "prop-types"
import {find_path} from 'dijkstrajs';
import './App.css';
import Vertex from '../Vertex'
import Toolbox from '../Toolbox'
import Edge from '../Edge'
import Path from '../Path'
import {
	addVertex,
	addEdge,
	removeEdge,
	removeVertex,
	buildRoute,
	clearAll,
	gridSize,
	defaultState
} from '../../constants'
import getPosition from '../../utils/screen'

const deleteByIndex = remove(__, 1, __);
const getEdgeLength = memoize((x1, x2, y1, y2) => Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
const getGraph = (vertexList, edgeList) => {
	const graph = {};

	const setToGraph = (addedVertex, id, edge) => {
		const {vertexOne, vertexTwo} = edge;
		graph[`${id}`] = set(
			lensProp(`${indexOf(addedVertex, vertexList)}`),
			getEdgeLength(vertexOne.positionX, vertexTwo.positionX, vertexOne.positionY, vertexTwo.positionY),
			or(graph[`${id}`], {})
		)
	};
	vertexList.forEach((item, id) => {
		edgeList.forEach((edge) => {
			if (equals(edge.vertexOne, item)) {
				setToGraph(edge.vertexTwo, id, edge);
			}
			if (equals(edge.vertexTwo, item)) {
				setToGraph(edge.vertexOne, id, edge);
			}
		})
	});

	return graph
};
const getPath = memoize((vertexList, edgeList, startIndex, endIndex) => {
	const pathList = find_path(getGraph(vertexList, edgeList), startIndex, endIndex);

	return pathList.map((item, id) => {
		const {positionX, positionY} = vertexList[item];
		return `${equals(id, 0) ? 'M' : 'L'} ${positionX},${positionY}`
	}).join(' ');
});

class App extends Component {
	static propTypes = {
		onSetState: pt.func,
		state: pt.object
	};

	static defaultProps = {
		onSetState: Function.prototype,
		state: defaultState
	};

	handleClickPlace = (event) => {
		const {state, state: {operation, vertexList}, onSetState} = this.props;
		const {positionX, positionY} = getPosition(event);
		if (equals(operation, addVertex)) {
			onSetState(set(lensProp('vertexList'), append({positionX, positionY}, vertexList), state))
		}
	};

	handleSelectVertex = (key) => () => {
		const {state, state: {operation, selectedVertex, edgeList, vertexList}, onSetState} = this.props;
		if (equals(operation, addEdge)) {
			if (and(not(isNil(selectedVertex)), not(equals(selectedVertex, key)))) {
				onSetState(
					compose(
						set(lensProp('selectedVertex'), null),
						set(lensProp('edgeList'), append(
							{
								vertexOne: vertexList[selectedVertex],
								vertexTwo: vertexList[key]
							},
							edgeList
						))
					)(state)
				);
			} else {
				onSetState(
					set(lensProp('selectedVertex'), key, state)
				)
			}
		}

		if (equals(operation, removeVertex)) {
			onSetState(
				compose(
					set(lensProp('selectedVertex'), null),
					set(lensProp('vertexList'), deleteByIndex(key, vertexList)),
					set(
						lensProp('edgeList'),
						filter(
							({vertexOne, vertexTwo}) => not([vertexOne, vertexTwo].includes(vertexList[key])),
							edgeList
						)
					),
				)(state)
			)
		}

		if (equals(operation, buildRoute)) {
			if (not(isNil(selectedVertex))) {
				onSetState(
					compose(
						set(lensProp('selectedVertex'), null),
						set(lensProp('path'), getPath(vertexList, edgeList, `${selectedVertex}`, `${key}`))
					)(state)
				)
			} else {
				onSetState(
					set(lensProp('selectedVertex'), key, state)
				)
			}
		}

	};

	handleSetOperation = (operation) => () => {
		const {state, onSetState} = this.props;
		if (equals(operation, clearAll)) {
			onSetState(defaultState)
		} else {
			onSetState(
				compose(
					set(lensProp('operation'), operation),
					set(lensProp('selectedVertex'), null),
					set(lensProp('path'), '')
				)(state)
			)
		}
	};

	handleSelectEdge = (key) => () => {
		const {state, state: {operation, edgeList}, onSetState} = this.props;
		if (equals(operation, removeEdge)) {
			onSetState(
				set(lensProp('edgeList'), deleteByIndex(key, edgeList), state)
			)
		}
	};

	renderVertex = (vertex, key) => {
		const {selectedVertex} = this.props.state;
		const {positionX, positionY} = vertex;
		return (
			<Vertex
				key={key}
				positionX={positionX}
				positionY={positionY}
				selected={equals(selectedVertex, key)}
				onClick={this.handleSelectVertex(key)}
			>
				{key}
			</Vertex>
		)
	};

	renderEdge = (edge, key) => {
		const {vertexOne, vertexTwo} = edge;
		return <Edge
			key={key}
			x1={prop('positionX', vertexOne)}
			y1={prop('positionY', vertexOne)}
			x2={prop('positionX', vertexTwo)}
			y2={prop('positionY', vertexTwo)}
			onClick={this.handleSelectEdge(key)}
		/>
	};

	render() {
		const {operation, edgeList, vertexList, path} = this.props.state;
		return (
			<div className="App">
				<svg
					className="App-place"
					viewBox={`0 0 ${gridSize} ${gridSize}`}
					onClick={this.handleClickPlace}
				>
					<rect id={'place'} width={gridSize} height={gridSize} x={0} y={0} fill={'rgba(0,0,0,0.05)'}/>
					{edgeList.map(this.renderEdge)}
					{vertexList.map(this.renderVertex)}
					<Path path={path}/>
				</svg>
				<Toolbox
					operation={operation}
					onAddEdge={this.handleSetOperation(addEdge)}
					onAddVertex={this.handleSetOperation(addVertex)}
					onRemoveVertex={this.handleSetOperation(removeVertex)}
					onRemoveEdge={this.handleSetOperation(removeEdge)}
					onBuildRoute={this.handleSetOperation(buildRoute)}
					onClearAll={this.handleSetOperation(clearAll)}
				/>
			</div>
		);
	}
}

export default App;
