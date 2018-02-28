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
//# sourceMappingURL=Asynchronous.js.map