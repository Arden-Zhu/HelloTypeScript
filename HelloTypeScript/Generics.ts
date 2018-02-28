describe("Generics.ts", () => {
    it("Generic syntax", () => {
        class Concatenator<T> {
            concatenateArray(inputArray: Array<T>): string {
                let returnString = "";

                for (let i = 0; i < inputArray.length; i++) {
                    if (i > 0)
                        returnString += ",";
                    returnString += inputArray[i].toString();
                }
                return returnString;
            }
        }

        var stringConcat = new Concatenator<string>();
        var numberConcat = new Concatenator<number>();

        var stringArray: string[] = ["first", "second", "third"];

        expect(stringConcat.concatenateArray(stringArray)).toBe("first,second,third");
        expect(numberConcat.concatenateArray([1, 2, 3])).toBe("1,2,3");
    });

    it("Constraining the type of T", () => {
        interface IBase {
            id: number;
        }

        class Base implements IBase {
            constructor(public id: number) {

            }
        }

        // constraint the type of T
        class Comparer<T extends IBase> {
            isEqual(a: T, b: T): boolean {
                return a.id === b.id;
            }
        }

        let a = new Base(1);
        let b = new Base(2);
        // create with class
        let comparer = new Comparer<Base>();
        
        expect(comparer.isEqual(a, b)).toBe(false);

        let c2 = new Comparer(); // create with IBase
        expect(c2.isEqual(a, b)).toBe(false);
    });

    it("Creating new objects within generics", () => {
        class FirstClass {
            id: number;
        }

        class SecondClass {
            name: string;
        }

        /* it does not work
        class GenericCreator<T> {
            create(): T {
                return new T();
            }
        }
        */
        class GenericCreator<T> {
            create(arg1: { new(): T }): T {
                return new arg1();
            }
        }

        var creator1 = new GenericCreator<FirstClass>();
        var firstClass: FirstClass = creator1.create(FirstClass);

        var creator2 = new GenericCreator<SecondClass>();
        var secondClass: SecondClass = creator2.create(SecondClass); 

        expect(typeof (firstClass)).toBe("object");
    });

    it("", () => {
    });

    it("", () => {
    });

    it("", () => {
    });

});

