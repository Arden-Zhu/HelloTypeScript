// see ErrorHelper.js & ErrorHelper.d.ts
describe("DeclarationFile.ts", function () {
    it("should passed", function () {
        ErrorHelper.containsErrors({
            responseText: {
                failure: true,
                errorMessage: "ddd",
            }
        });
        expect(1).toBe(1);
    });
});
//# sourceMappingURL=DeclarationFile.js.map