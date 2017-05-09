[![Build Status](https://travis-ci.org/sash-ua/monad-ts.svg?branch=master)](https://travis-ci.org/sash-ua/monad-ts)
[![npm](https://img.shields.io/npm/dw/localeval.svg)](https://github.com/sash-ua/monad-ts)
[![Gemnasium](https://img.shields.io/gemnasium/mathiasbynens/he.svg)](https://github.com/sash-ua/monad-ts)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/sash-ua/monad-ts)


# Monad-ts

Monad-ts is a small library implements some of key monads and way to chain them in a flow (pipe) in JavaScript and
Typescript.

## Content
* [Installation](#installation)
* [Tests](#tests)

**Introduction**
* [Intro](#intro)
* [API](https://sash-ua.github.io/monad-ts/identifiers.html)

**All monads**
* [Either](#either)
* [ErrorM](#errorm)
* [Identity](#identity)
* [Maybe](#maybe)
* [List](#list)
* [State](#state)

**Additional tools (class and functions)**
* [Flow](#flow)
* [cast](#cast)
* [clone](#clone)
* [equality](#equality)

## Installation

In library used ES5 (Array.map, Array.reduce, Array.some, Array.isArray, Object.getOwnPropertyNames), ES6 (Map, Array.from, Object.assign, Object
.keys) methods.
 It's
strongly
recommended to always
use ES5-shim and ES6-shim or alternatives.
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

** This monads implementation aren't exact copy of Haskell monads. My goal was to reach results comparable with the
using of like monads from Haskell in JS.

** In TypeScript be attentive to type definitions while coding.

### Ways to use:

#### 1. As a dependency.

Import library or class in compatible for you way:
```
import * as Monad from "/node_modules/monad-ts/index"
```
or
```
import {State} from "/node_modules/monad-ts/index"
```
or
```
import {List} from "monad-ts/src/list"
```

Example:
```
import {Flow, List} from "/node_modules/monad-ts/index"

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

#### 2. Add to html page.

Type: UMD.

Library name: Monad_ts.

Add library after es6-shim, es5-shim.
```
<script type="text/javascript" src="lib/monad-ts.min.js"></script>
```

Example:
```
var state = new Monad_ts.State({q:1, w:2});
 console.log(state.get());                  // {q:1, w:2}
 
 var maybe = new Monad_ts.Maybe();
 var z = {
     url: 'http://...',
     getUrl: function (){
         return this.url;
     }
 };
 console.log(maybe.bind(r => r.getUrl(), z)); // http://...
```

[UP](#monad-ts)

## Monads

#### Either

It represents computation with two possibilities, right and left. Attached by bind method dispatcher function decided
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

It similar to the Identity but it can also represent the error. Error monad returns value transformed by given function. If Error monad gets Error in given values it produce Error. If after application of given transformation function monad get Error monad produce Error.

Examples:
```
const e = new ErrorM();
e.bind((v: number) => e.bind((v1: number)=>v+v1, 1), 1/0); // Error
```

#### Identity

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
by given function. If Maybe monad gets null or undefined in given values it produce null. If after application of given transformation function monad get null or undefined monad produce null.

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

The List monad represents a lazily computed list of values. It takes in an input value of type A, and produce a bunch of output values of type B, collected in one container (the array).

It get array and return array, to cast array dimension according to entered array we can use function [cast](#cast);

Examples:
```
const list = new List();
const x = [10, 2];                                                                         // Entered array
z = cast(list.bind((v: number) =>list.bind((v: number) => [-v, v], [v-1, v, v+1]), x), 2); // [ -9, 9, -10, 10, -11, 11, -1, 1, -2, 2,
-3, 3 ]
```

#### State

The State monad interact with local and global state variables to transform them.

Examples:
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

[UP](#monad-ts)

## Additional utilities (class and functions)

#### Flow

For composing monads in a flow (pipe).

Examples:
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
Function to decreasing the dimension of an array by factor n. It takes array and factor.
```
console.log(cast([10, [11], [12]], 0));           // [10, [11], [12]]
console.log(cast([10, [[11, [2]], 3], [12]], 2)); // [ 10, 11, [ 2 ], 3, 12 ]
```

#### clone
Function to clone objects (including Map). It takes objects and primitives.
```
const x = {x:1};
const z = clone(x);
z.x = 10;
console.log(z); // {x:10}
console.log(x); // {x:1}
```

#### equality
Function to check equality of given data.
```
// true
equality(
  {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]},
  {x1: 0, x: [1, {c: [22, {j:21, g: 'ert'}, 23]}, NaN, Infinity, null, undefined], t: [null, 0]}
)
```

[UP](#monad-ts)

## License

Monad_ts is copyright (c) 2017 - present Alex Tranchenko tranchenkoa@gmail.com .

Monad_ts is free software, licensed under the Apache License, Version 2.0. See the file LICENSE.md in this distribution for more details.
