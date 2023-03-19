export enum PackageType {
  Node = 'Node',
  Pipe = 'Pipe',
}
export enum PackageMode {
  Node = 'Node',
  GRAPH = 'GRAPH',
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
// type T_JSON_BASE = string | boolean | number | null;
// type T_JSON_OBJECT = {
//   [key: string]: T_JSON_BASE | T_JSON_ARRAY | T_JSON_OBJECT;
// };
// type T_JSON_ARRAY = (T_JSON_BASE | T_JSON_OBJECT | T_JSON_ARRAY)[];
// export type T_JSON = T_JSON_BASE | T_JSON_OBJECT | T_JSON_ARRAY;

// export declare type T_NodePackage = T_Package<PackageType.Node> & {
//   shapeUrl: string;
//   panelUrl: string;
// };
// export declare type T_PipePackage = T_Package<PackageType.Pipe> & {};
export declare type T_Package = {
  name: string;
  version: string;
  rlang: {
    type: PackageType;
    mode: PackageMode;
    shape?: {
      assets: string;
    };
    panel?: {
      assets: string;
    };
    modules?: {
      assets: string;
    };
  };
};

export declare interface T_Node {
  id?: string;
  packageName: T_Package['name'];
  attribute: JSON;
  position?: {
    x: string;
    y: string;
    z?: number;
  };
  ports: T_Port[];
  view?: any;
}

export declare type T_Pipe = {
  id?: string;
  packageName: T_Package['name'];
  attribute: JSON;
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
export declare interface T_Port {
  id: string;
  name: string;
  type: PortType;
  desc?: string;
}

export declare interface T_AST {
  nodes: T_Node[];
  pipes: T_Pipe[];
  pkgs: T_Package[];
}
