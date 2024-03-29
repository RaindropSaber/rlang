import { NodeType, PortType, RuntimeEnv } from 'rlang-grammar';
import { Node } from 'rlang-kernel/src';
import { T_$I, T_$O } from 'rlang-kernel/src/Node';

// type G_PORT<G_PortsDTO> = Port<Pick<G_PortsDTO, keyof G_PortsDTO>[keyof G_PortsDTO]>;
// type DefaultPortsDTO = { [PortType.I]: {}; [PortType.O]: {} };
// type T_$I<G extends DefaultPortsDTO> = (id: keyof G[PortType.I]) => G_PORT<G[PortType.I]>;
// type T_$O<G extends DefaultPortsDTO> = (id: keyof G[PortType.O]) => G_PORT<G[PortType.O]>;

interface T_RPortDTO {
  [PortType.I]: {};
  [PortType.O]: {
    out: {
      hello: string;
    };
    out2: {
      hi: string;
    };
    // [ssss: string]: any;
  };
}

export default class R extends Node<T_RPortDTO> {
  static meta = {
    name: 'RRRRR',
    type: NodeType.R,
    desc: 'RRRRR',
    env: [RuntimeEnv.Node],
  };
  ready($I: T_$I<T_RPortDTO>, $O: T_$O<T_RPortDTO>) {
    // console.log('R ready');
    const ddd = $O('out');
    const ccc = this.send({ hello2: 'world', fff: '' });
    ccc.to(ddd);
    // this.send({ hello: 'world' }).to($O('out'));
  }
}
