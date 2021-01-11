// sicp.js
//
// node -i -e "$(< sicp.js)"
//

const HEAD = 0;
const TAIL = 1;

function cons(head, tail) {
    return function CELL(i) {
        return (i === HEAD) ? (head === undefined ? null : head) : (tail === undefined ? null : tail);
    }
}

function car(list) {
    return islist(list) ? list(HEAD) : null;
}

function cdr(list) {
    return islist(list) ? list(TAIL) : null;
}

function caar(list) {
    return car(car(list));
}

function cadr(list) {
    return car(cdr(list));
}

function len(list) {
    return car(list) ? 1 + len(cdr(list)) : 0;
}

function isnull(v) {
    return v === null;
}

function isstring(v) {
    return v + "" === v;
}

function isbool(v) {
    return !!v === v;
}

function isnumber(v) {
    return v + 0.0 === v;
}

function islist(v) {
    return v && v.name === 'CELL' ? true : false; 
}

function map(list, fn) {
    return cons(fn(car(list)), cdr(list) ? map(cdr(list), fn) : null);
}

function filter(list, fn) {
    return isnull(list) ? null : (fn(car(list)) ? cons(car(list), filter(cdr(list), fn)) : filter(cdr(list), fn));
}

function t() {
    return true;
}

function type(v) {
    return isnull(v) ? "null" : (isstring(v) ? "string" : (isbool(v) ? "bool" : (isnumber(v) ? "number" : (islist(v) ? "list" : "undefined"))));
}

function rtype(v) {
    return type(v) === "list" ? "list[" + rtype(car(v)) + "," + rtype(cdr(v)) + "]" : type(v);
}

function str(v) {
    return car(
            filter(
                map(
                    cons(cons(isnull, function() { return "null"; }),
                    cons(cons(isstring, function() { return '"' + v + '"'; }),
                    cons(cons(isbool, function() { return v + ""; }),
                    cons(cons(isnumber, function() { return v + ""; }),
                    cons(cons(islist, function() { return "list(" + (isnull(car(v)) ? "" : str(car(v))) + "," + (isnull(cdr(v)) ? "" : str(cdr(v))) + ")"; }),
                    cons(cons(t, function() { return "undefined"; }))))))),
                    // pt == predicate/transformer
                    function(pt) { return car(pt)(v) ? cdr(pt)(v) : null; }),
                function(v) { return !isnull(v); }));
}

function prn(v) {
    console.log(str(v));
}

function eql(a, b) {
    return type(a) !== type(b) ? false : (islist(a) ? eql(car(a), car(b)) && eql(cdr(a), cdr(b)) : a == b);
}

function reduce(list, fn, acc = undefined) {
    return !list ? (acc === undefined ? null : acc) : (acc === undefined ? reduce(cdr(list), fn, car(list)) : reduce(cdr(list), fn, fn(acc, car(list))));
}

function max(list) {
    return reduce(list, function(a, b) { return a > b ? a : b; });
}

function min(list) {
    return reduce(list, function(a, b) { return a < b ? a : b; });
}

function alist() {
    return _alist(arguments, 0);
}

function _alist(kvs, i) {
    return i < kvs.length ? cons(kvs[i], _alist(kvs, i+1)) : null;
}

function aget(alist, key) {
    return alist ? (caar(alist) === key ? cdr(car(alist)) : aget(cdr(alist), key)) : null;
}

function aput(alist, key, value) {
    return cons(cons(key, value),
                reduce(alist, function(a, b) {
                    return car(b) === key ? a : cons(b, a);
                }, null));
}

function adrop(alist, key) {
    return reduce(alist,
        function(a, b) {
            return car(b) === key ? a : cons(b, a);
        }, null);
}

exports.cons = cons;
exports.car = car;
exports.cdr = cdr;
exports.caar = caar;
exports.cadr = cadr;
exports.len = len;
exports.isnull = isnull;
exports.isstring = isstring;
exports.isbool = isbool;
exports.isnumber = isnumber;
exports.islist = islist;
exports.map = map;
exports.filter = filter;
exports.t = t;
exports.type = type;
exports.rtype = rtype;
exports.str = str;
exports.prn = prn;
exports.eql = eql;
exports.reduce = reduce;
exports.max = max;
exports.min = min;
exports.alist = alist;
exports.aget = aget;
exports.aput = aput;
exports.adrop = adrop;
