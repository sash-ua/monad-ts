/**
 * The service to clone complex objects, including Map.
 * @method clone
 * @param {T} obj - Object or Primitives to clone.
 * @return {T}
 */
export function clone<T>(obj: T, map: any = new Map()): T {
    // Primitives are immutable, no need to clone them.
    if (Object(obj) !== obj) {
        return obj;
    } else if (map.has(obj)) {
        // Cyclic reference handling
        return map.get(obj);
    } else {
        let result: any = Array.isArray(obj)
            ? []
            : obj.constructor && obj.constructor()
                         ? obj.constructor()
                         : Object.create(<any>obj);
        if (Object(result) !== result){
            map.set(obj, obj);
            result = obj;
        } else {
            map.set(obj, result);
        }
        if (obj instanceof Map) {
            return Array.from(obj, ([key, val]: Array<any>) => result.set(key, _toTail(val, map)))[0];
        } else {
            return Object.assign(result, ...Object.keys(obj).map(key => ({[key]: _toTail(obj[key], map)})));
        }
    }
}
/**
 * @method _toTail
 * @param {T} obj - Object or Primitives to clone.
 * @param {any} map
 * @return {T}
 * @private
 */
function _toTail<T>(obj: T, map: any){
    return clone(obj, map);
}


//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
