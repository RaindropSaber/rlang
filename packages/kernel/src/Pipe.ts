import { T_Node, T_Pipe, T_Package, NodeType, T_Port, RuntimeEnv, PortType, T_JSON, PackageType } from 'rlang-grammar'
import Port from './Port'
import Graph from './Graph'
import Link from './Link'

type T_PipeOption = Pick<T_Pipe, 'id' | 'attribute'>

export default class Pipe {
  static meta: T_Package<PackageType.Pipe>['meta']
  option: T_PipeOption
  graph!: Graph
  get meta() {
    return (this.constructor as typeof Pipe).meta
  }
  get id() {
    return this.option.id
  }
  get name() {
    return this.meta.name
  }
  get desc() {
    return this.meta.desc
  }
  get env() {
    return this.meta.env
  }
  constructor(option: T_PipeOption) {
    this.option = option
  }
  attach(graph: Graph) {
    this.graph = graph
  }
  createLink<G_O, G_I extends G_O>(OUT: Port<G_O>, IN: Port<G_I>) {
    const link = new Link(OUT, IN)
    link.connect()
    return link
  }
}
