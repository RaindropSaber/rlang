import { T_Node, T_Pipe, NodeType, T_Package, T_Port, RuntimeEnv, PortType, T_JSON, PackageType } from 'rlang-grammar';
import Port from './Port';
import Graph from './Graph';
import Context from './Context';

type T_NodeOption = Pick<T_Node, 'id' | 'attribute' | 'ports'>;
type T_PortMap<G_PortsDTO> = Map<keyof G_PortsDTO, G_PORT<G_PortsDTO>>;

type G_PORT<G_PortsDTO> = Port<Pick<G_PortsDTO, keyof G_PortsDTO>[keyof G_PortsDTO]>;
type DefaultPortsDTO = { [PortType.I]: {}; [PortType.O]: {} };
type T_$I<G extends DefaultPortsDTO> = (id: keyof G[PortType.I]) => G_PORT<G[PortType.I]>;
type T_$O<G extends DefaultPortsDTO> = (id: keyof G[PortType.O]) => G_PORT<G[PortType.O]>;

export default class Node<G_PortsDTO extends DefaultPortsDTO> {
  static meta: T_Package<PackageType.Node>['meta'];
  option: T_NodeOption;
  graph!: Graph;
  ports!: Port<Pick<G_PortsDTO[PortType], keyof G_PortsDTO[PortType]>[keyof G_PortsDTO[PortType]]>[];
  portIMap!: T_PortMap<G_PortsDTO[PortType.I]>;
  portOMap!: T_PortMap<G_PortsDTO[PortType.O]>;
  $I!: T_$I<G_PortsDTO>;
  $O!: T_$O<G_PortsDTO>;

  get meta() {
    return (this.constructor as typeof Node).meta;
  }
  get type() {
    return this.meta.type;
  }
  get name() {
    return this.meta.name;
  }
  get desc() {
    return this.meta.desc;
  }
  get env() {
    return this.meta.env;
  }
  get id() {
    return this.option.id;
  }
  get attribute() {
    return this.option.attribute;
  }
  get app() {
    return this.graph.app || {};
  }

  private attachPort(option: T_Port) {
    const port = new Port<Pick<G_PortsDTO[PortType], keyof G_PortsDTO[PortType]>[keyof G_PortsDTO[PortType]]>(option);
    port.attach(this);
    option.meta.type === PortType.I
      ? this.portIMap.set(port.id as keyof G_PortsDTO[PortType.I], port)
      : this.portOMap.set(port.id as keyof G_PortsDTO[PortType.O], port);
    return port;
  }
  private initPort() {
    this.ports = this.option.ports.map((portOption) => this.attachPort(portOption));

    const $I = (id: keyof G_PortsDTO[PortType.I]) => {
      if (!this.portIMap.has(id)) throw new Error(`node ${this.name} has no port that id is ${id as string}`);
      return this.portIMap.get(id)!;
    };
    const $O = (id: keyof G_PortsDTO[PortType.O]) => {
      if (!this.portOMap.has(id)) throw new Error(`node ${this.name} has no port that id is ${id as string}`);
      return this.portOMap.get(id)!;
    };
    this.$I = $I;
    this.$O = $O;
  }

  constructor(option: T_NodeOption) {
    this.option = option;
    this.portIMap = new Map();
    this.portOMap = new Map();

    this.initPort();
  }
  attach(graph: Graph) {
    this.graph = graph;
  }

  ready($I: T_$I<G_PortsDTO>, $O: T_$O<G_PortsDTO>) {}
  send(msg: any) {
    return new Context(msg);
  }
}
