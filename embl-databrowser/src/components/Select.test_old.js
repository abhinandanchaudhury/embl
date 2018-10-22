import React from 'react';
import ReactDOM from 'react-dom';
import SelectEle from './Select';

it('Select renders without crashing', () => {
  const div = document.createElement('select');
  ReactDOM.render(<SelectEle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
