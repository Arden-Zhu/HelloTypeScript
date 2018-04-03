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
describe("Dict.ts", function () {
    it("duck typing", function () {
        var complex1 = { id: 1, name: "name" };
        var complex2 = { name: "name", id: 1 };
        expect(complex1).toEqual(complex2);
        expect(complex1).not.toBe(complex2);
        expect(complex1).not.toBe({ id: 1, name: "name" });
        complex2 = complex1;
        expect(complex1).toBe(complex2);
    });
});
//# sourceMappingURL=Dict.js.map