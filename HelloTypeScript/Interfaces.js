describe("Interfaces.ts ", function () {
    it("interface", function () {
        ;
        var c;
        c = { id: 2, name: "test" };
        //c = { id: 2 }; // it cannot pass
        //c = { id: 2, name: "test", others: "" }; // it cannot pass too
        expect(c.id).toBe(2);
    });
    it("Optional properties", function () {
        ;
        var c = { id: 2, name: "test" };
        c = { id: 3 };
        expect(c.name).toBe(undefined);
    });
});
//# sourceMappingURL=Interfaces.js.map