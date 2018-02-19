describe("Interfaces.ts ", () => {
    it("interface", () => {
        interface IComp {
            id: number,
            name : string,
        };

        let c: IComp;
        c = { id: 2, name: "test" };
        //c = { id: 2 }; // it cannot pass
        //c = { id: 2, name: "test", others: "" }; // it cannot pass too
        
        expect(c.id).toBe(2);
    });

    it("Optional properties", () => {
        interface IOptional {
            id: number,
            name? : string,
        };

        let c: IOptional = { id: 2, name: "test" };
        c = { id: 3 }
        expect(c.name).toBe(undefined);
    })
});

