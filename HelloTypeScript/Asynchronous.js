var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// it is a little complex
describe("Asynchronous.ts", function () {
    var indicator = 1;
    // declare the Promise
    function delayedPromise() {
        return new Promise(function (resolve, reject) {
            function afterTimeout() {
                resolve();
            }
            setTimeout(afterTimeout, 100);
        });
    }
    function errorPromise() {
        return new Promise(function (resolve, reject) {
            reject();
        });
    }
    // test Promise
    beforeEach(function (done) {
        indicator = 1;
        var step = 2;
        console.log("calling delayedPromise");
        indicator += 3;
        delayedPromise().then(function () {
            console.log("delayedPromise.then()");
            indicator *= 3;
            if (--step <= 0)
                done(); // call done() to indicate that it is ready to run testing
        });
        errorPromise().catch(function () {
            indicator *= 3;
            if (--step <= 0)
                done();
        });
    });
    it("Using promises", function (done) {
        expect(indicator).toBe(36);
        done();
    });
});
describe("Asynchronous.ts_2", function () {
    var message = "";
    function promiseWithReturned() {
        return new Promise(function (resolve, reject) {
            resolve({ message: "success" });
        });
    }
    beforeEach(function (done) {
        message = "";
        var step = 1;
        promiseWithReturned().then(function (msg) {
            message = msg.message;
            if (--step <= 0)
                done(); // call done() to indicate that it is ready to run testing
        });
    });
    it("Promise with returned value", function (done) {
        expect(message).toBe("success");
        done();
    });
});
// to show the usage of await async
describe("Asynchronous.ts_3", function () {
    var message = "";
    var message2 = "";
    function promiseWithReturned(b) {
        return new Promise(function (resolve, reject) {
            if (b)
                resolve("success");
            else
                reject("fail");
        });
    }
    beforeEach(function (done) { return __awaiter(_this, void 0, void 0, function () {
        var step, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = message2 = "";
                    step = 1;
                    return [4 /*yield*/, promiseWithReturned(true)];
                case 1:
                    message = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, promiseWithReturned(false)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    message2 = error_1;
                    return [3 /*break*/, 5];
                case 5:
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Promise with returned value", function (done) {
        expect(message).toBe("success");
        expect(message2).toBe("fail");
        done();
    });
});
//# sourceMappingURL=Asynchronous.js.map