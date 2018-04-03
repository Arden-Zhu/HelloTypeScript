describe("Dict.ts", function () {
    var Dict = /** @class */ (function () {
        function Dict() {
        }
        return Dict;
    }());
    var DictHelper = /** @class */ (function () {
        function DictHelper() {
        }
        DictHelper.map = function (m, cb) {
            return Object.keys(m).map(function (key, i) { return cb(m[key], i, key, m); });
        };
        ;
        DictHelper.toDict = function (a, key) {
            var r = {};
            for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
                var t = a_1[_i];
                r[t[key].toString()] = t;
            }
            return r;
        };
        DictHelper.toValues = function (a) {
            return this.toDict(a, "id");
        };
        DictHelper.mapValues = function (m, cb) {
            return Object.keys(m).map(function (id) { return cb(m[id].value, id); });
        };
        // a shallow copy
        DictHelper.copy = function (source) {
            var r = {};
            for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
                var k = _a[_i];
                r[k] = source[k];
            }
            return r;
        };
        DictHelper.update = function (source, t) {
            var r = {};
            for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
                var k = _a[_i];
                r[k] = (k !== t.id) ? source[k] : t;
            }
            return r;
        };
        DictHelper.remove = function (source, id) {
            var r = {};
            for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
                var k = _a[_i];
                if (k !== id)
                    r[k] = source[k];
            }
            return r;
        };
        return DictHelper;
    }());
    function toStr(d) {
        var s = DictHelper.map(d, function (v) { return v.id + v.value; }).join('');
        return s;
    }
    it("IValue to Dict", function () {
        var a = [
            { id: 'z', value: '3', },
            { id: 'y', value: '4', },
            { id: 'x', value: '2', },
        ];
        var d = DictHelper.toValues(a);
        expect(toStr(d)).toBe('z3y4x2');
        d = DictHelper.remove(d, 'y');
        expect(toStr(d)).toBe('z3x2');
        d.y = { id: 'y', value: '5' };
        expect(toStr(d)).toBe('z3x2y5');
        var d2 = DictHelper.copy(d);
        expect(toStr(d2)).toBe('z3x2y5');
        d2.y2 = { id: 'y2', value: '6' };
        expect(toStr(d2)).toBe('z3x2y5y26');
    });
    it("IValue to Dict Sort 2", function () {
        var a = [
            { id: '1', value: '1', },
            { id: '3', value: '3', },
            { id: '2', value: '2', },
        ];
        var d = DictHelper.toValues(a);
        expect(toStr(d)).toBe('112233');
        //d = DictHelper.remove(d, 'y');
        //expect(toStr(d)).toBe('z3x2');
        //d.y = { id: 'y', value: '5' };
        //expect(toStr(d)).toBe('z3x2y5');
        //let d2 = DictHelper.copy(d);
        //expect(toStr(d2)).toBe('z3x2y5');
        //d2.y2 = { id: 'y2', value: '6' };
        //expect(toStr(d2)).toBe('z3x2y5y26');
    });
});
//# sourceMappingURL=Dict.js.map