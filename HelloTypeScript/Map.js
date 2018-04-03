describe("Map.ts", function () {
    function toStr(m) {
        var s = '';
        m.forEach(function (value, key) {
            s += key + value;
        });
        return s;
    }
    it("Map sort", function () {
        var a = [
            ['1', '1',],
            ['3', '3',],
            ['2', '2',],
            ['2', '4',],
            ['1', '5',],
        ];
        var d = new Map(a);
        expect(toStr(d)).toBe('153324');
    });
});
//# sourceMappingURL=Map.js.map