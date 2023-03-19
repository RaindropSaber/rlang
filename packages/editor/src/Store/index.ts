import { Cell } from '@antv/x6';
import { action, makeAutoObservable, observable } from 'mobx';
import Model from '../Model/Editor';

export default class EditorStore {
  public isStencilEnabled = observable.box(true);
  public selectedNode = observable<Cell<Cell.Properties>>([]);
  public model: Model;
  constructor(model: Model) {
    this.model = model;
    makeAutoObservable(this);
  }
  public setSelectNode = action(() => {
    // const cells = this.model.graph.getSelectedCells();
    // this.selectedNode.replace(cells);
  });

  public setStencilStatus = action((value = !this.isStencilEnabled.get()) => {
    this.isStencilEnabled.set(value);
  });
}
