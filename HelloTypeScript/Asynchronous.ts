// it is a little complex
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

    function errorPromise(): Promise<void> {
        return new Promise<void>
            (
            (resolve: () => void,
                reject: () => void
            ) => {
                reject();
            }
            );
    } 

    // test Promise
    beforeEach((done) => {
        indicator = 1;
        let step = 2;

        console.log(`calling delayedPromise`);
        indicator += 3;
        delayedPromise().then(
            () => {
                console.log(`delayedPromise.then()`);
                indicator *= 3;
                if (--step <= 0)
                    done(); // call done() to indicate that it is ready to run testing
            }
        );

        errorPromise().catch(() => {
            indicator *= 3;
            if (--step <= 0)
                done();
        });
    });

    it("Using promises", (done) => {
        expect(indicator).toBe(36);
        done();
    });
});

describe("Asynchronous.ts_2", () => {
    let message = "";

    interface IMessage {
        message: string;
    }

    // define an alias
    type ActionWithMessage = (msg: IMessage) => void;

    function promiseWithReturned(): Promise<IMessage> {
        return new Promise<IMessage>
            ((resolve: ActionWithMessage, reject: ActionWithMessage) => {
                resolve({ message: "success" });
            })
    }

    beforeEach((done) => {
        message = "";
        let step = 1;

        promiseWithReturned().then(
            (msg) => {
                message = msg.message;
                if (--step <= 0)
                    done(); // call done() to indicate that it is ready to run testing
            }
        );

    });

    it("Promise with returned value", (done) => {
        expect(message).toBe("success");
        done();
    });

});