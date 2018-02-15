describe("AdvancedTypes.ts ", () => {
    it("Union types", () => {
        let unionType: string | number;
        unionType = 1;
        expect(unionType).toBe(1);
        unionType = "y";
        expect(unionType).toBe("y");
        //unionType = true;  // not passed
        //expect(unionType).toBe(true);
    });

    it("Type guards", () => {
        function add(
            a: string | number,
            b: string | number
        ): string | number {
            // return a + b; without type checking will get a compiling error
            if (typeof a === "number" && typeof b === "number") {
                return a + b;
            }
            else
                return a.toString() + b.toString();
        }

        expect(add(1, 2)).toBe(3);
        expect(add("1", "2")).toBe("12");
    });

    it("Type alias", () => {
        type StringNumber = string | number;
        type operator = (n1: StringNumber, n2: StringNumber) => StringNumber;

        let accumulator = function (
            init: StringNumber,
            op: operator,
            ...data: StringNumber[]
        ): StringNumber {
            let r = init;
            for (let n of data)
                r = op(r, n);
            return r;
        };

        let add = function (a: StringNumber, b: StringNumber): StringNumber {
            if (typeof a === "number" && typeof b === "number") {
                return a + b;
            }
            else
                return a.toString() + b.toString();
        };

        let multiple = function (a: number, b: number): number {
            return a * b;
        };

        expect(accumulator(0, add, 1, 2, 4)).toBe(7);
        expect(accumulator(1, multiple, 1, 2, 4)).toBe(8);
        expect(accumulator("", add, "1", "2", "4")).toBe("124");
    });

    it("Null and undefined", () => {
        {
            let x: number;
            expect(x).toBe(undefined);
            x = null;
            expect(x).toBe(null);
        }

        {
            let y: number | undefined;
            y = null; // It is different with the book, it is expected to not compilable in the book
            expect(y).toBe(null);
        }
    });

    it("Object rest & spread", () => {
        let obj1 = { a: 1, b: 1 }
        let obj2 = { a: 2, c: 3 }
        let obj3 = { a: 0, ...obj1, ...obj2 }
        expect(obj3.a).toBe(2);
        expect(obj3.b).toBe(1);
        expect(obj3.c).toBe(3);
    });

});


