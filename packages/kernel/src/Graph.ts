import {
  T_Node,
  T_Pipe,
  T_Package,
  NodeType,
  T_Port,
  RuntimeEnv,
  PortType,
  T_JSON,
  T_AST,
  PackageType,
} from 'rlang-grammar';
import Node from './Node';
import Pipe from './Pipe';

export default class Graph {
  ast: T_AST;
  app: any;
  nodeInsMap!: Map<T_Node['id'], Node<any>>;
  pipeInsMap!: Map<T_Pipe['id'], Pipe>;
  packageMap!: Map<string, typeof Node | typeof Pipe>;

  private sort(nodeInsList: Node<any>[]) {
    return nodeInsList.reduce((sortList, node) => {
      node.nodeType === NodeType.R ? sortList.push(node) : sortList.unshift(node);
      return sortList;
    }, [] as Node<any>[]);
  }

  injectPackage(packageName: T_Package<PackageType>['name'], packageContext: typeof Node | typeof Pipe) {
    this.packageMap.set(packageName, packageContext);
  }

  requirePackage(packageName: T_Package<PackageType>['name']) {
    return this.packageMap.get(packageName);
  }

  createNode({ id, packageName, ports, attribute }: T_Node) {
    const NodeClass = this.requirePackage(packageName) as typeof Node;
    const nodeIns = new NodeClass({ ports, attribute, id });
    nodeIns.attach(this);
    return nodeIns;
  }

  createPipe({ id, packageName, attribute, IN, OUT }: T_Pipe) {
    const PipeClass = this.requirePackage(packageName) as typeof Pipe;
    const pipeIns = new PipeClass({ id, attribute });
    pipeIns.attach(this);

    const o = this.nodeInsMap.get(OUT.nodeId)?.$O(OUT.portId);
    const i = this.nodeInsMap.get(IN.nodeId)?.$I(IN.portId);

    if (!o || !i || !pipeIns) throw new Error(`pipe error. pipe:${id}`);

    pipeIns.connect(o, i);

    return pipeIns;
  }
  init() {
    const { nodes, pipes, pkgs } = this.ast;

    nodes.forEach((node) => {
      const nodeIns = this.createNode(node);
      this.nodeInsMap.set(nodeIns.id, nodeIns);
    });

    pipes.forEach((pipe) => {
      const pipeIns = this.createPipe(pipe);
      this.pipeInsMap.set(pipeIns.id, pipeIns);
    });
  }
  get nodes() {
    return this.ast.nodes;
  }
  get pipes() {
    return this.ast.pipes;
  }
  get pkgs() {
    return this.ast.pkgs;
  }
  constructor(ast: T_AST) {
    this.ast = ast;
    this.packageMap = new Map<string, typeof Node | typeof Pipe>();
    this.nodeInsMap = new Map<T_Node['id'], Node<any>>();
    this.pipeInsMap = new Map<T_Pipe['id'], Pipe>();
  }

  setApp<T>(app: T) {
    this.app = app;
  }
  start() {
    this.init();
    this.sort([...this.nodeInsMap.values()]).forEach((node) => {
      node.ready(node.$I, node.$O);
    });
  }
}
