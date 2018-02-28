describe("GlobalVariables.ts", function () {
    it("Global variables", function () {
        expect(CONTACT_EMAIL_ARRAY.length).toBe(3); // it could not compile before adding global.d.ts
    });
});
//# sourceMappingURL=GlobalVariables.js.map