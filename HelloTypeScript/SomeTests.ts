describe("tests/SomeTests.ts ", () => {
    it("should passed", () => {
        let undefinedValue="test6";
        expect(undefinedValue).toBe("test6");
    });

    it("true or false", () => {
        let b: boolean = false;
        let colors: string[] = [];
        if (colors.length > 0)
            b = true;
        expect(b).toBe(false);

        if (colors)
            b = true;
        expect(b).toBe(true);

    })
});

