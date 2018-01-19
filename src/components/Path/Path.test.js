import React from 'react';
import ReactDOM from 'react-dom';
import Path from './Path';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Path />, div);
});
