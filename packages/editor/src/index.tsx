import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RlangEditor from './Model/RlangEditor';

export default (root: HTMLElement) => {
  const editor = new RlangEditor();
  ReactDOM.render(<App editor={editor} />, root, () => {
    editor.init();
  });
  return editor;
};

// export default () => {};
