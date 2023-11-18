import { RouterMethods } from "../@types/router-methods";

type IRoutes = {
  method: RouterMethods;
  route: string;
  handles: Middlewares;
};

class Node {
  func: Args;
  next: Node | null = null;
  constructor(func: Args) {
    this.func = func;
  }
}

class Middlewares {
  private HEAD: Node | null = null;

  constructor(args: Args[]) {
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

  private startExecute(node: Node, req: any, res: any) {
    console.log(this.HEAD);
    if (node.next !== null) {
     return node.func(req, res);
    } else {
      return node.func(req, res, () => this.startExecute(node.next!, req, res));
    }
  }
}

interface IRouter {
  get: (route: string) => void;
  post: (route: string) => void;
  put: (route: string) => void;
  delete: (route: string) => void;
}

type Args = (req: any, res: any, next?: any) => void;

class Router implements IRouter {
  private routes: IRoutes[] = [];

  get(route: string, ...args: Args[]): void {
    this.registerRoute(route, RouterMethods.GET, args);
  }

  post(route: string, ...args: Args[]): void {
    this.registerRoute(route, RouterMethods.POST, args);
  }

  put(route: string, ...args: Args[]): void {
    this.registerRoute(route, RouterMethods.PUT, args);
  }

  delete(route: string, ...args: Args[]) {
    this.registerRoute(route, RouterMethods.DELETE, args);
  }

  public getRoutes() {
    return this.routes;
  }

  private registerRoute(route: string, method: RouterMethods, args: Args[]) {
    this.routes.push({
      handles: new Middlewares(args),
      method: method,
      route: route,
    });
  }
}

export default new Router();
