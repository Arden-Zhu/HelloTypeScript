﻿// see ErrorHelper.js & ErrorHelper.d.ts
describe("DeclarationFile.ts", () => {
    it("should passed", () => {
        ErrorHelper.containsErrors({
            responseText: {
                failure: true,
                errorMessage: "ddd",
            }
        });

        expect(1).toBe(1);
    });
});

