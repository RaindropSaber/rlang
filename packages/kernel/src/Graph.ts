import { T_Node, T_Pipe, T_Link, T_Package, NodeType, T_Port, RuntimeEnv, PortType, T_JSON, T_AST, PackageType } from 'rlang-grammar'
import Link from './Link'
import Node from './Node'
import Pipe from './Pipe'

export default class Graph {
  ast: T_AST
  app: any
  nodeInsMap!: Map<T_Node['id'], Node<any>>
  pipeInsMap!: Map<T_Pipe['id'], Pipe>
  packageMap!: Map<string, typeof Node | typeof Pipe>
  linkInsMap: Map<string, Link<any, any>>

  private sort(nodeInsList: Node<any>[]) {
    return nodeInsList.reduce((sortList, node) => {
      node.type === NodeType.R ? sortList.push(node) : sortList.unshift(node)
      return sortList
    }, [] as Node<any>[])
  }

  injectPackage(packageId: T_Package<PackageType>['id'], packageContext: typeof Node | typeof Pipe) {
    this.packageMap.set(packageId, packageContext)
  }

  requirePackage(packageId: T_Package<PackageType>['id']) {
    return this.packageMap.get(packageId)
  }

  createNode({ id, packageId, ports, attribute }: T_Node) {
    const NodeClass = this.requirePackage(packageId) as typeof Node
    const nodeIns = new NodeClass({ ports, attribute, id })
    nodeIns.attach(this)
    return nodeIns
  }

  createPipe({ id, packageId, attribute }: T_Pipe) {
    const PipeClass = this.requirePackage(packageId) as typeof Pipe
    const pipeIns = new PipeClass({ id, attribute })
    pipeIns.attach(this)
    return pipeIns
  }

  createLink({ id, pipeId, IN, OUT }: T_Link) {
    const pipe = this.pipeInsMap.get(pipeId)

    const o = this.nodeInsMap.get(OUT.nodeId)?.$O(OUT.portId)
    const i = this.nodeInsMap.get(IN.nodeId)?.$I(IN.portId)

    if (!o || !i || !pipe) throw new Error(`link error. link:${id}`)

    const linkIns = pipe.createLink(o, i)
    linkIns.id = id
    return linkIns
  }

  init() {
    const { nodes, pipes, links, pkgs } = this.ast

    // this.packageMap = pkg.reduce((packageMap, { id, packageName, packageType, meta }) => {
    //   return packageMap
    // }, this.packageMap)

    nodes.forEach((node) => {
      const nodeIns = this.createNode(node)
      this.nodeInsMap.set(nodeIns.id, nodeIns)
    })

    pipes.forEach((pipe) => {
      const pipeIns = this.createPipe(pipe)
      this.pipeInsMap.set(pipeIns.id, pipeIns)
    })

    links.forEach((link) => {
      const linkIns = this.createLink(link)
      this.linkInsMap.set(linkIns.id!, linkIns)
    })
  }
  get nodes() {
    return this.ast.nodes
  }
  get pipes() {
    return this.ast.pipes
  }
  get links() {
    return this.ast.links
  }
  get pkgs() {
    return this.ast.pkgs
  }
  constructor(ast: T_AST) {
    this.ast = ast
    this.packageMap = new Map<string, typeof Node | typeof Pipe>()
    this.nodeInsMap = new Map<T_Node['id'], Node<any>>()
    this.pipeInsMap = new Map<T_Pipe['id'], Pipe>()
    this.linkInsMap = new Map<T_Link['id'], Link<any, any>>()
  }

  setApp<T>(app: T) {
    this.app = app
  }
  start() {
    this.init()
    this.sort([...this.nodeInsMap.values()]).forEach((node) => {
      node.ready(node.$I, node.$O)
    })
  }
}
