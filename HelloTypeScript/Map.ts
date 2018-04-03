describe("Map.ts", () => {
    function toStr(m: Map<string, string>): string {
        let s: string = '';

        m.forEach((value, key) => {
            s += key+value;
        });
        return s;
    }

    it("Map sort", () => {

        let a: any[] = [
            ['1', '1', ],
            ['3', '3',],
            ['2', '2', ],
            ['2', '4',],
            ['1', '5',],
        ]

        let d = new Map<string, string>(a);

        expect(toStr(d)).toBe('153324');
    });

});