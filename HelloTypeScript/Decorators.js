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
    it("Class decorator parameters", function () {
        var decorator = function (constructor) {
            // the constructor of the class is passed in
            expect(constructor.toString()).toContain("function C()");
            // use <any> to bypass property name checking
            expect(constructor.name).toBe("C");
            // inject a new property
            constructor.prototype.testProperty = "test";
        };
        var C = /** @class */ (function () {
            function C() {
            }
            C = __decorate([
                decorator
            ], C);
            return C;
        }());
        var c = new C();
        // the injected property is here
        expect(c.testProperty).toBe("test");
    });
    it("Property decorators", function () {
        function propertyDec(target, propertyKey) {
            expect(typeof (target)).toBe("object");
            expect(target.constructor.name).toBe("ClassWithPropertyDec");
            expect(propertyKey).toBe("name");
        }
        var ClassWithPropertyDec = /** @class */ (function () {
            function ClassWithPropertyDec() {
            }
            __decorate([
                propertyDec
            ], ClassWithPropertyDec.prototype, "name", void 0);
            return ClassWithPropertyDec;
        }());
    });
    it("Static property decorators", function () {
        function propertyDec(target, propertyKey) {
            if (typeof (target) === "object") {
                expect(typeof (target)).toBe("object");
                expect(target.constructor.name).toBe("ClassWithPropertyDec");
                expect(propertyKey).toBe("name");
            }
            else {
                // while it is static property ,  the target is a function, NOT a object
                expect(typeof (target)).toBe("function");
                expect(target.name).toBe("ClassWithPropertyDec");
                expect(propertyKey).toBe("staticName");
            }
        }
        var ClassWithPropertyDec = /** @class */ (function () {
            function ClassWithPropertyDec() {
            }
            __decorate([
                propertyDec
            ], ClassWithPropertyDec.prototype, "name", void 0);
            __decorate([
                propertyDec
            ], ClassWithPropertyDec, "staticName", void 0);
            return ClassWithPropertyDec;
        }());
    });
    it("Method decorators", function () {
        function methodDec(target, methodName, descriptor) {
            console.log("target: " + target);
            console.log("methodName : " + methodName);
            console.log("target[methodName] : " + target[methodName]);
            expect(target.constructor.name).toBe("ClassWithMethodDec");
            expect(methodName).toBe("print");
            expect(typeof (target[methodName])).toBe("function");
            expect(target[methodName].toString()).toContain("output");
        }
        var ClassWithMethodDec = /** @class */ (function () {
            function ClassWithMethodDec() {
            }
            ClassWithMethodDec.prototype.print = function (output) {
                console.log("ClassWithMethodDec.print"
                    + ("(" + output + ") called."));
            };
            __decorate([
                methodDec
            ], ClassWithMethodDec.prototype, "print", null);
            return ClassWithMethodDec;
        }());
    });
    // fix the test
    // according to https://medium.com/@prenezisbell_13570/correction-to-mastering-typescript-2nd-edition-method-decorators-c109d5620e41
    it("Using method decorators", function () {
        var indicator = 0;
        function auditLogDec(target, methodName, descriptor) {
            // 1. Check if descriptor is undefined.
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, methodName);
            }
            var originalFunction = target[methodName];
            // 2. Get a reference to the passed in descriptor.
            var auditFunction = descriptor;
            // 3. assign the new print function to the value of the descriptor, not to the descriptor itself. (solves the this problem)
            auditFunction.value = function () {
                console.log("auditLogDec : override of " + methodName + " called");
                indicator++;
                originalFunction.apply(this, arguments);
            };
            // 4. As before set the key with the new function
            target[methodName] = auditFunction;
            // 5. returning doesn't break anything, imitating what code from github did.
            return auditFunction;
        }
        var ClassWithAuditDec = /** @class */ (function () {
            function ClassWithAuditDec() {
            }
            ClassWithAuditDec.prototype.print = function (output) {
                console.log("ClassWithMethodDec.print"
                    + ("(" + output + ") called."));
            };
            __decorate([
                auditLogDec
            ], ClassWithAuditDec.prototype, "print", null);
            return ClassWithAuditDec;
        }());
        var auditClass = new ClassWithAuditDec();
        auditClass.print("test");
        expect(indicator).toBe(1);
        auditClass.print("test2");
        expect(indicator).toBe(2);
    });
    it("", function () {
    });
    it("", function () {
    });
    it("", function () {
    });
});
//# sourceMappingURL=Decorators.js.map