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

    it("", () => {
    });

    it("", () => {
    });

    it("", () => {
    });

});