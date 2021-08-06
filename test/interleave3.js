import test from 'tape';
import {
    interleave3,
    deinterleave3
} from '../twiddle.js';
test('interleave3', function (t) {
    for (var x = 0; x <= 25; ++x) {
        for (var y = 0; y <= 25; ++y) {
            for (var z = 0; z <= 25; ++z) {
                var h = interleave3(x, y, z);
                t.equal(deinterleave3(h, 0), x);
                t.equal(deinterleave3(h, 1), y);
                t.equal(deinterleave3(h, 2), z);
            }
        }
    }
    t.end();
});