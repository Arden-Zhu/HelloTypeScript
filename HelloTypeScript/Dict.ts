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

function toStr(d: Dict<IValue>): string {
    let s = DictHelper.map(d, v => v.id + v.value).join('');
    return s;
}

describe("Dict.ts", () => {
    it("IValue to Dict", () => {
        let a: IValue[] = [
            { id: 'z', value: '3', },
            { id: 'y', value: '4', },
            { id: 'x', value: '2', },
        ]

        let d = DictHelper.toValues(a);
        expect(toStr(d)).toBe('z3y4x2');
        d = DictHelper.remove(d, 'y');
        expect(toStr(d)).toBe('z3x2');
        d.y = { id: 'y', value: '5' };
        expect(toStr(d)).toBe('z3x2y5');

        let d2 = DictHelper.copy(d);
        expect(toStr(d2)).toBe('z3x2y5');

        d2.y2 = { id: 'y2', value: '6' };
        expect(toStr(d2)).toBe('z3x2y5y26');
    });

    it("IValue to Dict Sort 2", () => {
        let a: IValue[] = [
            { id: '1', value: '1', },
            { id: '3', value: '3', },
            { id: '2', value: '2', },
        ]

        let d = DictHelper.toValues(a);
        expect(toStr(d)).toBe('112233');
        //d = DictHelper.remove(d, 'y');
        //expect(toStr(d)).toBe('z3x2');
        //d.y = { id: 'y', value: '5' };
        //expect(toStr(d)).toBe('z3x2y5');

        //let d2 = DictHelper.copy(d);
        //expect(toStr(d2)).toBe('z3x2y5');

        //d2.y2 = { id: 'y2', value: '6' };
        //expect(toStr(d2)).toBe('z3x2y5y26');
    });

});