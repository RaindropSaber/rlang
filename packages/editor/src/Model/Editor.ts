import React, { createContext, RefObject } from 'react';
import { Graph, Shape, Addon, Model, Cell, CellView, Node } from '@antv/x6';
import EditorStore from './Store';

interface T_X6JSON {
  cells: Cell.Properties[];
}

export default class Editor {
  graphDOM!: RefObject<HTMLElement>;
  stencilDOM!: RefObject<HTMLElement>;
  graph!: Graph;
  stencil!: Addon.Stencil;

  state: EditorStore;

  constructor() {
    this.state = new EditorStore(this);
  }

  setGraphDOM(graphDOM: RefObject<HTMLElement>) {
    this.graphDOM = graphDOM;
  }

  setStencilDOM(stencilDOM: RefObject<HTMLElement>) {
    this.stencilDOM = stencilDOM;
  }

  init() {
    this.initGraph();
    this.initKeyboardEvent();
    this.initSelectEvent();
    this.initEdgeMoveEvent();
    this.initStencil();
  }

  private initGraph() {
    this.graph = new Graph({
      container: this.graphDOM.current!,
      autoResize: document.body,
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      panning: {
        enabled: true,
        eventTypes: ['mouseWheel'],
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowMulti: 'withPort',
        allowLoop: false,
        allowNode: false,
        allowEdge: false,
        highlight: true,
        router: {
          name: 'manhattan',
        },
        connector: 'rounded',
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        showNodeSelectionBox: true,
        // showEdgeSelectionBox: true,
      },
      keyboard: true,
      clipboard: true,
      history: true,
      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
    });
  }
  private initKeyboardEvent() {
    this.graph.bindKey('meta+a', () => {
      console.log('全选');
      const cells = this.graph.getCells();
      this.graph.resetSelection(cells);
      return false;
    });

    this.graph.bindKey('meta+c', () => {
      const cells = this.graph.getSelectedCells();
      if (cells.length) {
        console.log('复制');
        this.graph.copy(cells);
      }
      return false;
    });

    this.graph.bindKey('meta+v', () => {
      if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: 32 });
        console.log('黏贴');
        setTimeout(() => {
          this.graph.resetSelection(cells);
        });
      }
      return false;
    });

    this.graph.bindKey('Backspace', (e) => {
      const cells = this.graph.getSelectedCells();
      if (cells.length) {
        console.log('删除');
        this.graph.removeCells(cells);
        this.graph.cleanSelection();
      }
      return false;
    });

    this.graph.bindKey('meta+z', () => {
      if (this.graph.canUndo()) {
        console.log('撤销');
        this.graph.undo();
      }
      return false;
    });

    this.graph.bindKey('shift+meta+z', () => {
      if (this.graph.canRedo()) {
        console.log('重做');
        this.graph.redo();
      }
      return false;
    });
  }
  private initSelectEvent() {
    this.graph.on('node:selected', (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
      this.state.setSelectNode();
    });
    this.graph.on('node:unselected', (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
      this.state.setSelectNode();
    });
  }
  private initEdgeMoveEvent() {
    this.graph.on('edge:mouseenter', ({ edge }) => {
      edge.addTools([
        {
          name: 'vertices',
          args: {
            // addable: false,
            // stopPropagation: false,
          },
        },
        {
          name: 'button-remove',
          args: {
            distance: '50%',
          },
        },
        'boundary',
        'source-arrowhead',
        'target-arrowhead',
      ]);
    });
    this.graph.on('edge:mouseleave', ({ edge }) => {
      edge.removeTools();
    });
  }
  private initStencil() {
    if (this.stencilDOM.current?.firstChild) {
      this.stencilDOM.current?.removeChild(this.stencilDOM.current?.firstChild);
    }
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 300,
      stencilGraphHeight: 500,
      getDragNode: (sourceNode, options) => {
        const targetNode = sourceNode.clone();
        targetNode.size(150, 100);
        return targetNode;
      },
      groups: [
        {
          name: '基础类型',
          layoutOptions: {
            columns: 1,
            rowHeight: 40,
          },
        },
      ],
    });
    this.stencilDOM.current?.appendChild(this.stencil.container);
  }
  loadStencil(groups: { [groupName: string]: (Node<Node.Properties> | Node.Metadata)[] }) {
    Object.keys(groups).forEach((groupName) => {
      this.stencil.load(groups[groupName], groupName);
    });
  }
}
