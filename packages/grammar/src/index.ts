type T_JSON_BASE = string | boolean | number | null;
type T_JSON_OBJECT = {
  [key: string]: T_JSON_BASE | T_JSON_ARRAY | T_JSON_OBJECT;
};
type T_JSON_ARRAY = (T_JSON_BASE | T_JSON_OBJECT | T_JSON_ARRAY)[];
export type T_JSON = T_JSON_BASE | T_JSON_OBJECT | T_JSON_ARRAY;

export enum PackageType {
  Node = 'Node',
  Pipe = 'Pipe',
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

export type T_NodePackage = T_Package<PackageType.Node> & {
  nodeType: NodeType;
  ports: T_Port[];
};
export type T_PipePackage = T_Package<PackageType.Pipe> & {};
export type T_Package<PackageType> = {
  id?: string;
  name: string;
  version?: string;
  desc?: string;
  type: PackageType;
  group?: string;
  env: RuntimeEnv[];
};

export interface T_Node {
  id?: string;
  packageName: T_NodePackage['name'];
  attribute: T_JSON;
  position?: {
    x: string;
    y: string;
    z?: number;
  };
  ports: T_Port[];
  view?: any;
}

export type T_Pipe = {
  id?: string;
  packageName: T_PipePackage['name'];
  attribute: T_JSON;
  [PortType.I]: {
    nodeId: T_Node['id'];
    portId: T_Port['id'];
  };
  [PortType.O]: {
    nodeId: T_Node['id'];
    portId: T_Port['id'];
  };
  view?: any;
};
export interface T_Port {
  id: string;
  name: string;
  type: PortType;
  desc?: string;
}

export interface T_AST {
  nodes: T_Node[];
  pipes: T_Pipe[];
  pkgs: (T_NodePackage | T_PipePackage)[];
}
