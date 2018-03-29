describe("Types.ts", () => {
    it("duck typing", () => {
        var complex1 = { id: 1, name: "name" };
        var complex2 = { name: "name", id: 1 };
        expect(complex1).toEqual(complex2);
        expect(complex1).not.toBe(complex2);
        expect(complex1).not.toBe({ id: 1, name: "name" });
        complex2 = complex1;
        expect(complex1).toBe(complex2);
    });

    it("template strings", () => {
        var s = "test";
        s = `my ${s}`;
        expect(s).toBe("my test");
    });

    it("array", () => {
        var a1: number[] = [1, 2, 3];
        var a2: number[] = [1, 2, 3];
        expect(a1).not.toBe(a2);
        expect(a1).toEqual(a2);
        var s = `a1=[${a1}]`;
        expect(s).toBe("a1=[1,2,3]");
    });

    it("for in/for of", () => {
        var a: string[] = ["first", "second", "third"];
        var s1 = "", s2 = "", s3 = "";
        for (var i = 0; i < a.length; i++) {
            s1 += a[i];
        }
        for (var i2 in a) {
            s2 += a[i2];
        }
        for (var i3 of a) {
            s3 += i3;
        }
        expect(s1).toBe("firstsecondthird");
        expect(s2).toBe(s1);
        expect(s3).toBe(s1);
    });

    it("any type", () => {
        var item1: any = { id: 1, name: "name" };
        item1 = { b: 2 }; // it passes ONLY because it is defined as any 

        let concat = function (a, b, c) { // the function does not figure out the type of parameters and return value
            return a + b + c;
        }
        expect(concat(1, 2, 3)).toBe(6);
        expect(concat("a", "b", "c")).toBe("abc");
    });

    it("Explicit casting", () => {
        var item1 = <any>{ id: 1, name: "item 1" };
        item1 = { id: 2 };
        expect(1).toBe(1);
    });

    it("Enums", () => {
        enum DoorState {
            Open,
            Closed,
            Ajax = 7
        };

        expect(DoorState.Open).toBe(0);
        expect(DoorState["Open"]).toBe(0);
        expect(DoorState[0]).toBe("Open");
        expect(DoorState["0"]).toBe("Open");
        expect(DoorState.Ajax).toBe(7);
    })

    it("Const Enums", () => {
        const enum DoorState {
            Open,
            Closed,
            Ajax = 7
        };

        expect(DoorState.Open).toBe(0);
        expect(DoorState["Open"]).toBe(0);
        //expect(DoorState[0]).toBe("Open"); // it don't pass compile
        //expect(DoorState["0"]).toBe("Open"); // it don't pass compile
        expect(DoorState.Ajax).toBe(7);
    })

    it("Const value", () => {
        const constValue = "test";
        //constValue = "2"; // it don't pass compile
        expect(0).toBe(0);
    })

    it("let keyword", () => {
        expect(a).toBe(undefined);
        var a = 2;

        // expect(b).toBe(undefined); // it don't pass compile
        let b = 2;
        {
            // show block-scoped
            let b = 20;
            expect(b).toBe(20);
        }
        expect(b).toBe(2);
    })

    it("Object key", () => {
        interface ICopyMethod {
            value: string
            desc: string;
        }

        let copyMethods = {
            petite: { desc: 'Copy Missy to Petite'},
            woman: { desc: 'Copy Missy to Plus' },
            china: { desc: 'Copy Missy to China Market' },
            ongoing: { desc: 'Copy onging style' }
        }

        let r = Object.keys(copyMethods).map(value => copyMethods[value]);
        expect(r.length).toBe(4);
    })

    it("Map", () => {
        let m = new Map<string, string>();
        m.set('a', '1');
        m.set('b', '2');
        expect(m.size).toBe(2);
        expect(m.get('a')).toBe("1");
        //let r = m.forEach((value, key, map) => value);

    })

    it("Map<T>", () => {
        interface Desc {
            desc: string;
        }
        interface Map<T> {
            [key: string]: T
        }

        let copyMethods: Map<Desc> = {
            petite: { desc: 'Copy Missy to Petite' },
            woman: { desc: 'Copy Missy to Plus' },
            china: { desc: 'Copy Missy to China Market' },
            ongoing: { desc: 'Copy onging style' }
        }

        let r = Object.keys(copyMethods).map(value => copyMethods[value].desc);
        expect(r.length).toBe(4);
        expect(r[1]).toBe(copyMethods['woman'].desc);
        expect(r[1]).toBe(copyMethods.woman.desc);

        copyMethods.newProp = { desc: "new prop" };
        r = Object.keys(copyMethods).map(value => copyMethods[value].desc);
        expect(r.length).toBe(5);
        expect(r[4]).toBe(copyMethods['newProp'].desc);

        let map = function <T, R>(m: Map<T>, cb: (value: T, index?: number, m?: Map<T>) => R) : R[] {
            return Object.keys(m).map((key, i) => cb(m[key], i, m));
        }

        let r2 = map(copyMethods, value => value.desc);
        expect(r2.length).toBe(5);
        expect(r2[4]).toBe(copyMethods['newProp'].desc);

        let toMap = function <T>(a: T[], key: string): Map<T> {
            let r: Map<T> = {}
            for (var t of a)
                r[t[key]] = t;
            return r;
        }

        interface V {
            id: string,
            value : string,
        };

        let va: V[] = [
            { id: '1', value: 'v1' },
            { id: '2', value: 'v2' },
        ];

        let m = toMap(va, 'id');
        expect(m['2'].value).toBe('v2');

    })

    //it("Dictinary<T>", () => {
    //    interface Desc {
    //        id: number,
    //        value: string,
    //    }
    //    interface Dictionary<T, K> {
    //        [key: K]: T  // compile fail
    //    }
    //})

});


