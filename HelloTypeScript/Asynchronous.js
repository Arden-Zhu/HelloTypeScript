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
    // test Promise
    beforeEach(function (done) {
        indicator = 1;
        console.log("calling delayedPromise");
        indicator += 3;
        delayedPromise().then(function () {
            console.log("delayedPromise.then()");
            indicator *= 3;
            done();
        });
    });
    it("Using promises", function (done) {
        expect(indicator).toBe(12);
        done();
    });
    it("", function () {
    });
    it("", function () {
    });
    it("", function () {
    });
    it("", function () {
    });
});
//# sourceMappingURL=Asynchronous.js.map