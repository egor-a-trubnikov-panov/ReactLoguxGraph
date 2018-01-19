import React from 'react';
import ReactDOM from 'react-dom';
import Toolbox from './Toolbox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Toolbox />, div);
});
