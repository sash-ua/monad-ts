[![Build Status](https://travis-ci.org/sash-ua/monad-ts.svg?branch=master)](https://travis-ci.org/sash-ua/monad-ts)
[![Downloads][downloads-image]](http://npm-stat.com/charts.html?package=monad-ts)

# Monad-ts

Monad-ts is a small (7kb) library implements some of key monads and way to chain them in a pipe (flow) in JavaScript.

## Content
* [Installation](#installation)
* [Tests](#tests)
* [Intro](#intro)

**All monads**
* [Identity](#identity)
* [Maybe](#maybe)
* [ErrorM](#errorm)
* [List](#list)
* [State](#state)

**Additional tools (class and functions)**
* [Flow](#flow)
* [clone](#clone)
* [cast](#cast)

## Installation

In library used ES5 (map, reduce), ES6 (Map, Array.from, Object.assign, Object.keys) methods. It's strongly recommended to always
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

** This monads implementation aren't exact copy of Haskell monads. My goal was to reach results comparable with the
using of like monads from Haskell in JS.

One of the main ideas of functional programming is to use pure functions as much as possible. But pure functions
don't do any kind of side-effects. At the same time the majority of programs should operate with side-effects in
process. Monads allow us to do all the side-effecting computations using pure functions effectively.

## [API](https://sash-ua.github.io/monad-ts/)

### Ways to use:

#### 1. As a dependency.

Example:
```
const e: number = 50;
let r : number;
let t : number[];
console.log(t); // undefined
console.log(r); // undefined
const z = new Flow(5)
    .bind((v: number): any => v+1)
    .let((v: number): any => new Flow(v).bind(v => r = v+e))
    .bind((v: number): any => cast(list.bind(v => [v-1, v, v+1], [-v, v ]), 1))
    .let((v: number)=> new Flow(v).bind(v => t = v, cast(list.bind(v=>[v, -v], v), 1)))
    .subscribe();
console.log(r); // 56
console.log(t); // [ -7, 7, -6, 6, -5, 5, 5, -5, 6, -6, 7, -7 ]
console.log(z); // [ -7, -6, -5, 5, 6, 7 ]
```

#### 2. Add to html page.

```
<script type="text/javascript" src="lib/monad-ts.min.js"></script>
```
Type: UMD.

Library name: Monad_ts.

Example:
```
var state = new Monad_ts.State({q:1, w:2});
 console.log(state.get()); // {q:1, w:2}
 
 var maybe = new Monad_ts.Maybe();
 var z = {
     url: 'http://...',
     getUrl: function (){
         return this.url;
     }
 };
 console.log(maybe.bind(r => r.getUrl(), z)); // http://...
```

## Monads

#### Identity

It just wraps a value and return value transformed by given function.

Method.
* just(function, value) - return transformed value
```
const i = new Identity();
i.just(v=>v+1, 3); // 4
```

#### Maybe

It similar to the Identity but it can also represent the absence of any value. Monad Maybe returns value transformed
by given function. If Maybe monad gets null or undefined in given values it produce null. If after application of given transformation function monad get null or undefined monad produce null.

Method.
* bind(function, value) - return null or transformed value
```
const maybe = new Maybe();
const z = {
            url: 'http://...',
            getUrl: function (){
                return this.url;
            }
        };
maybe.bind(r => r.getUrl(), z); // return http://...
```

#### ErrorM

It similar to the Identity but it can also represent the error. Error monad returns value transformed by given function. If Error monad gets Error in given values it produce Error. If after application of given transformation function monad get Error monad produce Error.

Method.
* bind(function, value) - return Error or transformed value
```
const e = new ErrorM();
e.bind(v => e.bind(v1=>v+v1, 1), 1/0); // Error
```

#### List

The List monad represents a lazily computed list of values. It takes in an input value of type A, and produce a bunch of output values of type B, collected in one container (the array).

It get array and return array, to cast array dimension according to entered array we can use function [cast](#cast);

Method.
* bind(function, value) - return transformed value
```
const list = new List();
const x = [10, 2]; // Entered array
z = cast(list.bind(v =>list.bind(v => [-v, v], [v-1, v, v+1]), x), 2); // [ -9, 9, -10, 10, -11, 11, -1, 1, -2, 2,
-3, 3 ]
```

#### State

The State monad interact with local and global state variables to transform them.

Constructor get initial application state as object.

Methods.
* put(function) - it get function transforming application state.
* get() - return application state.
```
const initState = {
        data: 1,
        children: [{
            data: 2,
            parent: 'null'
        }],
        arr:[1,2,3]
    };
    const st = new State(initState);
    console.log(st.get()); // return initState object
    st.put(v => {
			        v.data = 10;
			        v.arr = list.bind(v => v+f, v.arr);
			        return v;
			    });
    console.log(st.get()); // { data: 10, children: [ Object({ data: 2, parent: 'null' }) ], arr: [ 2.25, 3.25, 4.25 ] }
```

## Additional tools (class and functions)

#### Flow

Class to composing monads in a pipe (flow).

Constructor create instance of the class, takes initial value when start new pipe and keeps inside.

Methods.
* bind(function) - return transformed value.
* let(function) - create branch from a pipe.
* subscribe() - extract value from a pipe.
```
const e: number = 50;
let r : number;
let t : number[];
const z = new Flow(5)
            .bind((v: number): any => v+1)
            .let((v: number): any => new Flow(v).bind(v => r = v+e))
            .bind((v: number): any => cast(list.bind(v => [v-1, v, v+1], [-v, v ]), 1))
            .let((v: number)=> new Flow(v).bind(v => t = v, cast(list.bind(v=>[v, -v], v), 1)))
            .subscribe();
console.log(r); // 56
console.log(t); // [ -7, 7, -6, 6, -5, 5, 5, -5, 6, -6, 7, -7 ]
console.log(z); // [ -7, -6, -5, 5, 6, 7 ]
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

#### cast
Function to decreasing the dimension of an array by factor n. It takes array and factor.
```
console.log(cast([10, [11], [12]], 0)); // [10, [11], [12]]
console.log(cast([10, [[11, [2]], 3], [12]], 2)); // [ 10, 11, [ 2 ], 3, 12 ]
```

[UP](#monad-ts)

## License

Monad_ts is copyright (c) 2017 - present Alex Tranchenko tranchenkoa@gmail.com .

Monad_ts is free software, licensed under the Apache License, Version 2.0. See the file LICENSE.md in this distribution for more details.
