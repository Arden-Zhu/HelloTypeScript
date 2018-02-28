describe("GlobalVariables.ts", () => {
    it("Global variables", () => {
        expect(CONTACT_EMAIL_ARRAY.length).toBe(3); // it could not compile before adding global.d.ts
    });
});

