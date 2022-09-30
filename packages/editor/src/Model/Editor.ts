import { makeAutoObservable, observable, action } from 'mobx';
import React, { createContext, RefObject } from 'react';
import { Graph, Shape, Addon, Model, Cell } from '@antv/x6';
class Editor {
  graphDOM!: RefObject<HTMLElement>;
  stencilDOM!: RefObject<HTMLElement>;
  graph!: Graph;
  stencil!: Addon.Stencil;

  isStencilEnabled = observable.box(true);
  selectedNode = observable<Cell<Cell.Properties>>([]);

  constructor() {
    // makeAutoObservable(this);
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
        allowMulti: false,
        allowLoop: false,
        allowNode: false,
        allowEdge: false,
        highlight: true,
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
      },
      keyboard: true,
      clipboard: true,
      history: true,
      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
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
      this.setSelectNode();
    });
    this.graph.on('node:unselected', (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
      this.setSelectNode();
    });
  }
  private initStencil() {
    if (this.stencilDOM.current?.firstChild) {
      this.stencilDOM.current?.removeChild(this.stencilDOM.current?.firstChild);
    }
    this.stencil = new Addon.Stencil({
      target: this.graph,
      groups: [{ name: '基础类型' }],
    });
    this.stencilDOM.current?.appendChild(this.stencil.container);
    const r = new Shape.Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' },
      },
      ports: [
        {
          id: 'port1',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
        {
          id: 'port2',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
        {
          id: 'port3',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
      ],
    });
    this.stencil.load([r, r.clone(), r.clone()], '基础类型');
  }
  setSelectNode = action(() => {
    const cells = this.graph.getSelectedCells();
    this.selectedNode.replace(cells);
  });

  setStencilStatus = action((value = !this.isStencilEnabled.get()) => {
    this.isStencilEnabled.set(value);
  });
}

const EditorContext = createContext<Editor>((null as unknown) as Editor);

export { EditorContext, Editor };
