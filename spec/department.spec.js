const {Department, Developer, Designer, Manager} = require('../src/department');

describe('Department', function () {
    beforeEach(function () {
        this.Dep = new Department();
        this.Joel = new Designer('Joel', 'Birch', 600, 10, 1);
        this.Ricardo = new Developer('Ricardo', 'Milos', 300, 1);
        this.Aaren = new Manager('Aaren', 'Stringer', 500, 3, this.Joel,  this.Ricardo);
        this.Dep.addManagers(this.Aaren);
        this.Aaren.leadEmployees();
    });
    it('addManagers works', function () {
        expect(this.Dep.managersList.length).toEqual(1);
    });
    it('Give salary method works', function () {
        spyOn(this.Ricardo, 'countSalary').and.callThrough();
        this.Dep.giveSalary();
        expect(this.Ricardo.countSalary).toHaveBeenCalled();
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

