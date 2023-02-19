import { Cell, Node } from '@antv/x6';
import { T_Edeitor_Config } from '../Types';
import Store from '../Store';
import Graph from './Graph';
import Stencil from './Stencil';
import { PackageType, PortType, T_AST } from 'rlang-grammar';
import BaseNode from '../View/BaseNode';
import { register } from '@antv/x6-react-shape';
interface T_X6JSON {
  cells: Cell.Properties[];
}

class EditorModel {
  nodeShapeSet: Set<string> = new Set();
  edgeShapeSet: Set<string> = new Set();
  defaultPortsGroupLayout: any = null;

  graphDOM?: HTMLElement;
  config: T_Edeitor_Config;
  state: Store;
  ast: T_AST = {
    nodes: [],
    pipes: [],
    pkgs: [],
  };
  readyCallback?: Function;
  constructor(config: T_Edeitor_Config) {
    this.config = config;
    this.state = new Store(this);
    this.initShape();
  }
  isReady(callback: Function) {
    this.readyCallback = callback;
  }

  public init() {
    console.log('initinitinit');
    if (this.graphDOM && this._stencilDOM) {
      this.initGraph();
      this.initStencil();
      this.readyCallback?.();
    }
  }

  // graph
  private _graph?: Graph;
  get graph() {
    if (this._graph) return this._graph;
    throw new Error('graph is not init');
  }
  private initGraph() {
    this._graph = new Graph(this);
  }
  public setGraphDOM(graphDOM: HTMLElement) {
    this.graphDOM = graphDOM;
    this.init();
  }

  // Stencil
  private _stencil?: Stencil;
  get stencil() {
    if (this._stencil) return this._stencil;
    throw new Error('stencil is not init');
  }
  private _stencilDOM?: HTMLElement;
  get stencilDOM() {
    if (this._stencilDOM) return this._stencilDOM;
    throw new Error('stencilDOM is not init');
  }
  private initStencil() {
    this._stencil = new Stencil(this);
  }
  public setStencilDOM(stencilDOM: HTMLElement) {
    this._stencilDOM = stencilDOM;
    this.init();
    // throw new Error('Method not implemented.');
  }

  private initShape() {
    this.edgeShapeSet.add('edge');
    this.nodeShapeSet.add('BaseNode');
    this.defaultPortsGroupLayout = {
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
    register({
      shape: 'BaseNode',
      width: 150,
      height: 100,
      component: BaseNode,
    });
  }
  // private isNode(cell: Cell.Properties) {
  //   return this.graph.nodeShapeSet.has(cell.shape!);
  // }
  // private isEdge(cell: Cell.Properties) {
  //   return this.edgeShapeSet.has(cell.shape!);
  // }
  private renderPackage(ast: T_AST) {
    const stencil: { [groupName: string]: (Node<Node.Properties> | Node.Metadata)[] } = {};

    ast.pkgs.forEach((pkg) => {
      if (pkg.type === PackageType.Node) {
        const groupName: string = pkg.group || '基础类型';
        const stencilArr = stencil[groupName] || [];
        stencilArr.push(
          this.graph.createNode({
            data: { pkg },
            size: { width: 120, height: 30 },
            shape: 'BaseNode',
            ports: {
              groups: this.defaultPortsGroupLayout,
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
          })
        );
        stencil[groupName] = stencilArr;
        this.stencil.loadStencil(stencil);
      }
    });
  }
  private renderCell(ast: T_AST) {
    const x6json = this.toX6();
    // this.graph.fromJSON(x6json);
  }
  private toX6(): T_X6JSON {
    const x6json: T_X6JSON = { cells: [] };
    const { nodes, pipes } = this.ast;
    nodes.forEach((node) => {
      const cellInfo = {
        id: node.id,
        ports: {
          groups: this.defaultPortsGroupLayout,
          items: node.ports.map((port) => {
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
        ...node.view,
      };
      x6json.cells.push(cellInfo);
    });
    pipes.forEach((pipe) => {
      const cellInfo = {
        shape: 'edge',
        id: pipe.id,
        source: {
          cell: pipe.OUT.nodeId,
          port: pipe.OUT.portId,
        },
        target: {
          cell: pipe.IN.nodeId,
          port: pipe.IN.portId,
        },
        ...pipe.view,
      };
      x6json.cells.push(cellInfo);
    });
    return x6json;
  }
  // private toAST(): T_AST {
  //   const { cells = [] } = this.graph.toJSON();
  //   const ast: T_AST = {
  //     nodes: [],
  //     pipes: [],
  //     pkgs: this.ast.pkgs,
  //   };
  //   cells.forEach((cell) => {
  //     if (this.isNode(cell)) {
  //       ast.nodes.push({
  //         id: cell.id!,
  //         packageName: cell.data?.pkg.name,
  //         attribute: cell.data?.attribute || {},
  //         ports: cell.ports.items.map((item: any) => ({
  //           id: item.id,
  //           name: item.attrs.text.text,
  //           type: item.group,
  //           desc: item.attrs.text.text,
  //         })),
  //         view: {
  //           position: cell.position,
  //           shape: cell.shape,
  //           data: cell.data,
  //           zIndex: cell.zIndex,
  //         },
  //       });
  //     } else if (this.isEdge(cell)) {
  //       ast.pipes.push({
  //         id: cell.id!,
  //         packageName: cell.data?.pkg.id || 'rlang-node-basepipe', //TODO suppot custom pipe
  //         attribute: cell.data?.attribute || {},
  //         [PortType.I]: {
  //           nodeId: cell.target.cell,
  //           portId: cell.target.port,
  //         },
  //         [PortType.O]: {
  //           nodeId: cell.source.cell,
  //           portId: cell.source.port,
  //         },
  //         view: {
  //           zIndex: cell.zIndex,
  //         },
  //       });
  //     } else {
  //       throw new Error(JSON.stringify(cell));
  //     }
  //   });
  //   return ast;
  // }
  // public toJSON(): T_AST {
  //   return this.toAST();
  // }
  public render(ast: T_AST) {
    this.ast = ast;
    this.renderPackage(ast);
    this.renderCell(ast);
  }
}

export default EditorModel;
