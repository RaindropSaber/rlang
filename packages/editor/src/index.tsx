import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Editor from './Editor';
import { GraphModelContext, Model } from './Model/index';
import '@antv/x6-react-shape';

class RLangEditor {
  container: HTMLElement;
  opt: any;
  constructor(opt: any) {
    this.opt = opt;
    this.container = opt.container;
  }
  render() {
    ReactDOM.render(
      <GraphModelContext.Provider value={new Model()}>
        <Editor />
      </GraphModelContext.Provider>,
      this.container
    );
  }
}

export default RLangEditor;
