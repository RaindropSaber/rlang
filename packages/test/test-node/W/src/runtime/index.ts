import { Node, Port, Context, Graph } from "rlang-kernel";
import { NodeType, RuntimeEnv, PortType, T_AST } from "rlang-grammar";

type G_PORT<G_PortsDTO> = Port<
  Pick<G_PortsDTO, keyof G_PortsDTO>[keyof G_PortsDTO]
>;
type DefaultPortsDTO = { [PortType.I]: {}; [PortType.O]: {} };
type T_$I<G extends DefaultPortsDTO> = (
  id: keyof G[PortType.I]
) => G_PORT<G[PortType.I]>;
type T_$O<G extends DefaultPortsDTO> = (
  id: keyof G[PortType.O]
) => G_PORT<G[PortType.O]>;

interface T_PortDTO {
  [PortType.I]: {
    in: {
      hello: string;
    };
    in2: {
      hi: string;
    };
  };
  [PortType.O]: {};
}

export default class W extends Node<T_PortDTO> {
  static meta = {
    name: "WWWWW",
    type: NodeType.W,
    desc: "WWWWW",
    env: [RuntimeEnv.Node],
  };
  ready($I: T_$I<T_PortDTO>, $O: T_$O<T_PortDTO>) {
    console.log("W ready");
    $I("in").on((ctx) => {
      console.log(`WWW`, ctx);
    });
  }
}
