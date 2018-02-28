describe("Generics.ts", function () {
    it("Generic syntax", function () {
        var Concatenator = /** @class */ (function () {
            function Concatenator() {
            }
            Concatenator.prototype.concatenateArray = function (inputArray) {
                var returnString = "";
                for (var i = 0; i < inputArray.length; i++) {
                    if (i > 0)
                        returnString += ",";
                    returnString += inputArray[i].toString();
                }
                return returnString;
            };
            return Concatenator;
        }());
        var stringConcat = new Concatenator();
        var numberConcat = new Concatenator();
        var stringArray = ["first", "second", "third"];
        expect(stringConcat.concatenateArray(stringArray)).toBe("first,second,third");
        expect(numberConcat.concatenateArray([1, 2, 3])).toBe("1,2,3");
    });
    it("Constraining the type of T", function () {
        var Base = /** @class */ (function () {
            function Base(id) {
                this.id = id;
            }
            return Base;
        }());
        // constraint the type of T
        var Comparer = /** @class */ (function () {
            function Comparer() {
            }
            Comparer.prototype.isEqual = function (a, b) {
                return a.id === b.id;
            };
            return Comparer;
        }());
        var a = new Base(1);
        var b = new Base(2);
        // create with class
        var comparer = new Comparer();
        expect(comparer.isEqual(a, b)).toBe(false);
        var c2 = new Comparer(); // create with IBase
        expect(c2.isEqual(a, b)).toBe(false);
    });
    it("Creating new objects within generics", function () {
        var FirstClass = /** @class */ (function () {
            function FirstClass() {
            }
            return FirstClass;
        }());
        var SecondClass = /** @class */ (function () {
            function SecondClass() {
            }
            return SecondClass;
        }());
        /* it does not work
        class GenericCreator<T> {
            create(): T {
                return new T();
            }
        }
        */
        var GenericCreator = /** @class */ (function () {
            function GenericCreator() {
            }
            GenericCreator.prototype.create = function (arg1) {
                return new arg1();
            };
            return GenericCreator;
        }());
        var creator1 = new GenericCreator();
        var firstClass = creator1.create(FirstClass);
        var creator2 = new GenericCreator();
        var secondClass = creator2.create(SecondClass);
        expect(typeof (firstClass)).toBe("object");
    });
    it("", function () {
    });
    it("", function () {
    });
    it("", function () {
    });
});
//# sourceMappingURL=Generics.js.map