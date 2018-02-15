var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
describe("AdvancedTypes.ts ", function () {
    it("Union types", function () {
        var unionType;
        unionType = 1;
        expect(unionType).toBe(1);
        unionType = "y";
        expect(unionType).toBe("y");
        //unionType = true;  // not passed
        //expect(unionType).toBe(true);
    });
    it("Type guards", function () {
        function add(a, b) {
            // return a + b; without type checking will get a compiling error
            if (typeof a === "number" && typeof b === "number") {
                return a + b;
            }
            else
                return a.toString() + b.toString();
        }
        expect(add(1, 2)).toBe(3);
        expect(add("1", "2")).toBe("12");
    });
    it("Type alias", function () {
        var accumulator = function (init, op) {
            var data = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                data[_i - 2] = arguments[_i];
            }
            var r = init;
            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                var n = data_1[_a];
                r = op(r, n);
            }
            return r;
        };
        var add = function (a, b) {
            if (typeof a === "number" && typeof b === "number") {
                return a + b;
            }
            else
                return a.toString() + b.toString();
        };
        var multiple = function (a, b) {
            return a * b;
        };
        expect(accumulator(0, add, 1, 2, 4)).toBe(7);
        expect(accumulator(1, multiple, 1, 2, 4)).toBe(8);
        expect(accumulator("", add, "1", "2", "4")).toBe("124");
    });
    it("Null and undefined", function () {
        {
            var x = void 0;
            expect(x).toBe(undefined);
            x = null;
            expect(x).toBe(null);
        }
        {
            var y = void 0;
            y = null; // It is different with the book, it is expected to not compilable in the book
            expect(y).toBe(null);
        }
    });
    it("Object rest & spread", function () {
        var obj1 = { a: 1, b: 1 };
        var obj2 = { a: 2, c: 3 };
        var obj3 = __assign({ a: 0 }, obj1, obj2);
        expect(obj3.a).toBe(2);
        expect(obj3.b).toBe(1);
        expect(obj3.c).toBe(3);
    });
});
//# sourceMappingURL=AdvancedTypes.js.map