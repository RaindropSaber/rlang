import { Graph, Addon } from '@antv/x6';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

class Model {
  graph: Graph | null = null;
  stencil: Addon.Stencil | null = null;
  stencilActivation = true;
  selectedNode: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  initGraph(graph: Graph) {
    this.graph = graph;
  }
  initStencil(stencil: Addon.Stencil) {
    this.stencil = stencil;
  }

  selectNode(selectedNode: any) {
    this.selectedNode.replace(selectedNode);
  }

  unselectNode(selectedNode: any) {
    this.selectedNode = [];
  }
  changeStencilActivation(value = !this.stencilActivation) {
    this.stencilActivation = value;
  }
}

const GraphModelContext = createContext<any>(null);

export { GraphModelContext, Model };
