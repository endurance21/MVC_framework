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

class MVC{
    constructor(){
     this.model = {}
     this.router  = new Router;
     this.defaultRoute = null;
     this.viewElement = null;
     this.currentRoutingObj = null;

    }

}

MVC.prototype.init  = function(){
    this.viewElement = window.document.querySelector('[view]');  
    if (!this.viewElement) return;
    this.defaultRoute = this.router.routes[Object.getOwnPropertyNames(this.router.routes)[0]].route;
    
    window.onhashchange = ()=>{this.start()};
    this.start();
    console.log("started")
}

MVC.prototype.start  = function(){
    var pageHash = window.location.hash.replace('#', ''),
    routeName = pageHash.replace('/', '');
    if( window.location.hash.search("#"))
    this.currentRoutingObj = this.router.routes[this.defaultRoute]
    this.currentRoutingObj = this.router.routes[routeName];


    if(!routingObj)
    routingObj = this.defaultRoute  
    this.loadTemplate();
}

MVC.prototype.Router = function(){
    
}

//loading data from server 

MVC.prototype.loadTemplate = function(){ 
    let temp = this; 
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlhttp.onreadystatechange = function () {
        console.log("loaded data")
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            temp.loadView(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', this.currentRoutingObj.template, true);
    xmlhttp.send();
}



MVC.prototype.loadView = function (viewHtml){
    console.log(viewHtml)
    var model = {};
    this.currentRoutingObj.controller(model);
    let modelProps = Object.getOwnPropertyNames(model); //making array of objects literals
    modelProps.forEach((element) =>{
        viewHtml = viewHtml.replace('{{' + element + '}}', model[element]);      
    });
    this.viewElement.innerHTML  = viewHtml;

}




window['MVC'] = new MVC();