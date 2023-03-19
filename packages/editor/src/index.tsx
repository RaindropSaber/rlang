import { createRoot } from 'react-dom/client';
import { T_AST } from 'rlang-grammar';
import Model from './Model/Editor';
import EditorContext from './Store/Context';
import { T_Edeitor_Config } from './Types';
import Editor from './View/Editor';

export default class RlangEditor {
  config: T_Edeitor_Config;
  model: Model;
  constructor(config: T_Edeitor_Config) {
    this.config = config;
    this.model = new Model(config);
    const root = createRoot(this.config.container);
    root.render(
      <EditorContext.Provider value={this.model}>
        <Editor />
      </EditorContext.Provider>
    );
  }
  start() {
    return new Promise((r) => this.model.init(() => r(this)));
  }
  render(ast: T_AST) {
    this.model.render(ast);
  }
  toJSON() {}
  addPackage() {}
  onChange() {}
}
