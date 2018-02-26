describe("Decorators.ts", () => {
    it("Simple Decorator", () => {
        let indicator = 0;
        function simpleDecorator(constructor: Function) {
            indicator++;
        }

        // Decorator can work on class definations, class properties, class functions & mothod parameters
        @simpleDecorator
        class C1 { }

        @simpleDecorator
        class C2 { }

        let a = new C1();
        a = new C1();
        let b = new C2();
        expect(indicator).toBe(2);
    });

    it("Multiple Decorators", () => {
        let indicator = 0;
        function decorator1(constructor: Function) {
            indicator += 2;
        }

        function decorator2(constructor: Function) {
            indicator *= 2;
        }

        // the functions are execute in reverse order
        @decorator1
        @decorator2
        class C1 { }

        expect(indicator).toBe(2);
    });

    it("Decorator factories", () => {
        let indicator = 0;
        // use decorator factory to pass parameters to decorator
        function decorator(num: number) {
            return function (constructor: Function) {
                indicator += num;
            }
        }

        @decorator(10)
        class C { }

        expect(indicator).toBe(10);
    });

    it("Class decorator parameters", () => {
        let decorator = function (constructor: Function) {
            // the constructor of the class is passed in
            expect(constructor.toString()).toContain("function C()");
            // use <any> to bypass property name checking
            expect((<any>constructor).name).toBe("C");
            // inject a new property
            constructor.prototype.testProperty = "test";
        }

        @decorator
        class C {

        }

        let c = new C();
        // the injected property is here
        expect((<any>c).testProperty).toBe("test");
    });

    it("Property decorators", () => {
        function propertyDec(target: any, propertyKey: string) {
            expect(typeof (target)).toBe("object");
            expect(target.constructor.name).toBe("ClassWithPropertyDec");
            expect(propertyKey).toBe("name");
        }

        class ClassWithPropertyDec {
            @propertyDec
            name: string;
        } 
    });

    it("Static property decorators", () => {
        function propertyDec(target: any, propertyKey: string) {
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

        class ClassWithPropertyDec {
            @propertyDec
            name: string;
            @propertyDec
            static staticName: string;
        } 
    });

    it("Method decorators", () => {
        function methodDec(target: any,
            methodName: string,
            descriptor?: PropertyDescriptor) {
            console.log(`target: ${target}`);
            console.log(`methodName : ${methodName}`);
            console.log(`target[methodName] : ${target[methodName]}`);
            expect(target.constructor.name).toBe("ClassWithMethodDec");
            expect(methodName).toBe("print");
            expect(typeof (target[methodName])).toBe("function");
            expect(target[methodName].toString()).toContain("output");

        } 

        class ClassWithMethodDec {
            @methodDec
            print(output: string) {
                console.log(`ClassWithMethodDec.print`
                    + `(${output}) called.`);
            }
        } 
    });

    it("Using method decorators", () => {
        let indicator = 0;
        function auditLogDec(target: any,
            methodName: string,
            descriptor?: PropertyDescriptor) {
            let originalFunction = target[methodName];

            let auditFunction = function () {
                console.log(`auditLogDec : overide of `
                    + ` ${methodName} called `);
                indicator++;
                originalFunction.apply(this, arguments);
            }

            target[methodName] = auditFunction;
        }  

        class ClassWithAuditDec {
            @auditLogDec
            print(output: string) {
                console.log(`ClassWithMethodDec.print`
                    + `(${output}) called.`);
            }
        }

        let auditClass = new ClassWithAuditDec();
        auditClass.print("test");
        expect(indicator).toBe(1);
        auditClass.print("test2");
        expect(indicator).toBe(2);
    });

    it("", () => {
    });

    it("", () => {
    });

    it("", () => {
    });

});