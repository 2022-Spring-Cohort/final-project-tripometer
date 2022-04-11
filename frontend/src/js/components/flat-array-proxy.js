//really proud of this
//it doesn't support all array methods,
//but it allows me to work with arrays of arrays easily
//without the bloat that comes from copying arrays with .map

const flatArrayGetter = {
    get (target, key, receiver){
        if (typeof key == "string"
        && !isNaN(key)
        && !isNaN(parseFloat(key))){
            let offset = 0;
            for (let i = 0; i < target.length; i++){
                if (key < target[i].length + offset)
                    return target[i][key - offset];
                offset += target[i].length;
            }
        }
        else if (key === Symbol.iterator){
            return (function* (){
                for (let i = 0; i < this.length; i++){
                    yield* this[i];
                }
                return;
            }).bind(target);
        }
        else if (key == 'length'){
            return target.reduce((prev,curr) => prev.length + curr.length);
        }
        else {
            return Reflect.get(target,key,receiver);
        }
    }
};

//takes in an array of arrays, returns iterable proxy
export function FlatArrayFactory(arrays){
    return new Proxy(arrays, flatArrayGetter);
}