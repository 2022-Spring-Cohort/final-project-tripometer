//View databound element
//Control executes crud operation

//represents a data entity, its properties and the controller to which each property is bound
class Model{
    constructor(){

    }
}

class Control{
    T = HTMLElement;
    static #Control = class Control extends this.T{
        constructor(){
            super();
        }
    }

    constructor(T){
        this.T = T;
        return Control.apply(this);
    }
}

//represents a data view for a model
class View{
    constructor(model){
        
    }
}