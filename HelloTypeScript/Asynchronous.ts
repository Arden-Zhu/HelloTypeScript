describe("Asynchronous.ts", () => {
    let indicator: number = 1;

    // declare the Promise
    function delayedPromise(): Promise<void> {
        return new Promise<void> // to make it compiled, I add "lib" : [ "dom", "es2015", "es5"] into tsconfig.json
        (
            (resolve: () => void,
                reject: () => void
            ) => {
                function afterTimeout() {
                    resolve();
                }

                setTimeout(afterTimeout, 100);
            }
        );
    }

    // test Promise
    beforeEach((done) => {
        indicator = 1;

        console.log(`calling delayedPromise`);
        indicator += 3;
        delayedPromise().then(
            () => {
                console.log(`delayedPromise.then()`);
                indicator *= 3;
                done();
            }
        );
    });

    it("Using promises", (done) => {
        expect(indicator).toBe(12);
        done();
    });

    it("", () => {
    });

    it("", () => {
    });


    it("", () => {
    });

    it("", () => {
    });

});

