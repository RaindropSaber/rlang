import Port from './Port'

export default class Link<G_O, G_I extends G_O> {
  O: Port<G_O>
  I: Port<G_I>
  remove?: () => void
  id?: string
  constructor(O: Port<G_O>, I: Port<G_I>) {
    this.O = O
    this.I = I
  }
  connect() {
    this.remove = this.O.on((ctx) => ctx.to(this.I))
  }
  disconnect() {
    this.remove && this.remove()
  }
}
