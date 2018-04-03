describe("Map.ts", () => {
    function toStr(m: Map<number, string>): string {
        let s: string = '';

        m.forEach((value, key) => {
            s += key+value;
        });
        return s;
    }

    it("Map sort", () => {

        let a: any[] = [
            [1, '1', ],
            [3, '3',],
            [2, '2', ],
            [2, '4',],
            [1, '5',],
        ]

        let d = new Map<number, string>(a);
        
        expect(toStr(d)).toBe('153324');
        //d['2'] = '6';
        d.set(2, '6');
        
        expect(toStr(d)).toBe('153326');
    });

    class Dict<T> extends Map<number, T> {
        map<R>(cb: (value: T, index: number, key: number, m: Dict<T>) => R): R[] {
            let idx: number = 0;
            let r: R[] = [];
            this.forEach((value, key) => {
                r.push(cb(value, idx++, key, this));
            });
            return r;
        }

        static fromArray<T, K extends keyof T>(arr: T[], key: K): Dict<T> {
            let r = new Dict<T>();
            for (let a of arr)
                r.set(Number(a[key]), a);
            return r;
        }
    }

    interface IValue {
        id: string
        value: string;
        pid?: string;
    }

    class DictHelper {

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

});