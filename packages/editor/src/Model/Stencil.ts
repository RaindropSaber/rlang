import { Graph as X6Graph, Shape, Model, Cell, CellView, Node } from '@antv/x6';
import { Stencil as X6Stencil } from '@antv/x6-plugin-stencil';
import { PackageType, T_AST, T_NodePackage, T_Package, PortType } from 'rlang-grammar';
import Editor from './Editor';
import Graph from './Graph';
import { register } from '@antv/x6-react-shape';
import { T_Stencil } from '../Types';
import BaseNode from '../View/BaseNode';
import loadPkg from '../Tools/loadScript';

const defaultPortsGroupLayout = {
  [PortType.I]: {
    position: {
      name: 'left',
    },
    zIndex: 2,
    label: {
      position: 'right',
    },
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
  [PortType.O]: {
    position: {
      name: 'right',
    },
    label: {
      position: 'left',
    },
    zIndex: 2,
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
};
export default class Stencil extends X6Stencil {
  editor: Editor;
  graph: Graph;

  stencilMap: { [groupName: string]: (Node<Node.Properties> | Node.Metadata)[] } = {};
  nodeShapeMap: Map<string, T_Stencil> = new Map();

  constructor(editor: Editor) {
    super({
      target: editor.graph,
      stencilGraphWidth: 300,
      stencilGraphHeight: 900,
      getDragNode: (sourceNode, options) => {
        const targetNode = sourceNode.clone();
        targetNode.size(150, 100);
        return targetNode;
      },
      // groups: [
      //   {
      //     name: '基础类型',
      //     layoutOptions: {
      //       columns: 1,
      //       rowHeight: 40,
      //     },
      //   },
      // ],
    });
    if (editor.stencilDOM.firstChild) {
      editor.stencilDOM.removeChild(editor.stencilDOM?.firstChild);
    }
    editor.stencilDOM.appendChild(this.container);
    this.editor = editor;
    this.graph = editor.graph;
  }
  loadStencil(groups: { [groupName: string]: (Node<Node.Properties> | Node.Metadata)[] }) {
    Object.keys(groups).forEach((groupName) => {
      this.load(groups[groupName], groupName);
    });
  }
  private registerShape(stencil: T_Stencil) {
    if (this.nodeShapeMap.has(stencil.shape)) return;
    register({
      shape: 'BaseNode',
      width: 150,
      height: 100,
      component: BaseNode,
    });
  }
  private async loadPkg(pkg: T_NodePackage): Promise<T_Stencil> {
    return {
      groupName: pkg.group || '基础类型',
      shape: pkg.shape || 'BaseShape',
      component: BaseNode,
    };
  }
  public async createStencil(pkg: T_NodePackage) {
    const ddd = await loadPkg(pkg);
    const stencil = await this.loadPkg(pkg);
    const groupName: string = stencil.groupName;
    const groupNameStencilArr = this.stencilMap[groupName] || [];
    this.registerShape(stencil);
    this.graph.createNode({
      data: { pkg },
      size: { width: 120, height: 30 },
      shape: stencil.shape,
      ports: {
        groups: defaultPortsGroupLayout,
        items: pkg.ports.map((port) => {
          return {
            group: port.type,
            id: port.id,
            attrs: {
              text: {
                text: port.name,
              },
            },
          };
        }),
      },
    });

    pkg.group;
  }
  rlangAddShape() {}
}
