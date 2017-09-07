"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * the service to clone the object, including Map.
 * @param {T} obj - Object or Primitives to clone.
 * @return {T}
 */
function clone(obj, map) {
    if (map === void 0) { map = new Map(); }
    // Primitives are immutable, no need to clone them.
    if (Object(obj) !== obj) {
        return obj;
    }
    else if (map.has(obj)) {
        // Cyclic reference handling
        return map.get(obj);
    }
    else {
        var result_1 = Array.isArray(obj)
            ? []
            : obj.constructor && obj.constructor()
                ? obj.constructor()
                : Object.create(obj);
        map.set(obj, result_1);
        if (obj instanceof Map) {
            return Array.from(obj, function (_a) {
                var key = _a[0], val = _a[1];
                return result_1.set(key, _toTail(val, map));
            })[0];
        }
        else {
            if (Object(result_1) !== result_1) {
                return _toTail(result_1, map);
            }
            else {
                return Object.assign.apply(Object, [result_1].concat(Object.keys(obj).map(function (key) {
                    return (_a = {}, _a[key] = _toTail(obj[key], map), _a);
                    var _a;
                })));
            }
        }
    }
}
exports.clone = clone;
/**
 * @param {T} obj - Object or Primitives to clone.
 * @param {any} map
 * @return {T}
 * @private
 */
function _toTail(obj, map) {
    return clone(obj, map);
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
