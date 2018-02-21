namespace FirstNameSpace {
    class NotExported {
    }
    export class NameSpaceClass {
        id: number;
    }
};

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
        class Simple {
            constructor(_id: number) {
                this.id = _id;
            }
            //constructor() { // NOT allowed multiple constructors
            //    this.id = 10;
            //}
            id: number;
            getId(): number {
                return this.id;
            }
        }

        let simple = new Simple(100);
        expect(simple.getId()).toBe(100);
    });

    it("Class functions & Interface function definitions", () => {
        interface IComplexType {
            id: number;
            name: string;
            print(): string;
            usingTheAnyKeyword(arg1: any): any;
            usingOptionalParameters(optionalArg1?: number);
            usingDefaultParameters(defaultArg1?: number);
            usingRestSyntax(...argArray: number[]);
            usingFunctionCallbacks(callback: (id: number) => string);
        } 

        class ComplexType implements IComplexType {
            id: number;
            name: string;
            constructor(idArg: number, nameArg: string);
            constructor(idArg: string, nameArg: string);
            constructor(idArg: any, nameArg: any) {
                this.id = idArg;
                this.name = nameArg;
            }
            print(): string {
                return "id:" + this.id + " name:" + this.name;
            }
            usingTheAnyKeyword(arg1: any): any {
                this.id = arg1;
            }
            usingOptionalParameters(optionalArg1?: number) {
                if (optionalArg1) {
                    this.id = optionalArg1;
                }
            }
            usingDefaultParameters(defaultArg1: number = 0) {
                this.id = defaultArg1;
            }
            usingRestSyntax(...argArray: number[]) {
                if (argArray.length > 0) {
                    this.id = argArray[0];
                }
            }
            usingFunctionCallbacks(callback: (id: number) => string) {
                callback(this.id);
            }
        } 

        let c = new ComplexType(1, "a");
        expect(c.print()).toBe("id:1 name:a");

        c = new ComplexType("2", "b");
        expect(c.print()).toBe("id:2 name:b");

        /*
            it shows that type checking is only running on compile time,
            NOT on running time, which making it completely different from C#
            So, I think, it is MUST to have type guard in overload functions/constructor
        */
        c = new ComplexType("c", "c");
        expect(c.print()).toBe("id:c name:c"); 
    });

    it("Class modifiers", () => {
        class ClassWithPrivateProperty {
            private id: number;
            // by default , class properties/functions are public
            name: string;
            getId(): number {
                return this.id;
            }
            constructor(_id: number, _name: string) {
                this.id = _id;
                this.name = _name;
            }
        }

        let privateAccess = new ClassWithPrivateProperty(10, "test");
        privateAccess.name = "overrided";
        // privateAccess.id = 20;  // it NOT passes compiling
        expect(privateAccess.getId()).toBe(10);
        expect(privateAccess.name).toBe("overrided");
    });

    it("Constructor access modifiers", () => {
        class ClassWithPrivateProperty {
            // constrcutor access modifiers are handy, but some developer may NOT like it
            constructor(private id: number, public name: string) {
            }
            getId(): number {
                return this.id;
            }
        }

        let privateAccess = new ClassWithPrivateProperty(10, "test");
        privateAccess.name = "overrided";
        // privateAccess.id = 20;  // it NOT passes compiling
        expect(privateAccess.getId()).toBe(10);
        expect(privateAccess.name).toBe("overrided");
    });

    it("Readonly Properties", () => {
        class ClassWithReadOnly {
            //readonly name: string;
            constructor(readonly name: string) {
                //this.name = _name;
            }
            getName(): string {
                return this.name;
            };
            setReadOnly(_name: string) {
                
                //this.name = _name; // generates a compile error 
            };
        }

        let c = new ClassWithReadOnly("test");
        expect(c.getName()).toBe("test");
    });

    it("Class Property accessors", () => {
        // supported only after ECMAScript 5
        class ClassWithAccessors {
            private _id: number;
            get id() {
                console.log(`inside get id()`);
                return this._id;
            }
            set id(value: number) {
                console.log(`inside set id()`);
                this._id = value;
            }
        } 

        let c = new ClassWithAccessors();
        c.id = 2;
        expect(c.id).toBe(2);
    });

    it("Static functions/properties", () => {
        class Simple {
            static id: number;
            static getId(): number {
                return this.id;
            }

            getStaticId(): number {
                return Simple.id;
            }
        }

        Simple.id = 100;
        expect(Simple.getId()).toBe(100);
        expect(new Simple().getStaticId()).toBe(100);
    });

    it("Namespaces", () => {
        //namespace FirstNameSpace { // it is NOT allowed to write namespace inside function
        //    class NotExported {
        //    }
        //    export class NameSpaceClass {
        //        id: number;
        //    }
        //} 
        let firstNameSpace = new FirstNameSpace.NameSpaceClass();
        //let notExported = new FirstNameSpace.NotExported(); // it NOT passed compiling
        expect(1).toBe(1);
    });

});

