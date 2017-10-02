
/**
 * Calculates a hash (32 bit).
 * Based on FNV-1a algorithm, ref: http://isthe.com/chongo/tech/comp/fnv/
 * @method hash
 * @param {string} str - string to hash
 * @param {number} [pHash = 2166136261] previous hash.
 * @returns {number}
 */

export function hash( str: string, pHash: number = 2166136261): number {
    if(str.length === 0 || !str) return null;
    let n = str.length-1;
    let hash = pHash;
    while(n >= 0){
        // xor the bottom with the current chunk.
        hash ^= str.charCodeAt(n--);
        //  multiply with a expression of shifts.
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.