describe("Functions.ts", function () {
    it("function return value with type", function () {
        function add(a, b) {
            return a + b;
        }
        expect(add(1, 2)).toBe(3);
    });
    it("anonymous function", function () {
        var add = function (a, b) {
            return a + b;
        };
        expect(add(1, 2)).toBe(3);
    });
    it("Optional parameters", function () {
        var concat = function (a, b, c) {
            return a + b + c;
        };
        expect(concat("a", "b", "c")).toBe("abc");
        expect(concat("a", "b")).toBe("abundefined");
        //expect(concat("a")).toBe("aundefined"); // It can't pass
    });
    it("Default parameters", function () {
        var concat = function (a, b, c) {
            if (c === void 0) { c = "DEF"; }
            return a + b + c;
        };
        expect(concat("a", "b", "c")).toBe("abc");
        expect(concat("a", "b")).toBe("abDEF");
        //expect(concat("a")).toBe("aundefined"); // It can't pass
    });
    it("Rest parameters", function () {
        var calculator = function (op) {
            var nums = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                nums[_i - 1] = arguments[_i];
            }
            var r = op == "+" ? 0 : 1;
            for (var _a = 0, nums_1 = nums; _a < nums_1.length; _a++) {
                var n = nums_1[_a];
                switch (op) {
                    case "+":
                        r += n;
                        break;
                    case "*":
                        r *= n;
                        break;
                    default:
                }
            }
            return r;
        };
        expect(calculator("+", 1, 2, 4)).toBe(7);
        expect(calculator("*", 1, 2, 4)).toBe(8);
    });
    it("Function Callbacks", function () {
        var accumulator = function (init, op) {
            var num = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                num[_i - 2] = arguments[_i];
            }
            var r = init;
            for (var _a = 0, num_1 = num; _a < num_1.length; _a++) {
                var n = num_1[_a];
                r = op(r, n);
            }
            return r;
        };
        var add = function (a, b) {
            return a + b;
        };
        var multiple = function (a, b) {
            return a * b;
        };
        expect(accumulator(0, add, 1, 2, 4)).toBe(7);
        expect(accumulator(1, multiple, 1, 2, 4)).toBe(8);
    });
    it("Function overloads", function () {
        function add(a, b) {
            return a + b;
        }
        ;
        expect(add(1, 2)).toBe(3);
        expect(add("1", "2")).toBe("12");
        /* it does not work as a function
        var add2 = function (a: number, b: number): number;
        function (a: string, b: string): string;
        function (a: any, b: any): any {
            return a + b;
        };
        */
    });
});
//# sourceMappingURL=Functions.js.map