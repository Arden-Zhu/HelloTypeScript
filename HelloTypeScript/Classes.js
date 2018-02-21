var FirstNameSpace;
(function (FirstNameSpace) {
    var NotExported = /** @class */ (function () {
        function NotExported() {
        }
        return NotExported;
    }());
    var NameSpaceClass = /** @class */ (function () {
        function NameSpaceClass() {
        }
        return NameSpaceClass;
    }());
    FirstNameSpace.NameSpaceClass = NameSpaceClass;
})(FirstNameSpace || (FirstNameSpace = {}));
;
describe("Classes.ts", function () {
    it("Classes & Class Properties", function () {
        var Simple = /** @class */ (function () {
            function Simple() {
            }
            Simple.prototype.getId = function () {
                return this.id;
            };
            return Simple;
        }());
        var simple = new Simple();
        simple.id = 100;
        expect(simple.getId()).toBe(100);
    });
    it("Implementing Interfaces", function () {
        ;
        var SimpleA = /** @class */ (function () {
            function SimpleA() {
            }
            SimpleA.prototype.getClassName = function () {
                return "SimpleA";
            };
            ;
            SimpleA.prototype.newFunction = function () {
                // it shows that class can have new function against interface
            };
            ;
            return SimpleA;
        }());
        var SimpleB = /** @class */ (function () {
            function SimpleB() {
            }
            SimpleB.prototype.getClassName = function () {
                return "SimpleB";
            };
            ;
            SimpleB.prototype.other = function () {
                return 10;
            };
            return SimpleB;
        }());
        var simple = new SimpleA();
        expect(simple.getClassName()).toBe("SimpleA");
        simple = new SimpleB();
        expect(simple.getClassName()).toBe("SimpleB");
        var simpleB = simple; // type cast
        expect(simpleB.other()).toBe(10);
    });
    it("Constructor", function () {
        var Simple = /** @class */ (function () {
            function Simple(_id) {
                this.id = _id;
            }
            Simple.prototype.getId = function () {
                return this.id;
            };
            return Simple;
        }());
        var simple = new Simple(100);
        expect(simple.getId()).toBe(100);
    });
    it("Class functions & Interface function definitions", function () {
        var ComplexType = /** @class */ (function () {
            function ComplexType(idArg, nameArg) {
                this.id = idArg;
                this.name = nameArg;
            }
            ComplexType.prototype.print = function () {
                return "id:" + this.id + " name:" + this.name;
            };
            ComplexType.prototype.usingTheAnyKeyword = function (arg1) {
                this.id = arg1;
            };
            ComplexType.prototype.usingOptionalParameters = function (optionalArg1) {
                if (optionalArg1) {
                    this.id = optionalArg1;
                }
            };
            ComplexType.prototype.usingDefaultParameters = function (defaultArg1) {
                if (defaultArg1 === void 0) { defaultArg1 = 0; }
                this.id = defaultArg1;
            };
            ComplexType.prototype.usingRestSyntax = function () {
                var argArray = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    argArray[_i] = arguments[_i];
                }
                if (argArray.length > 0) {
                    this.id = argArray[0];
                }
            };
            ComplexType.prototype.usingFunctionCallbacks = function (callback) {
                callback(this.id);
            };
            return ComplexType;
        }());
        var c = new ComplexType(1, "a");
        expect(c.print()).toBe("id:1 name:a");
        c = new ComplexType("2", "b");
        expect(c.print()).toBe("id:2 name:b");
        /*
            it shows that type checking is only running on compile time,
            NOT on running time, which making it completely different from C#
            So, I think, it is MUST to have type guard in overload functions/constructor
        */
        c = new ComplexType("c", "c");
        expect(c.print()).toBe("id:c name:c");
    });
    it("Class modifiers", function () {
        var ClassWithPrivateProperty = /** @class */ (function () {
            function ClassWithPrivateProperty(_id, _name) {
                this.id = _id;
                this.name = _name;
            }
            ClassWithPrivateProperty.prototype.getId = function () {
                return this.id;
            };
            return ClassWithPrivateProperty;
        }());
        var privateAccess = new ClassWithPrivateProperty(10, "test");
        privateAccess.name = "overrided";
        // privateAccess.id = 20;  // it NOT passes compiling
        expect(privateAccess.getId()).toBe(10);
        expect(privateAccess.name).toBe("overrided");
    });
    it("Constructor access modifiers", function () {
        var ClassWithPrivateProperty = /** @class */ (function () {
            // constrcutor access modifiers are handy, but some developer may NOT like it
            function ClassWithPrivateProperty(id, name) {
                this.id = id;
                this.name = name;
            }
            ClassWithPrivateProperty.prototype.getId = function () {
                return this.id;
            };
            return ClassWithPrivateProperty;
        }());
        var privateAccess = new ClassWithPrivateProperty(10, "test");
        privateAccess.name = "overrided";
        // privateAccess.id = 20;  // it NOT passes compiling
        expect(privateAccess.getId()).toBe(10);
        expect(privateAccess.name).toBe("overrided");
    });
    it("Readonly Properties", function () {
        var ClassWithReadOnly = /** @class */ (function () {
            //readonly name: string;
            function ClassWithReadOnly(name) {
                this.name = name;
                //this.name = _name;
            }
            ClassWithReadOnly.prototype.getName = function () {
                return this.name;
            };
            ;
            ClassWithReadOnly.prototype.setReadOnly = function (_name) {
                //this.name = _name; // generates a compile error 
            };
            ;
            return ClassWithReadOnly;
        }());
        var c = new ClassWithReadOnly("test");
        expect(c.getName()).toBe("test");
    });
    it("Class Property accessors", function () {
        // supported only after ECMAScript 5
        var ClassWithAccessors = /** @class */ (function () {
            function ClassWithAccessors() {
            }
            Object.defineProperty(ClassWithAccessors.prototype, "id", {
                get: function () {
                    console.log("inside get id()");
                    return this._id;
                },
                set: function (value) {
                    console.log("inside set id()");
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });
            return ClassWithAccessors;
        }());
        var c = new ClassWithAccessors();
        c.id = 2;
        expect(c.id).toBe(2);
    });
    it("Static functions/properties", function () {
        var Simple = /** @class */ (function () {
            function Simple() {
            }
            Simple.getId = function () {
                return this.id;
            };
            Simple.prototype.getStaticId = function () {
                return Simple.id;
            };
            return Simple;
        }());
        Simple.id = 100;
        expect(Simple.getId()).toBe(100);
        expect(new Simple().getStaticId()).toBe(100);
    });
    it("Namespaces", function () {
        //namespace FirstNameSpace { // it is NOT allowed to write namespace inside function
        //    class NotExported {
        //    }
        //    export class NameSpaceClass {
        //        id: number;
        //    }
        //} 
        var firstNameSpace = new FirstNameSpace.NameSpaceClass();
        //let notExported = new FirstNameSpace.NotExported(); // it NOT passed compiling
        expect(1).toBe(1);
    });
});
//# sourceMappingURL=Classes.js.map