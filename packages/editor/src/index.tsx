import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Editor } from './Model/Editor';

class RlangEditor {
  opt: any;
  editor: Editor;
  constructor(opt?: any) {
    this.opt = opt;
    this.editor = new Editor();
  }
  render(root: HTMLElement) {
    ReactDOM.render(<App editor={this.editor} />, root, () => {
      this.editor.init();
    });
  }
  addNodeToStencil() {
    this.editor;
  }
}

export default RlangEditor;
