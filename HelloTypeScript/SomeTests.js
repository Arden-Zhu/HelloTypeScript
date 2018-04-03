describe("tests/SomeTests.ts ", function () {
    it("should passed", function () {
        var undefinedValue = "test6";
        expect(undefinedValue).toBe("test6");
    });
    it("true or false", function () {
        var b = false;
        var colors = [];
        if (colors.length > 0)
            b = true;
        expect(b).toBe(false);
        if (colors)
            b = true;
        expect(b).toBe(true);
    });
});
//# sourceMappingURL=SomeTests.js.map