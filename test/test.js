import test from 'tape';
import {
    INT_MAX as INT_MAX00,
    INT_MIN as INT_MIN00,
    sign,
    abs,
    min,
    max,
    isPow2,
    log2,
    popCount,
    countTrailingZeros,
    nextPow2,
    prevPow2,
    parity,
    reverse,
    nextCombination
} from '../twiddle.js';
var INT_MAX0 = INT_MAX00;
var INT_MIN0 = INT_MIN00;
var INT_MAX = INT_MAX0;
var INT_MIN = INT_MIN0;
test('sign', function (t) {
    t.equal(sign(-100), -1);
    t.equal(sign(100), 1);
    t.equal(sign(0), 0);
    t.equal(sign(INT_MAX0), 1);
    t.equal(sign(INT_MIN0), -1);
    t.end();
});
test('abs', function (t) {
    t.equal(abs(0), 0);
    t.equal(abs(1), 1);
    t.equal(abs(-1), 1);
    t.equal(abs(INT_MAX0), INT_MAX0);
    t.equal(abs(-INT_MAX0), INT_MAX0);
    t.end();
});
test('min', function (t) {
    t.equal(min(0, 0), 0);
    t.equal(min(-1, 1), -1);
    t.equal(min(INT_MAX, INT_MAX), INT_MAX);
    t.equal(min(INT_MIN, INT_MIN), INT_MIN);
    t.equal(min(INT_MAX, INT_MIN), INT_MIN);
    t.end();
});
test('max', function (t) {
    t.equal(max(0, 0), 0);
    t.equal(max(-1, 1), 1);
    t.equal(max(INT_MAX, INT_MAX), INT_MAX);
    t.equal(max(INT_MIN, INT_MIN), INT_MIN);
    t.equal(max(INT_MAX, INT_MIN), INT_MAX);
    t.end();
});
test('isPow2', function (t) {
    t.ok(!isPow2(0));
    for (var i = 0; i < 31; ++i) {
        t.ok(isPow2(1 << i));
    }
    t.ok(!isPow2(100));
    t.ok(!isPow2(2147483647));
    t.ok(!isPow2(-1000000));
    t.end();
});
test('log2', function (t) {
    for (var i = 0; i < 31; ++i) {
        if (i > 0) {
            t.equal(log2((1 << i) - 1), i - 1);
            t.equal(log2((1 << i) + 1), i);
        }
        t.equal(log2(1 << i), i);
    }
    t.end();
});
test('popCount', function (t) {
    t.equal(popCount(0), 0);
    t.equal(popCount(1), 1);
    t.equal(popCount(-1), 32);
    for (var i = 0; i < 31; ++i) {
        t.equal(popCount(1 << i), 1);
        t.equal(popCount((1 << i) - 1), i);
    }
    t.equal(popCount(4042264335), 16);
    t.end();
});
test('countTrailingZeros', function (t) {
    t.equal(countTrailingZeros(0), 32);
    t.equal(countTrailingZeros(1), 0);
    t.equal(countTrailingZeros(-1), 0);
    for (var i = 0; i < 31; ++i) {
        t.equal(countTrailingZeros(1 << i), i);
        if (i > 0) {
            t.equal(countTrailingZeros((1 << i) - 1), 0);
        }
    }
    t.equal(countTrailingZeros(16258816), 8);
    t.end();
});
test('nextPow2', function (t) {
    for (var i = 0; i < 31; ++i) {
        if (i !== 1) {
            t.equal(nextPow2((1 << i) - 1), 1 << i);
        }
        t.equal(nextPow2(1 << i), 1 << i);
        if (i < 30) {
            t.equal(nextPow2((1 << i) + 1), 1 << i + 1);
        }
    }
    t.end();
});
test('prevPow2', function (t) {
    for (var i = 0; i < 31; ++i) {
        if (i > 0) {
            t.equal(prevPow2((1 << i) - 1), 1 << i - 1);
        }
        t.equal(prevPow2(1 << i), 1 << i);
        if (0 < i && i < 30) {
            t.equal(prevPow2((1 << i) + 1), 1 << i, 'i=' + i + ', ' + ((1 << i) + 1));
        }
    }
    t.end();
});
test('parity', function (t) {
    t.equal(parity(1), 1);
    t.equal(parity(0), 0);
    t.equal(parity(15), 0);
    t.equal(parity(271), 1);
    t.end();
});
test('reverse', function (t) {
    t.equal(reverse(0), 0);
    t.equal(reverse(-1), -1);
    t.end();
});
test('nextCombination', function (t) {
    t.equal(nextCombination(1), 2);
    t.equal(nextCombination(768), 1025);
    t.end();
});