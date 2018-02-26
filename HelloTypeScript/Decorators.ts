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


    // fix the test
    // according to https://medium.com/@prenezisbell_13570/correction-to-mastering-typescript-2nd-edition-method-decorators-c109d5620e41
    it("Using method decorators", () => {
        let indicator = 0;

        function auditLogDec(target: any,
            methodName: string,
            descriptor?: PropertyDescriptor) {
            // 1. Check if descriptor is undefined.
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, methodName);
            }
            let originalFunction = target[methodName];

            // 2. Get a reference to the passed in descriptor.
            let auditFunction = descriptor;

            // 3. assign the new print function to the value of the descriptor, not to the descriptor itself. (solves the this problem)
            auditFunction.value = function () {
                console.log(`auditLogDec : override of ${methodName} called`);
                indicator++;
                originalFunction.apply(this, arguments);
            };
            // 4. As before set the key with the new function
            target[methodName] = auditFunction;
            // 5. returning doesn't break anything, imitating what code from github did.
            return auditFunction;
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

    it("Parameter decorators", () => {
        function parameterDec(target: any,
            methodName: string,
            parameterIndex: number) {

            expect(typeof (target)).toBe("object");
            expect(methodName).toBe("print");
            expect(parameterIndex).toBe(0);
        }       

        class ClassWithParamDec {
            print( @parameterDec value: string) {

            }
        } 
    });

    /*
        to use it emitDecoratorMetadata should be set to true in compilerOptions of tsconfig.json
    */
    it("Decorator metadata", () => {
        function metadataParameterDec(target: any,
            methodName: string,
            parameterIndex: number) {

        }

        class ClassWithMetaData {
            print(
                @metadataParameterDec
                id: number,
                name: string): number {
                return 1000;
            }
        }
        /*
            these is seen in the Decorators.js

                __decorate([
                    __param(0, metadataParameterDec),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Number, String]),
                    __metadata("design:returntype", Number)
                ], ClassWithMetaData.prototype, "print", null);

        */
        expect(1).toBe(1);
    });

    it("", () => {
    });

});