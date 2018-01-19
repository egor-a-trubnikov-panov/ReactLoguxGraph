import React from 'react';
import ReactDOM from 'react-dom';
import Vertex from './Vertex';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Vertex />, div);
});
