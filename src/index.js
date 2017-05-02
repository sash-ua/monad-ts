"use strict";
/**
 * @description
 * Entry point for all public APIs of the MonadTS package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
exports.List = list_1.List;
var identity_1 = require("./identity");
exports.Identity = identity_1.Identity;
var flow_1 = require("./flow");
exports.Flow = flow_1.Flow;
var clone_1 = require("./services/clone");
exports.clone = clone_1.clone;
var cast_1 = require("./services/cast");
exports.cast = cast_1.cast;
var maybe_1 = require("./maybe");
exports.Maybe = maybe_1.Maybe;
var state_1 = require("./state");
exports.State = state_1.State;
var monad_1 = require("./monad");
exports.Monad = monad_1.Monad;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
