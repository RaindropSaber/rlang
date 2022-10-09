import React, { createContext } from 'react';
import Editor from './Editor';

class RlangEditor extends Editor {
  opt: any;
  constructor(opt?: any) {
    super();
    this.opt = opt;
  }
  addNodeToStencil() {}
  toJSON() {
    return this.graph.toJSON();
  }
}

export const EditorContext = createContext<RlangEditor>((null as unknown) as RlangEditor);
export default RlangEditor;
