import { makeAutoObservable, observable, action } from 'mobx';
import { Graph, Shape, Addon, Model, Cell, CellView } from '@antv/x6';
import Editor from './Editor';

export default class EditorStore {
  isStencilEnabled = observable.box(true);
  selectedNode = observable<Cell<Cell.Properties>>([]);
  editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
    makeAutoObservable(this);
  }
  setSelectNode = action(() => {
    const cells = this.editor.graph.getSelectedCells();
    this.selectedNode.replace(cells);
  });

  setStencilStatus = action((value = !this.isStencilEnabled.get()) => {
    this.isStencilEnabled.set(value);
  });
}
