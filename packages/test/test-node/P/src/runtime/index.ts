import { Node, Pipe, Port, Context, Graph } from "rlang-kernel";

class Link<G_O, G_I extends G_O> {
  O: Port<G_O>;
  I: Port<G_I>;
  remove?: () => void;
  id?: string;
  constructor(O: Port<G_O>, I: Port<G_I>) {
    this.O = O;
    this.I = I;
  }
  connect() {
    this.remove = this.O.on((ctx) => ctx.to(this.I));
  }
  disconnect() {
    this.remove && this.remove();
  }
}

export default class P extends Pipe {
  createLink<G_O, G_I extends G_O>(OUT: Port<G_O>, IN: Port<G_I>) {
    const link = new Link(OUT, IN);
    link.connect();
    return link;
  }
}
