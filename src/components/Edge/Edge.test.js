import React from 'react';
import ReactDOM from 'react-dom';
import Edge from './Edge';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Edge />, div);
});
