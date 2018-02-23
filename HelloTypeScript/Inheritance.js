var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
describe("Inheritance.ts", function () {
    it("Interface inheritance", function () {
        var InterfaceInheritanceClass = /** @class */ (function () {
            function InterfaceInheritanceClass() {
            }
            return InterfaceInheritanceClass;
        }());
        var c = new InterfaceInheritanceClass();
        expect(c.id).toBe(undefined);
        expect(c.name).toBe(undefined);
    });
    it("Class inheritance", function () {
        var BaseClass = /** @class */ (function () {
            function BaseClass() {
            }
            return BaseClass;
        }());
        var DerivedFromBaseClass = /** @class */ (function (_super) {
            __extends(DerivedFromBaseClass, _super);
            function DerivedFromBaseClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DerivedFromBaseClass;
        }(BaseClass));
        var c = new DerivedFromBaseClass();
        expect(c.id).toBe(undefined);
        expect(c.name).toBe(undefined);
    });
    it("The super keyword & function overloading", function () {
        var BaseClassWithConstructor = /** @class */ (function () {
            function BaseClassWithConstructor(_id) {
                this.id = _id;
            }
            BaseClassWithConstructor.prototype.getDump = function () {
                return "id = " + this.id + ";";
            };
            return BaseClassWithConstructor;
        }());
        var DerivedClassWithConstructor = /** @class */ (function (_super) {
            __extends(DerivedClassWithConstructor, _super);
            function DerivedClassWithConstructor(_id, _name) {
                var _this = _super.call(this, _id) || this;
                _this.name = _name;
                return _this;
            }
            DerivedClassWithConstructor.prototype.getDump = function () {
                //return super() + `name = ${this.name};`; // super() can be only in constructor
                return _super.prototype.getDump.call(this) + ("name = " + this.name + ";");
            };
            return DerivedClassWithConstructor;
        }(BaseClassWithConstructor));
        var c = new DerivedClassWithConstructor(1, 'a');
        expect(c.getDump()).toBe("id = 1;name = a;");
    });
    it("Protected class members", function () {
        var ClassUsingProtected = /** @class */ (function () {
            function ClassUsingProtected(id) {
                this.id = id;
            }
            return ClassUsingProtected;
        }());
        var DerivedFromProtected = /** @class */ (function (_super) {
            __extends(DerivedFromProtected, _super);
            // it shows that I can write in this way to declare properties and init them
            // Note the public accessor, it is required to write here
            function DerivedFromProtected(id, name) {
                var _this = _super.call(this, id) || this;
                _this.name = name;
                return _this;
            }
            DerivedFromProtected.prototype.getId = function () {
                return this.id;
            };
            return DerivedFromProtected;
        }(ClassUsingProtected));
        var c = new DerivedFromProtected(10, 'a');
        expect(c.getId()).toBe(10);
        expect(c.name).toBe("a");
        // derivedFromProtected.id = 1; // it can not pass because id is a protected property
    });
    it("Abstract classes", function () {
        var AbstractEmployee = /** @class */ (function () {
            function AbstractEmployee() {
            }
            AbstractEmployee.prototype.printDetails = function () {
                console.log(this.getDetails());
            };
            return AbstractEmployee;
        }());
        var NewEmployee = /** @class */ (function (_super) {
            __extends(NewEmployee, _super);
            function NewEmployee() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            NewEmployee.prototype.getDetails = function () {
                return "id : " + this.id + ", name : " + this.name;
            };
            return NewEmployee;
        }(AbstractEmployee));
        var NewManager = /** @class */ (function (_super) {
            __extends(NewManager, _super);
            function NewManager() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            NewManager.prototype.getDetails = function () {
                return _super.prototype.getDetails.call(this)
                    + (", employeeCount " + this.Employees.length);
            };
            return NewManager;
        }(NewEmployee));
        var employee = new NewEmployee();
        employee.id = 1;
        employee.name = "Employee Name";
        expect(employee.getDetails()).toBe("id : 1, name : Employee Name");
        var manager = new NewManager();
        manager.id = 2;
        manager.name = "Manager Name";
        manager.Employees = new Array();
        // it shows polymorphic
        expect(manager.getDetails()).toBe("id : 2, name : Manager Name, employeeCount 0");
    });
});
//# sourceMappingURL=Inheritance.js.map