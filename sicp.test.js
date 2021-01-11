const {
    cons, car, cdr, caar, cadr, len, 
    isnull, isstring, isbool, isnumber, islist, 
    map, filter, t, type, rtype,
    str, prn, eql,
    reduce, max, min,
    alist, aget, aput, adrop } = require('sicp');
const { test, expect } = require('@jest/globals');


test('cons', function() {
    expect(cons()).not.toBeNull();
    expect(cons()(0)).toBeNull();
    expect(cons()(1)).toBeNull();
    expect(cons('a')(0)).toBe('a');
    expect(cons('a')(1)).toBeNull();
    expect(cons('a', 'b')(0)).toBe('a');
    expect(cons('a', 'b')(1)).toBe('b');
    expect(cons(undefined)(0)).toBeNull();
});

test('car', function() {
    expect(car(null)).toBeNull();
    expect(car(cons())).toBeNull();
    expect(car(cons('a'))).toBe('a');
    expect(car(cons('a', 'b'))).toBe('a');
});

test('cdr', function() {
    expect(cdr(null)).toBeNull();
    expect(cdr(cons())).toBeNull();
    expect(cdr(cons('a'))).toBeNull();
    expect(cdr(cons('a', 'b'))).toBe('b');
    expect(cdr(cons(function() { return 'a'; },
                    function() { return 'b'; }))()).toBe('b');
});

test('caar', function() {
    expect(caar(null)).toBeNull();
    expect(caar(cons())).toBeNull();
    expect(caar(cons(cons('a')))).toBe('a');
    expect(caar(cons('a'))).toBeNull();
});

test('cadr', function() {
    expect(cadr(null)).toBeNull();
    expect(cadr(cons())).toBeNull();
    expect(cadr(cons('a'))).toBeNull();
    expect(cadr(cons('a', cons('b')))).toBe('b');
});

test('len', function() {
    expect(len(null)).toBe(0);
    expect(len(cons())).toBe(0);
    expect(len(cons('a'))).toBe(1);
    expect(len(cons('a', cons()))).toBe(1);
    expect(len(cons('a', cons('b')))).toBe(2);
    expect(len(cons('a', cons('b', cons('c', cons('d', cons('e', cons('f')))))))).toBe(6);
});

test('isnull', function() {
    expect(isnull()).toBe(false);
    expect(isnull(null)).toBe(true);
    expect(isnull("a")).toBe(false);
    expect(isnull(1)).toBe(false);
    expect(isnull(0.1)).toBe(false);
    expect(isnull(true)).toBe(false);
    expect(isnull(false)).toBe(false);
    expect(isnull(cons())).toBe(false);
});


test('isstring', function() {
    expect(isstring()).toBe(false);
    expect(isstring(null)).toBe(false);
    expect(isstring("a")).toBe(true);
    expect(isstring(1)).toBe(false);
    expect(isstring(0.1)).toBe(false);
    expect(isstring(true)).toBe(false);
    expect(isstring(false)).toBe(false);
    expect(isstring(cons())).toBe(false);
});

test('isbool', function() {
    expect(isbool()).toBe(false);
    expect(isbool(null)).toBe(false);
    expect(isbool("a")).toBe(false);
    expect(isbool(1)).toBe(false);
    expect(isbool(0.1)).toBe(false);
    expect(isbool(true)).toBe(true);
    expect(isbool(false)).toBe(true);
    expect(isbool(cons())).toBe(false);
});

test('isnumber', function() {
    expect(isnumber()).toBe(false);
    expect(isnumber(null)).toBe(false);
    expect(isnumber("a")).toBe(false);
    expect(isnumber(1)).toBe(true);
    expect(isnumber(0.1)).toBe(true);
    expect(isnumber(true)).toBe(false);
    expect(isnumber(false)).toBe(false);
    expect(isnumber(cons())).toBe(false);
});

test('islist', function() {
    expect(islist()).toBe(false);
    expect(islist(null)).toBe(false);
    expect(islist("a")).toBe(false);
    expect(islist(1)).toBe(false);
    expect(islist(0.1)).toBe(false);
    expect(islist(true)).toBe(false);
    expect(islist(false)).toBe(false);
    expect(islist(cons())).toBe(true);
});

test('map', function() {
    expect(
        eql(
            map(cons(1, cons(2, cons(3, cons(4)))), function(v) { return v + 1 ;}),
            cons(2, cons(3, cons(4, cons(5)))))).toBe(true);
});

test('filter', function() {
    expect(isnull(filter(null, t))).toBeTruthy();
    expect(isnull(filter(cons(), t))).toBeFalsy();
    expect(len(filter(cons(), t))).toBe(0);
    expect(len(filter(cons(cons()), t))).toBe(1);
    expect(len(filter(cons(cons(), cons(cons())), t))).toBe(2);
    expect(len(filter(cons(1, cons(2, cons(3))), t))).toBe(3);

    expect(len(filter(cons(cons('a', 1),
                      cons(cons('b', 2))), t))).toBe(2);
                      
    expect(caar(filter(cons(cons('a', 1),
                       cons(cons('b', 2))), t))).toBe('a');

    expect(caar(filter(cons(cons('a', 1), 
                       cons(cons('b', 2))),
                       function(kv) { return car(kv) === 'b'; }))).toBe('b');

    expect(isnull(filter(null, function(v) { return false; }))).toBeTruthy();
    expect(
        len(
            filter(
                cons(1, cons(2, cons(3, cons(4, cons(5))))),
                function(v) { return v > 2; }))).toBe(3);
    expect(car(filter(cons(1, cons(2, cons(3, cons(4, cons(5))))), function(v) { return v > 2; }))).toBe(3);
    expect(car(filter(cons(1, cons(2, cons(3))), function(v) { return v % 2 === 0; }))).toBe(2);
    expect(len(filter(cons(), function(v) { return true; }))).toBe(0);
});

test('t', function() {
    expect(t()).toBeTruthy();
});

test('type', function() {
    expect(type(null)).toBe('null');
    expect(type("")).toBe('string');
    expect(type(1)).toBe('number');
    expect(type(true)).toBe('bool');
    expect(type(cons())).toBe('list');
    expect(type(cons('a', 'b'))).toBe('list');
});

test('rtype', function() {
    expect(rtype(null)).toBe('null');
    expect(rtype("")).toBe('string');
    expect(rtype(1)).toBe('number');
    expect(rtype(true)).toBe('bool');
    expect(rtype(cons())).toBe('list[null,null]');
    expect(rtype(cons('a', 'b'))).toBe('list[string,string]');
    expect(rtype(cons('a', cons(1, cons(true))))).toBe('list[string,list[number,list[bool,null]]]');
});

test('str', function() {
    expect(str(null)).toBe('null');
    expect(str('a')).toBe('"a"');
    expect(str(1)).toBe('1');
    expect(str(true)).toBe('true');
    expect(str(cons())).toBe('list(,)');
    expect(str(cons("a", cons(1, cons(true))))).toBe('list(\"a\",list(1,list(true,)))');
});

test('eql', function() {
    expect(eql(null, null)).toBeTruthy();
    expect(eql(null, 'a')).toBeFalsy();
    expect(eql('a', 'a')).toBeTruthy();
    expect(eql('a', 'b')).toBeFalsy();
    expect(eql(1, 1)).toBeTruthy();
    expect(eql(1, 2)).toBeFalsy();
    expect(eql(true, true)).toBeTruthy();
    expect(eql(false, false)).toBeTruthy();
    expect(eql(true, false)).toBeFalsy();
    expect(eql(cons(), cons())).toBeTruthy();
    expect(eql(cons('a'), cons('a'))).toBeTruthy();
    expect(eql(cons('a'), cons('b'))).toBeFalsy();
    expect(eql(cons('a', cons('b')), cons('a', cons('b')))).toBeTruthy();

});

test('reduce', function() {
    expect(reduce(null, function(a, b) { return null; })).toBeNull();
    expect(reduce(cons(1, cons(2, cons(3))), function(a, b) { return a + b; })).toBe(6);
    expect(reduce(cons('a', cons('b', cons('c'))), function(a, b) { return a + b; })).toBe('abc');
});

test('max', function() {
    expect(max()).toBeNull();
    expect(max(cons(1, cons(3, cons(2))))).toBe(3);
});

test('min', function() {
    expect(min()).toBeNull();
    expect(min(cons(3, cons(1, cons(2))))).toBe(1);
});

test('alist', function() {
    expect(len(alist())).toBe(0);
    expect(len(alist(cons('a', 1), cons('b', '2')))).toBe(2);
});

test('aget', function() {
    expect(aget(alist(cons('a', 1), cons('b', 2)), 'a')).toBe(1);
    expect(aget(alist(cons('a', 1), cons('b', 2)), 'b')).toBe(2);
    expect(aget(alist(cons('a', 1), cons('b', 2)), 'c')).toBeNull();
});

test('aput', function() {
    expect(len(aput(alist(), 'a', 1))).toBe(1);
    expect(aget(aput(alist(), 'a', 1), 'a')).toBe(1);

    expect(len(aput(aput(alist(), 'a', 1), 'b', 2))).toBe(2);
    expect(aget(aput(aput(alist(), 'a', 1), 'b', 2), 'a')).toBe(1);
    expect(aget(aput(aput(alist(), 'a', 1), 'b', 2), 'b')).toBe(2);

    expect(len(aput(aput(aput(alist(), 'a', 1), 'b', 2), 'c', 3))).toBe(3);
    expect(aget(aput(aput(aput(alist(), 'a', 1), 'b', 2), 'c', 3), 'a')).toBe(1);
    expect(aget(aput(aput(aput(alist(), 'a', 1), 'b', 2), 'c', 3), 'b')).toBe(2);
    expect(aget(aput(aput(aput(alist(), 'a', 1), 'b', 2), 'c', 3), 'c')).toBe(3);
});

test('adrop', function() {
    expect(len(alist())).toBe(0);
    expect(len(adrop(alist(), 'a'))).toBe(0);
    expect(len(adrop(alist(cons('a', 1)), 'a'))).toBe(0);
    expect(len(adrop(alist(cons('a', 1), cons('b', 2)), 'a'))).toBe(1);
    expect(len(adrop(alist(cons('a', 1), cons('b', 2)), 'b'))).toBe(1);
    expect(aget(adrop(alist(cons('a', 1), cons('b', 2), cons('c', 3)), 'c'), 'c')).toBeNull();
    expect(aget(adrop(alist(cons('a', 1), cons('b', 2), cons('c', 3)), 'c'), 'b')).toBe(2);
});