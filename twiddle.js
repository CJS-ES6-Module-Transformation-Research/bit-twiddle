var INT_BITS0;
var INT_MAX;
var INT_MIN;
var sign;
var abs;
var min;
var max;
var isPow2;
var log2;
var log10;
var popCount;
var countTrailingZeros0;
var nextPow2;
var prevPow2;
var parity;
var reverse;
var interleave2;
var deinterleave2;
var interleave3;
var deinterleave3;
var nextCombination;
'use restrict';
var INT_BITS = 32;
INT_BITS0 = INT_BITS;
module.exports.INT_BITS = INT_BITS0;
INT_MAX = 2147483647;
module.exports.INT_MAX = INT_MAX;
INT_MIN = -1 << INT_BITS - 1;
module.exports.INT_MIN = INT_MIN;
sign = function (v) {
    return (v > 0) - (v < 0);
};
module.exports.sign = sign;
abs = function (v) {
    var mask = v >> INT_BITS - 1;
    return (v ^ mask) - mask;
};
module.exports.abs = abs;
min = function (x, y) {
    return y ^ (x ^ y) & -(x < y);
};
module.exports.min = min;
max = function (x, y) {
    return x ^ (x ^ y) & -(x < y);
};
module.exports.max = max;
isPow2 = function (v) {
    return !(v & v - 1) && !!v;
};
module.exports.isPow2 = isPow2;
log2 = function (v) {
    var r;
    var shift;
    r = (v > 65535) << 4;
    v >>>= r;
    shift = (v > 255) << 3;
    v >>>= shift;
    r |= shift;
    shift = (v > 15) << 2;
    v >>>= shift;
    r |= shift;
    shift = (v > 3) << 1;
    v >>>= shift;
    r |= shift;
    return r | v >> 1;
};
module.exports.log2 = log2;
log10 = function (v) {
    return v >= 1000000000 ? 9 : v >= 100000000 ? 8 : v >= 10000000 ? 7 : v >= 1000000 ? 6 : v >= 100000 ? 5 : v >= 10000 ? 4 : v >= 1000 ? 3 : v >= 100 ? 2 : v >= 10 ? 1 : 0;
};
module.exports.log10 = log10;
popCount = function (v) {
    v = v - (v >>> 1 & 1431655765);
    v = (v & 858993459) + (v >>> 2 & 858993459);
    return (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
};
module.exports.popCount = popCount;
function countTrailingZeros(v) {
    var c = 32;
    v &= -v;
    if (v)
        c--;
    if (v & 65535)
        c -= 16;
    if (v & 16711935)
        c -= 8;
    if (v & 252645135)
        c -= 4;
    if (v & 858993459)
        c -= 2;
    if (v & 1431655765)
        c -= 1;
    return c;
}
countTrailingZeros0 = countTrailingZeros;
module.exports.countTrailingZeros = countTrailingZeros0;
nextPow2 = function (v) {
    v += v === 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v + 1;
};
module.exports.nextPow2 = nextPow2;
prevPow2 = function (v) {
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v - (v >>> 1);
};
module.exports.prevPow2 = prevPow2;
parity = function (v) {
    v ^= v >>> 16;
    v ^= v >>> 8;
    v ^= v >>> 4;
    v &= 15;
    return 27030 >>> v & 1;
};
module.exports.parity = parity;
var REVERSE_TABLE = new Array(256);
(function (tab) {
    for (var i = 0; i < 256; ++i) {
        var v = i;
        var r = i;
        var s = 7;
        for (v >>>= 1; v; v >>>= 1) {
            r <<= 1;
            r |= v & 1;
            --s;
        }
        tab[i] = r << s & 255;
    }
}(REVERSE_TABLE));
reverse = function (v) {
    return REVERSE_TABLE[v & 255] << 24 | REVERSE_TABLE[v >>> 8 & 255] << 16 | REVERSE_TABLE[v >>> 16 & 255] << 8 | REVERSE_TABLE[v >>> 24 & 255];
};
module.exports.reverse = reverse;
interleave2 = function (x, y) {
    x &= 65535;
    x = (x | x << 8) & 16711935;
    x = (x | x << 4) & 252645135;
    x = (x | x << 2) & 858993459;
    x = (x | x << 1) & 1431655765;
    y &= 65535;
    y = (y | y << 8) & 16711935;
    y = (y | y << 4) & 252645135;
    y = (y | y << 2) & 858993459;
    y = (y | y << 1) & 1431655765;
    return x | y << 1;
};
module.exports.interleave2 = interleave2;
deinterleave2 = function (v, n) {
    v = v >>> n & 1431655765;
    v = (v | v >>> 1) & 858993459;
    v = (v | v >>> 2) & 252645135;
    v = (v | v >>> 4) & 16711935;
    v = (v | v >>> 16) & 65535;
    return v << 16 >> 16;
};
module.exports.deinterleave2 = deinterleave2;
interleave3 = function (x, y, z) {
    x &= 1023;
    x = (x | x << 16) & 4278190335;
    x = (x | x << 8) & 251719695;
    x = (x | x << 4) & 3272356035;
    x = (x | x << 2) & 1227133513;
    y &= 1023;
    y = (y | y << 16) & 4278190335;
    y = (y | y << 8) & 251719695;
    y = (y | y << 4) & 3272356035;
    y = (y | y << 2) & 1227133513;
    x |= y << 1;
    z &= 1023;
    z = (z | z << 16) & 4278190335;
    z = (z | z << 8) & 251719695;
    z = (z | z << 4) & 3272356035;
    z = (z | z << 2) & 1227133513;
    return x | z << 2;
};
module.exports.interleave3 = interleave3;
deinterleave3 = function (v, n) {
    v = v >>> n & 1227133513;
    v = (v | v >>> 2) & 3272356035;
    v = (v | v >>> 4) & 251719695;
    v = (v | v >>> 8) & 4278190335;
    v = (v | v >>> 16) & 1023;
    return v << 22 >> 22;
};
module.exports.deinterleave3 = deinterleave3;
nextCombination = function (v) {
    var t = v | v - 1;
    return t + 1 | (~t & -~t) - 1 >>> countTrailingZeros(v) + 1;
};
module.exports.nextCombination = nextCombination;