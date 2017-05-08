/**
 * function to check equality of data.
 * @param {any} x - argument 1.
 * @param {any} y - argument 2.
 * @returns {boolean | Error}
 */
export  function equality(x: any, y: any): boolean | Error{
    if(!x || !y){
        return new Error('Equal. There isn\'t argument');
    }
    // Primitives equality
    if (Object(x) !== x && Object(y) !== y) {
        return Object.is(x, y);
    } else if(Array.isArray(x) && Array.isArray(y)){
        return x.length !== y.length ? false : _arrayIterator(x, y);
    } else if(Array.isArray(x) && !Array.isArray(y) || !Array.isArray(x) && Array.isArray(y)){
        return false;
    } else {
        for(let key in x){
            if(x.hasOwnProperty(key)){
                if(!equality(x[key], y[key])) return false;
            }
        }
        return true;
    }
}
/**
 * iterate array controller.
 * @param {Array<any>} x
 * @param {Array<any>} y
 * @return {boolean}
 * @private
 */
function _arrayIterator(x: Array<any>, y: Array<any>){
    return !x.some((v: any, i: number): boolean => {
        return Array.isArray(v) ? _arrayIterator(v, y[i]) : (typeof v === 'object') ? !equality(v, y[i]) : !Object.is(v, y[i]);
    })
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.