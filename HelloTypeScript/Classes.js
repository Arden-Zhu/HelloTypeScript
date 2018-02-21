describe("Classes.ts", function () {
    it("Classes & Class Properties", function () {
        var Simple = /** @class */ (function () {
            function Simple() {
            }
            Simple.prototype.getId = function () {
                return this.id;
            };
            return Simple;
        }());
        var simple = new Simple();
        simple.id = 100;
        expect(simple.getId()).toBe(100);
    });
    it("Implementing Interfaces", function () {
        ;
        var SimpleA = /** @class */ (function () {
            function SimpleA() {
            }
            SimpleA.prototype.getClassName = function () {
                return "SimpleA";
            };
            ;
            SimpleA.prototype.newFunction = function () {
                // it shows that class can have new function against interface
            };
            ;
            return SimpleA;
        }());
        var SimpleB = /** @class */ (function () {
            function SimpleB() {
            }
            SimpleB.prototype.getClassName = function () {
                return "SimpleB";
            };
            ;
            SimpleB.prototype.other = function () {
                return 10;
            };
            return SimpleB;
        }());
        var simple = new SimpleA();
        expect(simple.getClassName()).toBe("SimpleA");
        simple = new SimpleB();
        expect(simple.getClassName()).toBe("SimpleB");
        var simpleB = simple; // type cast
        expect(simpleB.other()).toBe(10);
    });
    it("Constructor", function () {
    });
    it("Class functions", function () {
    });
    it("Interface function definitions", function () {
    });
    it("Class modifiers", function () {
    });
    it("Constructor access modifiers", function () {
    });
    it("Readonly Properties", function () {
    });
    it("Class Property accessors", function () {
    });
    it("Static functions/properties", function () {
    });
    it("Namespaces", function () {
    });
});
//# sourceMappingURL=Classes.js.map