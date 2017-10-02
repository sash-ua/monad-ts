/**
 * Calculates a hash (32 bit).
 * Based on FNV-1a algorithm, ref: http://isthe.com/chongo/tech/comp/fnv/
 * @method hash
 * @param {string} str - string to hash
 * @param {number} [pHash = 2166136261] previous hash.
 * @returns {number}
 */
export declare function hash(str: string, pHash?: number): number;
