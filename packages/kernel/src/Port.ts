import { T_Port } from 'rlang-grammar';
import { BehaviorSubject as Subject } from 'rxjs';
import Context from './Context';
import Node from './Node';

export default class Port<T_PortDTO> {
  $subject: Subject<Context<T_PortDTO>>;
  option: T_Port;
  node!: Node<any>;

  get id() {
    return this.option.id;
  }
  get type() {
    return this.option.type;
  }

  attach<T extends Node<any>>(node: T) {
    this.node = node;
  }
  constructor(option: T_Port) {
    this.option = option;
    this.$subject = new Subject<Context<T_PortDTO>>(new Context());
  }

  public emit(ctx: Context<T_PortDTO>) {
    return this.$subject.next(ctx);
  }
  public on(next: (ctx: Context<T_PortDTO>) => void) {
    const sub = this.$subject.subscribe(next);
    return () => sub.unsubscribe();
  }
}
