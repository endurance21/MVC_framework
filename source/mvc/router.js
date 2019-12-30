var routingObj = function (c, r, t) {
    this.controller = c;
    this.route = r;
    this.template = t;
}

class Router {
    constructor() {
        this.routes = {}
    }
}
Router.prototype.addRoute = function (controller, route, template) {
    this.routes[route] = new routingObj(controller, route, template);
}
