import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import rlangEditor from 'rlang-editor';
import { GraphModelContext, Model } from './Model/index';

ReactDOM.render(
  <GraphModelContext.Provider value={new Model()}>
    <App />
  </GraphModelContext.Provider>,
  document.getElementById('root')
);
