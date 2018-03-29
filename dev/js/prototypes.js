export default function install(){
    if(!Array.prototype.last){
        Array.prototype.last = function(){
            if(this.length < 1)
                return null;
            
                return this[this.length - 1];
        }
    }

    if(!Array.prototype.peek){
        Array.prototype.peek = function(functor){
            return this.map((elem, index, array)=>{
                functor(elem, index, array);
                return elem;
            });
        }
    }
    
    Function.prototype.toString = function(){
        return `function ${this.name}(){
    [native code]
}`;
    }
}