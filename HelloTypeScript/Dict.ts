class Dict<T> {
    [key: string]: T,
}

interface IValue {
    id: string
    value: string;
    pid?: string;
}

class DictHelper {
    static map<T, R>(m: Dict<T>, cb: (value: T, index: number, key: string, m: Dict<T>) => R): R[] {
        return Object.keys(m).map((key, i) => cb(m[key], i, key, m));
    };

    static toDict<T, K extends keyof T>(a: T[], key: K): Dict<T> {
        let r: Dict<T> = {}
        for (var t of a) {
            r[t[key].toString()] = t;
        }
        return r;
    }

    static toValues(a: IValue[]): Dict<IValue> {
        return this.toDict(a, "id");
    }

    static mapValues<R>(m: Dict<IValue>, cb: (value: string, id: string) => R): R[] {
        return Object.keys(m).map((id) => cb(m[id].value, id));
    }

    // a shallow copy
    static copy<T>(source: Dict<T>): Dict<T> {
        let r: Dict<T> = {};
        for (var k of Object.keys(source)) {
            r[k] = source[k];
        }
        return r;
    }

    static update<T extends IValue>(source: Dict<T>, t: T): Dict<T> {
        let r: Dict<T> = {}
        for (var k of Object.keys(source)) {
            r[k] = (k !== t.id) ? source[k] : t;
        }
        return r;
    }

    static remove<T extends IValue>(source: Dict<T>, id: string): Dict<T> {
        let r: Dict<T> = {}
        for (var k of Object.keys(source)) {
            if (k !== id)
                r[k] = source[k];
        }
        return r;
    }
}

describe("Dict.ts", () => {
    it("duck typing", () => {
        var complex1 = { id: 1, name: "name" };
        var complex2 = { name: "name", id: 1 };
        expect(complex1).toEqual(complex2);
        expect(complex1).not.toBe(complex2);
        expect(complex1).not.toBe({ id: 1, name: "name" });
        complex2 = complex1;
        expect(complex1).toBe(complex2);
    });
});