describe("Classes.ts", () => {
    it("Classes & Class Properties", () => {
        class Simple {
            id: number;
            getId(): number {
                return this.id;
            }
        }

        let simple = new Simple();
        simple.id = 100;
        expect(simple.getId()).toBe(100);
    });

    it("Implementing Interfaces", () => {
        interface ISimple {
            getClassName(): string;
        };

        interface IOther {
            other(): number;
        }

        class SimpleA implements ISimple {
            getClassName(): string {
                return "SimpleA";
            };
            newFunction(): void {
                // it shows that class can have new function against interface
            };
        }

        class SimpleB implements ISimple, IOther { // multiple interface implementation is OK
            getClassName(): string {
                return "SimpleB";
            };
            other(): number {
                return 10;
            }
        }


        let simple: ISimple = new SimpleA();
        expect(simple.getClassName()).toBe("SimpleA");
        simple = new SimpleB();
        expect(simple.getClassName()).toBe("SimpleB");
        let simpleB: SimpleB = simple as SimpleB; // type cast
        expect(simpleB.other()).toBe(10);
    });

    it("Constructor", () => {
    });

    it("Class functions", () => {
    });

    it("Interface function definitions", () => {
    });

    it("Class modifiers", () => {
    });

    it("Constructor access modifiers", () => {
    });

    it("Readonly Properties", () => {
    });

    it("Class Property accessors", () => {
    });

    it("Static functions/properties", () => {
    });

    it("Namespaces", () => {
    });

});

