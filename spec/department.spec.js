
import {Developer, Employee, Designer, Manager, Department} from 'department';

describe("Developer", function() {
    it("Developer salary didn't change", function() {
        const Matthew = new Developer('Matthew', 'Tuck', 300, 3);
        expect(Matthew).toEqual({firstName:'Matthew', secondName:'Tuck', salary: 300, experience: 3})
    });
    it("Developer bonus is right", function() {
        const Matthew = new Developer('Matthew', 'Tuck', 300, 3);
        expect(Matthew.countSalary()).toEqual(500);
    });
});

describe("Designer", function() {
    it("Designer salary didn't change", function() {
        const Matthew = new Designer('Matthew', 'Tuck', 300, 3);
        expect(Matthew).toEqual({firstName:'Matthew', secondName:'Tuck', salary: 300, experience: 3})
    });
    it("Designer bonus is right", function() {
        const Matthew = new Designer('Matthew', 'Tuck', 300, 3);
        expect(Matthew.countSalary()).toEqual(500);
    });
});
