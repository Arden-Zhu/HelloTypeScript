﻿describe("Types.ts", () => {
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
        item1 = { b: 2 };
        expect(1).toBe(1);
    });

    it("Explicit casting", () => {
        var item1 = <any>{ id: 1, name: "item 1" };
        item1 = { id: 2 };
        expect(1).toBe(1);
    });


});


