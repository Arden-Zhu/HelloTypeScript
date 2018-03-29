describe("Types.ts", function () {
    it("duck typing", function () {
        var complex1 = { id: 1, name: "name" };
        var complex2 = { name: "name", id: 1 };
        expect(complex1).toEqual(complex2);
        expect(complex1).not.toBe(complex2);
        expect(complex1).not.toBe({ id: 1, name: "name" });
        complex2 = complex1;
        expect(complex1).toBe(complex2);
    });
    it("template strings", function () {
        var s = "test";
        s = "my " + s;
        expect(s).toBe("my test");
    });
    it("array", function () {
        var a1 = [1, 2, 3];
        var a2 = [1, 2, 3];
        expect(a1).not.toBe(a2);
        expect(a1).toEqual(a2);
        var s = "a1=[" + a1 + "]";
        expect(s).toBe("a1=[1,2,3]");
    });
    it("for in/for of", function () {
        var a = ["first", "second", "third"];
        var s1 = "", s2 = "", s3 = "";
        for (var i = 0; i < a.length; i++) {
            s1 += a[i];
        }
        for (var i2 in a) {
            s2 += a[i2];
        }
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var i3 = a_1[_i];
            s3 += i3;
        }
        expect(s1).toBe("firstsecondthird");
        expect(s2).toBe(s1);
        expect(s3).toBe(s1);
    });
    it("any type", function () {
        var item1 = { id: 1, name: "name" };
        item1 = { b: 2 }; // it passes ONLY because it is defined as any 
        var concat = function (a, b, c) {
            return a + b + c;
        };
        expect(concat(1, 2, 3)).toBe(6);
        expect(concat("a", "b", "c")).toBe("abc");
    });
    it("Explicit casting", function () {
        var item1 = { id: 1, name: "item 1" };
        item1 = { id: 2 };
        expect(1).toBe(1);
    });
    it("Enums", function () {
        var DoorState;
        (function (DoorState) {
            DoorState[DoorState["Open"] = 0] = "Open";
            DoorState[DoorState["Closed"] = 1] = "Closed";
            DoorState[DoorState["Ajax"] = 7] = "Ajax";
        })(DoorState || (DoorState = {}));
        ;
        expect(DoorState.Open).toBe(0);
        expect(DoorState["Open"]).toBe(0);
        expect(DoorState[0]).toBe("Open");
        expect(DoorState["0"]).toBe("Open");
        expect(DoorState.Ajax).toBe(7);
    });
    it("Const Enums", function () {
        ;
        expect(0 /* Open */).toBe(0);
        expect(0 /* "Open" */).toBe(0);
        //expect(DoorState[0]).toBe("Open"); // it don't pass compile
        //expect(DoorState["0"]).toBe("Open"); // it don't pass compile
        expect(7 /* Ajax */).toBe(7);
    });
    it("Const value", function () {
        var constValue = "test";
        //constValue = "2"; // it don't pass compile
        expect(0).toBe(0);
    });
    it("let keyword", function () {
        expect(a).toBe(undefined);
        var a = 2;
        // expect(b).toBe(undefined); // it don't pass compile
        var b = 2;
        {
            // show block-scoped
            var b_1 = 20;
            expect(b_1).toBe(20);
        }
        expect(b).toBe(2);
    });
    it("Object key", function () {
        var copyMethods = {
            petite: { desc: 'Copy Missy to Petite' },
            woman: { desc: 'Copy Missy to Plus' },
            china: { desc: 'Copy Missy to China Market' },
            ongoing: { desc: 'Copy onging style' }
        };
        var r = Object.keys(copyMethods).map(function (value) { return copyMethods[value]; });
        expect(r.length).toBe(4);
    });
    it("Map", function () {
        var m = new Map();
        m.set('a', '1');
        m.set('b', '2');
        expect(m.size).toBe(2);
        expect(m.get('a')).toBe("1");
        //let r = m.forEach((value, key, map) => value);
    });
    it("Map<T>", function () {
        var copyMethods = {
            petite: { desc: 'Copy Missy to Petite' },
            woman: { desc: 'Copy Missy to Plus' },
            china: { desc: 'Copy Missy to China Market' },
            ongoing: { desc: 'Copy onging style' }
        };
        var r = Object.keys(copyMethods).map(function (value) { return copyMethods[value].desc; });
        expect(r.length).toBe(4);
        expect(r[1]).toBe(copyMethods['woman'].desc);
        expect(r[1]).toBe(copyMethods.woman.desc);
        copyMethods.newProp = { desc: "new prop" };
        r = Object.keys(copyMethods).map(function (value) { return copyMethods[value].desc; });
        expect(r.length).toBe(5);
        expect(r[4]).toBe(copyMethods['newProp'].desc);
        var map = function (m, cb) {
            return Object.keys(m).map(function (key, i) { return cb(m[key], i, m); });
        };
        var r2 = map(copyMethods, function (value) { return value.desc; });
        expect(r2.length).toBe(5);
        expect(r2[4]).toBe(copyMethods['newProp'].desc);
        var toMap = function (a, key) {
            var r = {};
            for (var _i = 0, a_2 = a; _i < a_2.length; _i++) {
                var t = a_2[_i];
                r[t[key]] = t;
            }
            return r;
        };
        ;
        var va = [
            { id: '1', value: 'v1' },
            { id: '2', value: 'v2' },
        ];
        var m = toMap(va, 'id');
        expect(m['2'].value).toBe('v2');
    });
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
//# sourceMappingURL=Types.js.map