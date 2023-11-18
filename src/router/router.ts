import { RouterMethods } from "../@types/router-methods";

type IRoutes = {
  method: RouterMethods;
  route: string;
  middleware: Args[];
  endpoint: Args;
};

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
    if (args.length === 1) {
      this.routes.push({
        endpoint: args[0],
        method: method,
        middleware: [],
        route: route,
      });
    } else {
      const middleware = args.splice(args.length - 2, args.length - 1);
      this.routes.push({
        endpoint: args[args.length - 1],
        method: method,
        middleware: middleware,
        route: route,
      });
    }
  }
}

export default new Router();
