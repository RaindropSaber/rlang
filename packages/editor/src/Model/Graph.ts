import Editor from './Editor';
import { Graph as X6Graph } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';

import { Snapline } from '@antv/x6-plugin-snapline';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { History } from '@antv/x6-plugin-history';
import { Selection } from '@antv/x6-plugin-selection';

// interface T_X6JSON {
//   cells: Cell.Properties[];
// }

const defineGraphConfig = (editor: Editor): Partial<Options.Manual> => ({
  container: editor.graphDOM,
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
    // allowMulti: 'withPort',
    allowLoop: false,
    allowNode: false,
    allowEdge: false,
    highlight: true,
    router: {
      name: 'manhattan',
    },
    connector: 'rounded',
  },
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

export default class Graph extends X6Graph {
  editor: Editor;

  constructor(editor: Editor) {
    super(defineGraphConfig(editor));
    this.editor = editor;
    this.use(new Snapline({ enabled: true }));
    this.use(new Clipboard({ enabled: true }));
    this.use(new Keyboard({ enabled: true }));
    this.use(new History({ enabled: true }));
    this.use(
      new Selection({
        enabled: true,
        multiple: true,
        rubberband: true,
        showNodeSelectionBox: true,
        // showEdgeSelectionBox: true,
      })
    );
    this.initKeyboardEvent();
    this.initSelectEvent();
    this.initEdgeMoveEvent();
  }

  init() {}

  private initKeyboardEvent() {
    this.bindKey('meta+a', () => {
      console.log('全选');
      const cells = this.getCells();
      this.resetSelection(cells);
      return false;
    });

    this.bindKey('meta+c', () => {
      const cells = this.getSelectedCells();
      if (cells.length) {
        console.log('复制');
        this.copy(cells);
      }
      return false;
    });

    this.bindKey('meta+v', () => {
      if (!this.isClipboardEmpty()) {
        const cells = this.paste({ offset: 32 });
        console.log('黏贴');
        setTimeout(() => {
          this.resetSelection(cells);
        });
      }
      return false;
    });

    this.bindKey('Backspace', (e) => {
      const cells = this.getSelectedCells();
      if (cells.length) {
        console.log('删除');
        this.removeCells(cells);
        this.cleanSelection();
      }
      return false;
    });

    this.bindKey('meta+z', () => {
      if (this.canUndo()) {
        console.log('撤销');
        this.undo();
      }
      return false;
    });

    this.bindKey('shift+meta+z', () => {
      if (this.canRedo()) {
        console.log('重做');
        this.redo();
      }
      return false;
    });
  }
  private initSelectEvent() {
    this.on('node:selected', (args) => {
      this.editor.state.setSelectNode();
    });
    this.on('node:unselected', (args) => {
      this.editor.state.setSelectNode();
    });
  }
  private initEdgeMoveEvent() {
    this.on('edge:mouseenter', ({ edge }) => {
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
    this.on('edge:mouseleave', ({ edge }) => {
      edge.removeTools();
    });
  }
}
