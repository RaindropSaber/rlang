import { NodeType, RuntimeEnv, PortType } from "rlang-grammar";

export const meta = {
  name: "RRRRR",
  desc: "RRRRR",
  type: NodeType.R,
  env: [RuntimeEnv.Node, RuntimeEnv.Browser],
};

type T_Pipe<G_IN> = G_IN;

export interface T_PortDTO {
  [PortType.I]: {
    in: T_Pipe<T_PortDTO[PortType.O]["out"]>;
  };
  [PortType.O]: {
    out: { hello: string };
  };
}
