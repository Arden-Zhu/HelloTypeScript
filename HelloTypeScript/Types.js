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
        item1 = { b: 2 };
        expect(1).toBe(1);
    });
    it("Explicit casting", function () {
        var item1 = { id: 1, name: "item 1" };
        item1 = { id: 2 };
        expect(1).toBe(1);
    });
});
//# sourceMappingURL=Types.js.map