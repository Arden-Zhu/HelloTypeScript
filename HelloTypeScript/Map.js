describe("Map.ts", function () {
    function toStr(m) {
        var s = '';
        m.forEach(function (value, key) {
            s += key + value;
        });
        return s;
    }
    it("Map sort", function () {
        var a = [
            [1, '1',],
            [3, '3',],
            [2, '2',],
            [2, '4',],
            [1, '5',],
        ];
        var d = new Map(a);
        expect(toStr(d)).toBe('153324');
        //d['2'] = '6';
        d.set(2, '6');
        expect(toStr(d)).toBe('153326');
    });
    var Dict = /** @class */ (function () {
        function Dict() {
            this._map = new Map();
        }
        Dict.fromArray = function (arr) {
            var r = new Dict();
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var a = arr_1[_i];
                r._map.set(a.id, a);
            }
            return r;
        };
        Dict.prototype.map = function (cb) {
            var _this = this;
            var idx = 0;
            var r = [];
            this._map.forEach(function (value, id) {
                r.push(cb(value, id, idx++, _this));
            });
            return r;
        };
        Dict.prototype.get = function (id) {
            return this._map[id];
        };
        Dict.prototype.has = function (id) {
            return this._map[id];
        };
        Dict.prototype.keys = function () {
            return this.map(function (value, id) { return id; });
        };
        Dict.prototype.size = function () {
            return this._map.size;
        };
        Dict.prototype.clone = function () {
            var r = new Dict();
            this._map.forEach(function (value, key) {
                r._map.set(key, value);
            });
            return r;
        };
        Dict.prototype.update = function (value) {
            var r = this.clone();
            r._map.set(value.id, value);
            return r;
        };
        Dict.prototype.remove = function (id) {
            var r = this.clone();
            r._map.delete(id);
            return r;
        };
        Dict.prototype.updateBatch = function (values) {
            var r = new Dict();
            this._map.forEach(function (oldValue, key) {
                r._map.set(key, values.has(key) ? values[key] : oldValue);
            });
            return r;
        };
        Dict.prototype.where = function (predict) {
            var r = new Dict();
            this._map.forEach(function (value, key) {
                if (predict(value))
                    r._map.set(key, value);
            });
            return r;
        };
        return Dict;
    }());
});
//# sourceMappingURL=Map.js.map