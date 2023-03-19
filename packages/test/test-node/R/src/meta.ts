import { NodeType, PortType, RuntimeEnv } from 'rlang-grammar';

export const meta = {
  name: 'RRRRR',
  desc: 'RRRRR',
  type: NodeType.R,
  env: [RuntimeEnv.Node, RuntimeEnv.Browser],
};

export interface PortsDTO {
  [PortType.I]: {};
  [PortType.O]: {
    out: any;
  };
}
