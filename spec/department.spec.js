const {Department, Developer, Designer, Manager} = require('../src/department');

describe('Department', function () {
    let Dep;
    let Joel;
    let Aaren;
    let Ricardo;
    beforeEach(function () {
        Dep = new Department();
        Joel = new Designer('Joel', 'Birch', 600, 10, 1);
        Ricardo = new Developer('Ricardo', 'Milos', 300, 1);
        Aaren = new Manager('Aaren', 'Stringer', 500, 3, Joel,  Ricardo);
        Dep.addManagers(Aaren);
        Aaren.leadEmployees();
    });
    it('addManagers works', function () {
        expect(Dep.managersList.length).toEqual(1);
    });
    it('Give salary method works', function () {
        spyOn(Ricardo, 'countSalary').and.callThrough();
        Dep.giveSalary();
        expect(Ricardo.countSalary).toHaveBeenCalled();
    });
});

describe('Employee', function () {
    let Joel;
    let Ricardo;
    let Aaren;
    beforeEach(function () {
        Ricardo = new Developer('Ricardo', 'Milos', 300, 1);
        Joel = new Designer('Joel', 'Birch', 600, 10, 1);
        Aaren = new Manager('Aaren', 'Stringer', 500, 3, Joel, Ricardo);
        Aaren.leadEmployees();
    });
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

