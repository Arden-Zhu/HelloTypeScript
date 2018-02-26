var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
describe("Decorators.ts", function () {
    it("Simple Decorator", function () {
        var indicator = 0;
        function simpleDecorator(constructor) {
            indicator++;
        }
        // Decorator can work on class definations, class properties, class functions & mothod parameters
        var C1 = /** @class */ (function () {
            function C1() {
            }
            C1 = __decorate([
                simpleDecorator
            ], C1);
            return C1;
        }());
        var C2 = /** @class */ (function () {
            function C2() {
            }
            C2 = __decorate([
                simpleDecorator
            ], C2);
            return C2;
        }());
        var a = new C1();
        a = new C1();
        var b = new C2();
        expect(indicator).toBe(2);
    });
    it("Multiple Decorators", function () {
        var indicator = 0;
        function decorator1(constructor) {
            indicator += 2;
        }
        function decorator2(constructor) {
            indicator *= 2;
        }
        // the functions are execute in reverse order
        var C1 = /** @class */ (function () {
            function C1() {
            }
            C1 = __decorate([
                decorator1,
                decorator2
            ], C1);
            return C1;
        }());
        expect(indicator).toBe(2);
    });
    it("Decorator factories", function () {
        var indicator = 0;
        // use decorator factory to pass parameters to decorator
        function decorator(num) {
            return function (constructor) {
                indicator += num;
            };
        }
        var C = /** @class */ (function () {
            function C() {
            }
            C = __decorate([
                decorator(10)
            ], C);
            return C;
        }());
        expect(indicator).toBe(10);
    });
    it("", function () {
    });
    it("", function () {
    });
    it("", function () {
    });
});
//# sourceMappingURL=Decorators.js.map