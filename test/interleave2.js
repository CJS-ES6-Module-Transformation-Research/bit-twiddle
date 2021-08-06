import test from 'tape';
import {
    interleave2,
    deinterleave2
} from '../twiddle.js';
test('interleave2', function (t) {
    for (var x = 0; x < 100; ++x) {
        for (var y = 0; y < 100; ++y) {
            var h = interleave2(x, y);
            t.equal(deinterleave2(h, 0), x);
            t.equal(deinterleave2(h, 1), y);
        }
    }
    t.end();
});