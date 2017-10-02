"use strict";
/**
 * Calculates a hash (32 bit).
 * Based on FNV-1a algorithm, ref: http://isthe.com/chongo/tech/comp/fnv/
 * @method hash
 * @param {string} str - string to hash
 * @param {number} [pHash = 2166136261] previous hash.
 * @returns {number}
 */
Object.defineProperty(exports, "__esModule", { value: true });
function hash(str, pHash) {
    if (pHash === void 0) { pHash = 2166136261; }
    if (str.length === 0 || !str)
        return null;
    var n = str.length - 1;
    var hash = pHash;
    while (n >= 0) {
        // xor the bottom with the current chunk.
        hash ^= str.charCodeAt(n--);
        //  multiply with a expression of shifts.
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash;
}
exports.hash = hash;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
