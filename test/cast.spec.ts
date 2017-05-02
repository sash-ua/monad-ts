
import {cast} from "../src/services/cast";

describe('Service Cast: ', ()=>{
    it('should produce array from array of arrays',()=>{
        expect(cast([10, [11], [12]], 0)).toEqual([10, [11], [12]]);
        expect(cast([10, [11], [12]], 1)).toEqual([ 10, 11, 12 ]);
        expect(cast([10, [[11, 2], 3], [12]], 1)).toEqual([ 10, [ 11, 2 ], 3, 12 ]);
        expect(cast([[10], [[11, [2]], 3], [12]], 2)).toEqual([ 10, 11, [ 2 ], 3, 12 ]);
        expect(cast([10, [[11, [2]], 3], [12]], 2)).toEqual([ 10, 11, [ 2 ], 3, 12 ]);
        expect(cast([10, [[11, [2]], 3], [12]], 200)).toEqual( [ 10, 11, 2, 3, 12 ]);
    });
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
