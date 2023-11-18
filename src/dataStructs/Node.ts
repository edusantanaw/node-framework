import { Args } from "../@types/Args";

export class Node {
  func: Args;
  next: Node | null = null;
  constructor(func: Args) {
    this.func = func;
  }
}
