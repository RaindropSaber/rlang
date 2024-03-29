import Port from './Port';
import getId from './utils/getId';

export default class Context<T_PortDTO> {
  id: string;
  #next: Context<unknown>[];
  #prev: Context<unknown> | null;
  body!: unknown | undefined;

  constructor(body?: unknown) {
    this.body = body;
    this.id = getId('$CONTEXT');
    this.#next = [];
    this.#prev = null;
  }
  public send<NT_BodyDTO>(body?: NT_BodyDTO) {
    const ctx = new Context<NT_BodyDTO>(body);
    ctx.id = this.id;
    ctx.#prev = this;
    this.#next.push(ctx);
    return ctx;
  }
  public end(body: unknown) {}

  public to<T extends Port<T_PortDTO>>(port: T) {
    port && port.emit(this);
  }
  getPrev() {
    return this.#prev;
  }
}
