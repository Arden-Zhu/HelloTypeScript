describe("Functions.ts", () => {
    it("function return value with type", () => {
        function add(a: number, b: number): number {
            return a + b;
        }
        expect(add(1, 2)).toBe(3);
    });

    it("anonymous function", () => {
        let add = function(a: number, b: number): number {
            return a + b;
        }
        expect(add(1, 2)).toBe(3);
    });

    it("Optional parameters", () => {
        let concat = function (a: string, b: string, c?: string): string {
            return a + b + c;
        };

        expect(concat("a", "b", "c")).toBe("abc");
        expect(concat("a", "b")).toBe("abundefined");
        //expect(concat("a")).toBe("aundefined"); // It can't pass
    });

    it("Default parameters", () => {
        let concat = function (a: string, b: string, c: string = "DEF"): string {
            return a + b + c;
        };

        expect(concat("a", "b", "c")).toBe("abc");
        expect(concat("a", "b")).toBe("abDEF");
        //expect(concat("a")).toBe("aundefined"); // It can't pass
    });

    it("Rest parameters", () => {
        let calculator = function (op: string, ...nums: number[]): number {
            let r = op == "+"?0:1;
            for (let n of nums) {
                switch (op) {
                    case "+": r += n; break;
                    case "*": r *= n; break;
                    default:
                }
            }

            return r;
        };

        expect(calculator("+", 1, 2, 4)).toBe(7);
        expect(calculator("*", 1, 2, 4)).toBe(8);
    });

    it("Function Callbacks", () => {
        let accumulator = function (
            init: number,
            op: (n1: number, n2: number) => number,
            ...num: number[]
        ): number {
            let r = init;
            for (let n of num)
                r = op(r, n);
            return r;
        };

        let add = function (a: number, b: number): number {
            return a + b;
        };

        let multiple = function (a: number, b: number): number {
            return a * b;
        };

        expect(accumulator(0, add, 1, 2, 4)).toBe(7);
        expect(accumulator(1, multiple, 1, 2, 4)).toBe(8);
    });

    it("Function overloads", () => {
        function add(a: number, b: number): number;
        function add(a: string, b: string): string;
        function add(a: any, b: any): any {
            return a + b;
        };

        expect(add(1, 2)).toBe(3);
        expect(add("1", "2")).toBe("12");

        /* it does not work as a function
        var add2 = function (a: number, b: number): number;
        function (a: string, b: string): string;
        function (a: any, b: any): any {
            return a + b;
        };
        */
    });

});