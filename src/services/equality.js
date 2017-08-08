"use strict";
/**
 * It checks equality of given arguments, arguments must be statically analyzable, therefore there are some constraints,
 * look at examples to find them.
 *
 *  @example <caption>1)</caption>
 *  Functions compare by the structure, not by values of variables or other elements it consists of.
 *
 *  Equal:
 *      let d = 20;
 *      equality(
 *          ()=>{return ()=> {return {'g': d}};},
 *          function(){return function() {return{'g': d}};}
 *      )
 *
 *  Not Equal:
 *      let d = 20;
 *      let d2 = 20;
 *      equality(
 *          ()=>{return ()=> {return {'g': d}};},
 *          function(){return function() {return{'g': d2}};}
 *      )
 *
 *  @example <caption>2)</caption>
 *  Do not use the creation of some objects by object creation, they will be compared wrong.
 *  Never use this constructions in compared objects:
 *      new Boolean(*);
 *      new Number(*);
 *      Error(*);
 *      new Error(*);
 *      new Date(*);
 *      new RegExp(*);
 *
 *  Equal:
 *      equality(new Boolean(true), new Boolean(false));                  // Wrong
 *      equality(Error('true'), Error('false'));                          // Wrong
 *      equality(new Number(1), new Number(11));                          // Wrong
 *      equality(new Date(1995, 11, 17), new Date('1995-12-17T03:24:00')) // Wrong
 *
 *  Not Equal (the exception of `new` option in some cases can solve the issue):
 *      equality(Boolean(true), Boolean(false)); // Right
 *      equality(Number(1), Number(11));         // Right
 *
 *  @example <caption>3)</caption>
 *  Instances of a user-defined object type that has a constructor function are compared as objects by `key: value`.
 *
 *      class Test{
 *          constructor(private arg: any){    }
 *      }
 *      class Test2{
 *          constructor(private arg: any){    }
 *      }
 *  Equal:
 *      new Test(true) and new Test(true);
 *
 *  Not Equal:
 *      new Test(true) and new Test2(true);
 *      new Test(true) and new Test(false);
 *
 * @param {any} x - argument 1, can include null, NaN etc.
 * @param {any} y - argument 2, can include null, NaN etc.
 * @returns {boolean}
 */
Object.defineProperty(exports, "__esModule", { value: true });
function equality(x, y) {
    var isXO = new Object(x);
    var isYO = new Object(y);
    if (isXO !== x && isYO !== y) {
        return Object.is(x, y);
    }
    if (isXO === x && isYO === y) {
        var xN = x.constructor;
        var yN = y.constructor;
        if (xN === yN) {
            if (xN === Array && yN === Array) {
                return x.length !== y.length ? false : _arrayIterator(x, y);
            }
            else if (xN === Function && yN === Function) {
                return x.toString() === y.toString();
            }
            else if (equality(Object.getOwnPropertyNames(x), Object.getOwnPropertyNames(y))) {
                for (var key in x) {
                    if (x.hasOwnProperty(key)) {
                        if (!equality(x[key], y[key]))
                            return false;
                    }
                }
                return true;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
exports.equality = equality;
/**
 * iterate array controller.
 * @param {Array<any>} x
 * @param {Array<any>} y
 * @return {boolean}
 * @private
 */
function _arrayIterator(x, y) {
    return !x.some(function (v, i) {
        return Array.isArray(v) ? _arrayIterator(v, y[i]) : (typeof v === 'object' || typeof v === "function") ? !equality(v, y[i]) : !Object.is(v, y[i]);
    });
}
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
