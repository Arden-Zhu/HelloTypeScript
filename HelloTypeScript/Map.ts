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

    interface IValue {
        id: number
        value: string;
    }

    class Dict<T extends IValue> {
        private _map: Map<number, T>;
        constructor() {
            this._map = new Map<number, T>();
        }

        static fromArray<T extends IValue>(arr: T[]): Dict<T> {
            let r = new Dict<T>();
            for (let a of arr) {
                r._map.set(a.id, a);
            }
            return r;
        }

        map<R>(cb: (value: T, id: number, index: number, m: Dict<T>) => R): R[] {
            let idx: number = 0;
            let r: R[] = [];
            this._map.forEach((value, id) => {
                r.push(cb(value, id, idx++, this));
            });
            return r;
        }

        get(id: number): T {
            return this._map[id];
        }

        has(id: number): boolean {
            return this._map[id];
        }

        keys(): number[] {
            return this.map((value, id) => id);
        }

        size(): number {
            return this._map.size;
        }

        clone(): Dict<T> {
            let r = new Dict<T>();
            this._map.forEach((value, key) => {
                r._map.set(key, value);
            })
            return r;
        }

        update(value: T): Dict<T> {
            let r = this.clone();
            r._map.set(value.id, value);
            return r;
        }

        remove(id: number): Dict<T> {
            let r = this.clone();
            r._map.delete(id);
            return r;
        }

        updateBatch(values: Map<number, T>) : Dict<T> {
            let r = new Dict<T>();
            this._map.forEach((oldValue, key) => {
                r._map.set(key, values.has(key) ? values[key] : oldValue);
            })
            return r;
        }

        where(predict: (value: T) => boolean): Dict<T> {
            let r = new Dict<T>();
            this._map.forEach((value, key) => {
                if (predict(value))
                    r._map.set(key, value);
            })
            return r;
        }
    }

    

});