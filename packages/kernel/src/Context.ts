import { T_Node, NodeType, T_Port, RuntimeEnv, PortType, T_JSON } from 'rlang-grammar'
import Port from './Port'
import Node from './Node'
import getId from './utils/getId'

export default class Context<T_BodyDTO> {
  id: string
  #next: Context<unknown>[]
  #prev: Context<unknown> | null
  body!: T_BodyDTO | undefined

  constructor(body?: T_BodyDTO) {
    this.body = body
    this.id = getId('$CONTEXT')
    this.#next = []
    this.#prev = null
  }
  public send<NT_BodyDTO>(body?: NT_BodyDTO) {
    const ctx = new Context<NT_BodyDTO>(body)
    ctx.id = this.id
    ctx.#prev = this
    this.#next.push(ctx)
    return ctx
  }
  public end(body: any) {}

  public to<T extends T_BodyDTO>(port: Port<T>) {
    port && port.emit(this as unknown as Context<T>)
  }
  getPrev() {
    return this.#prev
  }
}
