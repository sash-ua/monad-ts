[![Build Status](https://travis-ci.org/sash-ua/monad-ts.svg?branch=master)](https://travis-ci.org/sash-ua/monad-ts)
[![npm](https://img.shields.io/npm/dw/localeval.svg)](https://github.com/sash-ua/monad-ts)
[![Gemnasium](https://img.shields.io/gemnasium/mathiasbynens/he.svg)](https://github.com/sash-ua/monad-ts)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/sash-ua/monad-ts)


# Monad-ts

Monad-ts is a small library implements some of key monads and way to chain them in a flow (pipe) in JavaScript and
Typescript. Angular 2+ compatible

[Example app 1](https://github.com/sash-ua/gen_drift_monad-ts_a4/).

[Example app 2 with monad transformers](https://github.com/sash-ua/todos-next).

## Content
* [Installation](#installation)
* [Tests](#tests)

**Introduction**
* [Intro](#intro)
* [Setup](#setup)
* [API](https://sash-ua.github.io/monad-ts/identifiers.html)

**All monads**
* [Either](#either)
* [ErrorM](#errorm)
* [Identity](#identity)
* [Maybe](#maybe)
* [List](#list)
* [State](#state)

**Additional tools (class and functions)**
* [AsyncFlow](#asyncflow)
* [Flow](#flow)
* [cast](#cast)
* [clone](#clone)
* [debounceTime](#debouncetime)
* [equality](#equality)
* [hash](#hash)
* [wait](#wait)

**Examples**
* [Monad examples](https://github.com/sash-ua/monad-ts/tree/master/test)
* [Monad transformer examples](https://github.com/sash-ua/todos-next/blob/master/src/app/services/monad.service/monad.service.ts)
* [App 1](https://github.com/sash-ua/gen_drift_monad-ts_a4)
* [App 2 with Monad transformers](https://github.com/sash-ua/todos-next)

## Installation

In library used ES5 (Array.map, Array.reduce, Array.some, Array.isArray, Object.getOwnPropertyNames), ES6 (Map, Array.from,
 Object.assign, Object.keys, Object.is) methods.
 It's strongly recommended to always use ES5-shim and ES6-shim or alternatives.
```
npm install monad-ts
```
or
```
 yarn add monad-ts
```

## Tests

Clone the repo, `npm install` or `yarn` and run tests.
```
npm run test
```
or
```
 yarn test
```

## Intro

One of the main ideas of functional programming is to use pure functions as much as possible. But pure functions
don't do any kind of side-effects. At the same time the majority of programs should operate with side-effects in
process. Monads allow us to do all the side-effecting computations using pure functions effectively.

**NB** This monads implementation aren't exact copy of Haskell monads. My goal was to reach results comparable with the
using of like monads from Haskell in JS.

**NB** For catching Errors, produced within monads you should use monad ErrorM.

## Setup

**1.** **SystemJS** Configure `systemjs.config.js` to register the module.
```
SystemJS.config({
	map:{
		...
		'monad-ts': 'node_modules/monad-ts/lib/monad_ts.umd.js'
		...
	}
})
```
**2.** **WebPack** No special configuration.

Example:
```
import {Flow, List} from "monad-ts"

const list = new List();
const e: number = 50;
let r : number;
let t : number[];
console.log(t); // undefined
console.log(r); // undefined
const z = new Flow(5)
    .bind((v: number): any => v+1)
    .let((v: number): any => new Flow(v).bind((v: number) => r = v+e))
    .bind((v: number): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
    .let((v: number)=> new Flow(v).bind((v: number[]) => t = v, cast(list.bind((v: number)=>[v, -v], [v]), 2)))
    .subscribe();
console.log(r); // 56
console.log(t); // [ -7, 7, -6, 6, -5, 5, 5, -5, 6, -6, 7, -7 ]
console.log(z); // [ -7, -6, -5, 5, 6, 7 ]
```

[UP](#monad-ts)

## Monads

#### Either

It represents computation with two possibilities, `right` and `left`. Attached by bind method dispatcher function decided
which of them apply to underlying value.

Example:
```
const uVal = 10;                                     // underlying value
const right = (x: number) => x+1;                    // if cond(v) return true, than executed
const left = (y: string) => y + ' - isn\'t string';  // if cond(v) return false, than executed
const cond = (v:any) => typeof v === 'string';       // dispatcher function - cond(v)
const e = new Either(right, left).bind(cond , uVal); // '10 - isn't string'
```
or another way, useful in asynchronous code
```
const uVal = 10;                                     // underlying value
const right = (x: number) => x+1;                    // if cond(v) return true, than executed
const left = (y: string) => y + ' - isn\'t string';  // if cond(v) return false, than executed
const cond = (v:any) => typeof v === 'string';       // dispatcher function - cond(v)
const e = new Either(right, left);                   // to wrap functions in the monad
const w = cond(uVal) ? right(uVal) : left(uVal);     // '10 - isn't string'

```

#### ErrorM

It similar to the Identity but it can also represent the error. Error monad returns value transformed by given function.
If Error monad gets Error in given values it produce Error. If after application of given transformation function monad
get Error monad produce Error.

Examples:
```
const e = new ErrorM();
e.bind((v: number) => e.bind((v1: number)=>v+v1, 1), 1/0); // Error
```

#### Identity

It returns underlying value transformed by given function. We can add underlying value in constructor or in bind method.

Examples:
```
const i = new Identity(3);    // Identity({v: 3})
i.bind((v:number) => v);      // 3
```
```
const i = new Identity();
i.just((v:number) => v+1, 3); // 4
```

#### Maybe

It similar to the Identity but it can also represent the absence of any value. Monad Maybe returns value transformed
by given function. If Maybe monad gets null or undefined in given values it produce null. If after application of given
transformation function monad get null or undefined monad produce null.

Examples:
```
const maybe = new Maybe();
type G = { url: string; getUrl: () => any; };
const z: G = {
    url: 'http://...',
    getUrl: function (){
        return this.url;
    }
};
maybe.bind(r => r.getUrl(), z); // http://...
```

#### List

The List monad represents a computed list of values. It takes in an input value of type A, and produce a bunch of output
 values of type B, collected in one container (the array).

It get array and return array, to cast array dimension according to entered array we can use function [cast](#cast);

Examples:
```
const list = new List();
const x = [10, 2];                                                                         // Entered array
z = cast(list.bind((v: number) =>list.bind((v: number) => [-v, v], [v-1, v, v+1]), x), 2); // [ -9, 9, -10, 10, -11, 11, -1, 1, -2, 2,
-3, 3 ]
```

#### State

The State monad interact with local and global state variables to transform them. After initializing an instance of State monad we can not
add new keys to the state object.
It take object usually.

The instance of the State monad can be initialized in two ways.

1. While the instance create - in constructor (Ex.1).

2. After instance created - with `bind()` method (Ex.2).

Example 1:
```
type R = { data: number; children: any[]; arr: number[]; };
    const initState: R = {
        data: 1,
        children: [{
            data: 2,
            parent: 'null'
        }],
        arr:[1,2,3]
    };
    const st = new State(initState);
    console.log(st.get()); // return initState object
    st.put((v: R) => {
                v.data = 10;
                v.arr = list.bind((x:number) => x+f, v.arr);
                return v;
            });
    console.log(st.get()); // { data: 10, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] }
```
Example 2:
```
type R = { data: number; children: any[]; arr: number[]; };
    const initState: R = {
        data: 1,
        children: [{
            data: 2,
            parent: null
        }],
        arr:[1,2,3]
    };
    const st = new State();
    console.log(st.get()); // State -> undefined
    st.bind(x => x, initState);
    st.put((v: R) => {
                v.data = 10;
                v.arr = list.bind((x:number) => x+f, v.arr);
                return v;
            });
    console.log(st.get()); // State -> { data: 10, children: [ Object({ data: 2, parent: null }) ], arr: [ 2.25, 3.25, 4.25 ] }
```
[UP](#monad-ts)

## Additional utilities (class and functions)

#### AsyncFlow
For composing monads in an async flow (pipe), based on Promise. Class instance creation `new AsyncFlow(initV,
encapsulate?)`. Initial value (initV) encapsulated in the class instance by default. If set encapsulate = false, then
initial value wouldn't be encapsulated and we will be able to change inner state of the class instance by changing
`initV`.

**NB** Initial value should be statically analyzable.
```
new AsyncFlow(5)
  .bind((v) => v)
  .then((v) => v)
  .then((v) => cast(list.bind((v:number) => [v-1, v, v+1], [v]), 1))
  .then(v=> wait(v,100))
  .then((v)=> {
      console.log(v);                 // v = [4,5,6], emitted after 100 ms
  });
```

#### Flow
For composing monads in a flow (pipe). Class instance creation is identical to AsyncFlow.
```
const e: number = 50;
let r : number;
let t : number[];
const z = new Flow(5)
  .bind((v: number): any => v+1)
  .let((v: number): any => new Flow(v).bind((v: number) => r = v+e))
  .bind((v: number): any => cast(list.bind((v: number) => [v-1, v, v+1], [-v, v ]), 1))
  .let((v: number)=> new Flow(v).bind((v: number[]) => t = v, cast(list.bind((v: number)=>[v, -v], [v]), 2)))
  .subscribe();
console.log(r); // 56
console.log(t); // [ -7, 7, -6, 6, -5, 5, 5, -5, 6, -6, 7, -7 ]
console.log(z); // [ -7, -6, -5, 5, 6, 7 ]
```

#### cast
Function to decreasing the dimension of an array by factor `n`. It takes array and factor.
```
console.log(cast([10, [11], [12]], 0));           // [10, [11], [12]]
console.log(cast([10, [[11, [2]], 3], [12]], 2)); // [ 10, 11, [ 2 ], 3, 12 ]
```

#### clone
Function to clone objects (including Map). It takes objects, arrays and primitives.
```
const x = {x:1};
const z = clone(x);
z.x = 10;
console.log(z); // {x:10}
console.log(x); // {x:1}
```

#### debounceTime
Execute a function given a delay time. `debounceTime(func, d, i?)`, `func` - invoked function, `d` - a delay time,
`i` - delay before `func` execution, by default is absent.

#### equality
It checks equality of given arguments, arguments must be statically analyzable, therefore there are some constraints,
look at **[examples]( https://sash-ua.github.io/monad-ts/function/index.html#static-function-equality )** to find
them.
```
// true
equality(
  {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
  {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
)
```
#### hash
It calculates a hash (32 bit).
```
let g = hash('test "#^test "#^test "#^testRrr G!@#$%^&*()__+<>?ZXCV":A'); // g = 2692353561
```

#### wait
Function to convert timeout in a Promise, resolved when specified amount of time passes. It take value (v) end emit
Promise after t timeout with value (v). `wait(v, t)`
```
const s = wait(1, 300).then((v: number)=>{
            console.log(v);                 // v = 1, emitted after 300 ms
        })
```

[UP](#monad-ts)

## License

Monad_ts is copyright (c) 2017 - present Alex Tranchenko tranchenkoa@gmail.com .

Monad_ts is free software, licensed under the Apache License, Version 2.0. See the file LICENSE.md in this distribution
for more details.
