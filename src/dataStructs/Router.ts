import { RouterMethods } from "../enums/router-methods";
import { Middlewares } from "../dataStructs/Middlewares";
import { Args } from "../@types/Args";

type IRoutes = {
  method: RouterMethods;
  route: string;
  handles: Middlewares;
};

interface IRouter {
  get: (route: string) => void;
  post: (route: string) => void;
  put: (route: string) => void;
  delete: (route: string) => void;
}

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
