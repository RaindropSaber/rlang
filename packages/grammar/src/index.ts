type T_JSON_BASE = string | boolean | number | null
type T_JSON_OBJECT = {
  [key: string]: T_JSON_BASE | T_JSON_ARRAY | T_JSON_OBJECT
}
type T_JSON_ARRAY = (T_JSON_BASE | T_JSON_OBJECT | T_JSON_ARRAY)[]
export type T_JSON = T_JSON_BASE | T_JSON_OBJECT | T_JSON_ARRAY

export enum PackageType {
  Node,
  Pipe,
}

export enum NodeType {
  R = 'R',
  T = 'T',
  W = 'W',
  M = 'M',
}
export enum PortType {
  I = 'IN',
  O = 'OUT',
}
export enum RuntimeEnv {
  Node = 'Node',
  Browser = 'Browser',
}

export type T_Package<G extends PackageType> = {
  id: string
  packageName: string
  packageType: PackageType
  meta: (G extends PackageType.Node ? { type: NodeType } : {}) & {
    name: string
    desc: string
    env: RuntimeEnv[]
  }
}

export interface T_Node {
  id: string
  packageId: T_Package<PackageType.Node>['id']
  attribute: T_JSON
  position?: {
    x: string
    y: string
    z?: number
  }
  ports: T_Port[]
}

export type T_Pipe = {
  id: string
  packageId: T_Package<PackageType.Pipe>['id']
  attribute: T_JSON
  meta: {
    name: string
    desc: string
    env: RuntimeEnv[]
  }
}
export interface T_Port {
  id: string
  meta: {
    name: string
    type: PortType
    desc: string
  }
}

export type T_Link = {
  id: string
  pipeId: T_Pipe['id']
  [PortType.I]: {
    nodeId: T_Node['id']
    portId: T_Port['id']
  }
  [PortType.O]: {
    nodeId: T_Node['id']
    portId: T_Port['id']
  }
}

export interface T_AST {
  nodes: T_Node[]
  pipes: T_Pipe[]
  links: T_Link[]
  pkgs: T_Package<PackageType>[]
}
