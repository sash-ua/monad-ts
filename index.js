"use strict";
/**
 * @description
 * Entry point for all public APIs of the Monad-TS package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var equality_1 = require("./src/services/equality");
exports.equality = equality_1.equality;
var either_1 = require("./src/either");
exports.Either = either_1.Either;
var list_1 = require("./src/list");
exports.List = list_1.List;
var identity_1 = require("./src/identity");
exports.Identity = identity_1.Identity;
var flow_1 = require("./src/flow");
exports.Flow = flow_1.Flow;
var clone_1 = require("./src/services/clone");
exports.clone = clone_1.clone;
var cast_1 = require("./src/services/cast");
exports.cast = cast_1.cast;
var maybe_1 = require("./src/maybe");
exports.Maybe = maybe_1.Maybe;
var state_1 = require("./src/state");
exports.State = state_1.State;
var monad_1 = require("./src/monad");
exports.Monad = monad_1.Monad;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
