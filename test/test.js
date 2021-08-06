var test = require('tape');
var bits = require('../twiddle.js');
var INT_MAX = bits.INT_MAX;
var INT_MIN = bits.INT_MIN;
test('sign', function (t) {
    t.equal(bits.sign(-100), -1);
    t.equal(bits.sign(100), 1);
    t.equal(bits.sign(0), 0);
    t.equal(bits.sign(bits.INT_MAX), 1);
    t.equal(bits.sign(bits.INT_MIN), -1);
    t.end();
});
test('abs', function (t) {
    t.equal(bits.abs(0), 0);
    t.equal(bits.abs(1), 1);
    t.equal(bits.abs(-1), 1);
    t.equal(bits.abs(bits.INT_MAX), bits.INT_MAX);
    t.equal(bits.abs(-bits.INT_MAX), bits.INT_MAX);
    t.end();
});
test('min', function (t) {
    t.equal(bits.min(0, 0), 0);
    t.equal(bits.min(-1, 1), -1);
    t.equal(bits.min(INT_MAX, INT_MAX), INT_MAX);
    t.equal(bits.min(INT_MIN, INT_MIN), INT_MIN);
    t.equal(bits.min(INT_MAX, INT_MIN), INT_MIN);
    t.end();
});
test('max', function (t) {
    t.equal(bits.max(0, 0), 0);
    t.equal(bits.max(-1, 1), 1);
    t.equal(bits.max(INT_MAX, INT_MAX), INT_MAX);
    t.equal(bits.max(INT_MIN, INT_MIN), INT_MIN);
    t.equal(bits.max(INT_MAX, INT_MIN), INT_MAX);
    t.end();
});
test('isPow2', function (t) {
    t.ok(!bits.isPow2(0));
    for (var i = 0; i < 31; ++i) {
        t.ok(bits.isPow2(1 << i));
    }
    t.ok(!bits.isPow2(100));
    t.ok(!bits.isPow2(2147483647));
    t.ok(!bits.isPow2(-1000000));
    t.end();
});
test('log2', function (t) {
    for (var i = 0; i < 31; ++i) {
        if (i > 0) {
            t.equal(bits.log2((1 << i) - 1), i - 1);
            t.equal(bits.log2((1 << i) + 1), i);
        }
        t.equal(bits.log2(1 << i), i);
    }
    t.end();
});
test('popCount', function (t) {
    t.equal(bits.popCount(0), 0);
    t.equal(bits.popCount(1), 1);
    t.equal(bits.popCount(-1), 32);
    for (var i = 0; i < 31; ++i) {
        t.equal(bits.popCount(1 << i), 1);
        t.equal(bits.popCount((1 << i) - 1), i);
    }
    t.equal(bits.popCount(4042264335), 16);
    t.end();
});
test('countTrailingZeros', function (t) {
    t.equal(bits.countTrailingZeros(0), 32);
    t.equal(bits.countTrailingZeros(1), 0);
    t.equal(bits.countTrailingZeros(-1), 0);
    for (var i = 0; i < 31; ++i) {
        t.equal(bits.countTrailingZeros(1 << i), i);
        if (i > 0) {
            t.equal(bits.countTrailingZeros((1 << i) - 1), 0);
        }
    }
    t.equal(bits.countTrailingZeros(16258816), 8);
    t.end();
});
test('nextPow2', function (t) {
    for (var i = 0; i < 31; ++i) {
        if (i !== 1) {
            t.equal(bits.nextPow2((1 << i) - 1), 1 << i);
        }
        t.equal(bits.nextPow2(1 << i), 1 << i);
        if (i < 30) {
            t.equal(bits.nextPow2((1 << i) + 1), 1 << i + 1);
        }
    }
    t.end();
});
test('prevPow2', function (t) {
    for (var i = 0; i < 31; ++i) {
        if (i > 0) {
            t.equal(bits.prevPow2((1 << i) - 1), 1 << i - 1);
        }
        t.equal(bits.prevPow2(1 << i), 1 << i);
        if (0 < i && i < 30) {
            t.equal(bits.prevPow2((1 << i) + 1), 1 << i, 'i=' + i + ', ' + ((1 << i) + 1));
        }
    }
    t.end();
});
test('parity', function (t) {
    t.equal(bits.parity(1), 1);
    t.equal(bits.parity(0), 0);
    t.equal(bits.parity(15), 0);
    t.equal(bits.parity(271), 1);
    t.end();
});
test('reverse', function (t) {
    t.equal(bits.reverse(0), 0);
    t.equal(bits.reverse(-1), -1);
    t.end();
});
test('nextCombination', function (t) {
    t.equal(bits.nextCombination(1), 2);
    t.equal(bits.nextCombination(768), 1025);
    t.end();
});