const EXPORT = require('../src/department');

const Department = EXPORT.Department;
const Developer = EXPORT.Developer;
const Designer = EXPORT.Designer;
const Manager = EXPORT.Manager;

const Dep = new Department();
const Joel = new Designer('Joel', 'Birch', 600, 10, 1);
const Ricardo = new Developer('Ricardo', 'Milos', 300, 1);
const Aaren = new Manager('Aaren', 'Stringer', 500, 3, Joel, Ricardo);
Dep.addManagers(Aaren);
Aaren.leadEmployees();


describe('Department', function () {
    it('addManagers works', function () {
        expect(Dep.managersList.length).toEqual(1);
    });
    it('Give salary method works', function () {
        spyOn(Joel, 'countSalary');
        Dep.giveSalary();
        expect(Joel.countSalary).toHaveBeenCalled();
    });
});

describe('Employee', function () {
    it('toString works', function () {
        expect(Joel.toString()).toEqual('Joel Birch, manager: Stringer, experience: 10')
    });
    it('leadEmployee works', function () {
        expect(Ricardo.hasOwnProperty('manager')).toEqual(true);
    });
    it('countSalary works', function () {
        expect(Joel.countSalary()).toEqual(1220)
    });
});

