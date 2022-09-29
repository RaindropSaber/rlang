import React, { createRef, useEffect, useRef, useState, useContext } from 'react';
import { Graph, Shape, Addon, Model, Cell } from '@antv/x6';
import { GraphModelContext } from '../Model/index';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const GraphCanvas = styled.div`
  flex: 1;
  /* height: auto !important; */
`;

@observer
export default class RGraph extends React.Component<any> {
  graphDOM: React.RefObject<HTMLDivElement>;
  stencilDOM: React.RefObject<HTMLDivElement>;

  static contextType = GraphModelContext;
  graph?: Graph;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.graphDOM = createRef();
    this.stencilDOM = createRef();
  }
  componentDidMount() {
    this.graphDOM.current && this.initGraph();
  }
  initGraph() {
    const graph = new Graph({
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
    this.graph = graph;
    graph.on('node:selected', (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
      const cells = graph.getSelectedCells();
      this.context.selectNode(cells);
    });
    graph.on('node:unselected', (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
      const cells = graph.getSelectedCells();
      this.context.selectNode(cells);
    });

    graph.bindKey('meta+a', () => {
      console.log('全选');
      const cells = graph.getCells();
      graph.resetSelection(cells);
      return false;
    });

    graph.bindKey('meta+c', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        console.log('复制');
        graph.copy(cells);
      }
      return false;
    });

    graph.bindKey('meta+v', () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        console.log('黏贴');
        setTimeout(() => {
          graph.resetSelection(cells);
        });
      }
      return false;
    });

    graph.bindKey('Backspace', (e) => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        console.log('删除');
        graph.removeCells(cells);
        graph.cleanSelection();
      }
      return false;
    });

    graph.bindKey('meta+z', () => {
      if (graph.canUndo()) {
        console.log('撤销');
        graph.undo();
      }
      return false;
    });

    graph.bindKey('shift+meta+z', () => {
      if (graph.canRedo()) {
        console.log('重做');
        graph.redo();
      }
      return false;
    });

    this.context.initGraph(graph);
  }
  render() {
    return <GraphCanvas ref={this.graphDOM}></GraphCanvas>;
  }
}
