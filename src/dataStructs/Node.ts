export class Node {
  func: Args;
  next: Node | null = null;
  constructor(func: Args) {
    this.func = func;
  }
}
