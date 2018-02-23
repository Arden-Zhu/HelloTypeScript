describe("Inheritance.ts", () => {
    it("Interface inheritance", () => {
        interface IBase {
            id: number;
        }

        interface IDerivedFromBase extends IBase {
            name: string;
        }

        class InterfaceInheritanceClass implements
            IDerivedFromBase {
            id: number;
            name: string;
        } 

        let c = new InterfaceInheritanceClass();
        expect(c.id).toBe(undefined);
        expect(c.name).toBe(undefined);
    });

    it("Class inheritance", () => {
        interface IBase {
            id: number;
        }

        interface IDerivedFromBase extends IBase {
            name: string;
        }

        class BaseClass implements IBase {
            id: number;
        }

        class DerivedFromBaseClass extends BaseClass
            implements IBase, IDerivedFromBase { // Notes that the class extends the base class and implements 2 interfaces
            name: string;
        } 

        let c = new DerivedFromBaseClass();
        expect(c.id).toBe(undefined);
        expect(c.name).toBe(undefined);
    });

    it("The super keyword & function overloading", () => {
        class BaseClassWithConstructor {
            private id: number;
            constructor(_id: number) {
                this.id = _id;
            }

            getDump(): string {
                return `id = ${this.id};`;
            }
        }

        class DerivedClassWithConstructor extends
            BaseClassWithConstructor {
            private name: string;
            constructor(_id: number, _name: string) {
                super(_id);
                this.name = _name;
            }
            getDump(): string {
                //return super() + `name = ${this.name};`; // super() can be only in constructor
                return super.getDump() + `name = ${this.name};`
            }
        } 

        let c = new DerivedClassWithConstructor(1, 'a');
        expect(c.getDump()).toBe("id = 1;name = a;");
    });

    it("Protected class members", () => {
        class ClassUsingProtected {
            constructor(protected id: number) {

            }
        }

        class DerivedFromProtected extends
            ClassUsingProtected {
            // it shows that I can write in this way to declare properties and init them
            // Note the public accessor, it is required to write here
            constructor(id: number, public name: string) { 
                super(id);
            }

            public getId() {
                return this.id;
            }
        } 

        var c = new DerivedFromProtected(10, 'a');
        expect(c.getId()).toBe(10);
        expect(c.name).toBe("a");
        // derivedFromProtected.id = 1; // it can not pass because id is a protected property
    });

    it("Abstract classes", () => {
        abstract class AbstractEmployee { // abstract class
            public id: number;
            public name: string;
            abstract getDetails(): string; // abstract function
            public printDetails() {
                console.log(this.getDetails());
            }
        }

        class NewEmployee extends AbstractEmployee {
            getDetails(): string {
                return `id : ${this.id}, name : ${this.name}`;
            }
        }

        class NewManager extends NewEmployee {
            public Employees: NewEmployee[];
            getDetails(): string {
                return super.getDetails()
                    + `, employeeCount ${this.Employees.length}`;
            }
        } 

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

