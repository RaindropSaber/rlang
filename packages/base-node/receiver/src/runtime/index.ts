import { Node, Port } from 'rlang-kernel'
import { NodeType, RuntimeEnv, PortType } from 'rlang-grammar'
import { T_PortDTO } from '../index'

type G_PORT<G_PortsDTO> = Port<Pick<G_PortsDTO, keyof G_PortsDTO>[keyof G_PortsDTO]>
type DefaultPortsDTO = { [PortType.I]: {}; [PortType.O]: {} }
type T_$I<G extends DefaultPortsDTO> = (id: keyof G[PortType.I]) => G_PORT<G[PortType.I]>
type T_$O<G extends DefaultPortsDTO> = (id: keyof G[PortType.O]) => G_PORT<G[PortType.O]>

export default class R extends Node<T_PortDTO> {
  static meta = {
    name: 'RRRRR',
    type: NodeType.R,
    desc: 'RRRRR',
    env: [RuntimeEnv.Node],
  }
  ready($I: T_$I<T_PortDTO>, $O: T_$O<T_PortDTO>) {
    console.log('R ready')
    this.$I('in').on((ctx) => {
      ctx.to($O('out'))
    })
    this.send({ hello: 'world' }).to($O('out'))
  }
}
