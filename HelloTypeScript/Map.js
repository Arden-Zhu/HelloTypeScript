var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            [1, '1',],
            [3, '3',],
            [2, '2',],
            [2, '4',],
            [1, '5',],
        ];
        var d = new Map(a);
        expect(toStr(d)).toBe('153324');
        //d['2'] = '6';
        d.set(2, '6');
        expect(toStr(d)).toBe('153326');
    });
    var Dict = /** @class */ (function (_super) {
        __extends(Dict, _super);
        function Dict() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Dict;
    }(Map));
});
//# sourceMappingURL=Map.js.map