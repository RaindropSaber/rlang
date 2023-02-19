import { Graph as X6Graph, Shape, Model, Cell, CellView, Node } from '@antv/x6';
import { Stencil as X6Stencil } from '@antv/x6-plugin-stencil';
import Editor from './Editor';

export default class Stencil extends X6Stencil {
  constructor(editor: Editor) {
    super({
      target: editor.graph,
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
    if (editor.stencilDOM.firstChild) {
      editor.stencilDOM.removeChild(editor.stencilDOM?.firstChild);
    }
    editor.stencilDOM.appendChild(this.container);
  }
  loadStencil(groups: { [groupName: string]: (Node<Node.Properties> | Node.Metadata)[] }) {
    Object.keys(groups).forEach((groupName) => {
      this.load(groups[groupName], groupName);
    });
  }
}
