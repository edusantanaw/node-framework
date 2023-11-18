import { Args } from "../@types/Args";
import { HttpResponse } from "../http/Response";
import { Node } from "./Node";

export class Middlewares {
    private HEAD: Node | null = null;
  
    constructor(args: Args[] = []) {
      args.forEach((e) => {
        this.add(e);
      });
    }
  
    add(func: Args) {
      const node = new Node(func);
      if (this.HEAD === null) {
        this.HEAD = node;
        return;
      }
      let currentNode = this.HEAD;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
  
    executeAll(req: any, res: any) {
      if (this.HEAD) {
        return this.startExecute(this.HEAD, req, res);
      }
    }
  
    private startExecute(node: Node, req: any, res: any): Promise<HttpResponse> | HttpResponse {
      if (node.next === null) {
        return node.func(req, res);
      } else {
        return node.func(req, res, () => this.startExecute(node.next!, req, res));
      }
    }
  }
  