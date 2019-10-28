class Department {
    managersList = [];
    giveSalary() {
        this.managersList.forEach(manager => {
            const firstName = manager.firstName;
            const lastName = manager.lastName;
            const salary = manager.countSalary();
            console.log(`Manager - ${firstName} ${lastName}: got salary: ${salary}$`);
            manager.devList.forEach(developer => {
                const firstName = developer.firstName;
                const lastName = developer.lastName;
                const salary = developer.countSalary();
                console.log(`Developer - ${firstName} ${lastName}: got salary: ${salary}$`);
            })
        });
    };
    addManagers(...managers) {
        this.managersList.push(...managers);
    }
}


class Employee{
    constructor(firstName, lastName, salary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.experience = experience;
    }
    countSalary() {
        let bonus = this.salary;
        this.experience > 2 && this.experience < 5 ? bonus += 200: bonus;
        this.experience > 5 ? bonus = (bonus * 1.2) + 500 : bonus;
        return bonus.toFixed(2);
    }
    toString() {
       return `${this.firstName} ${this.lastName}, manager: ${this.manager.lastName}, experience: ${this.experience}`
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, salary, experience) {
        super (firstName, lastName, salary, experience)
    }
}

class Designer extends Employee{
    constructor(firstName, lastName, salary, experience, effCoeff) {
        super (firstName, lastName, salary, experience);
        this.effCoeff = effCoeff;
    }
    countSalary() {
       let designerBonus = super.countSalary();
        designerBonus *= this.effCoeff;
        return designerBonus.toFixed(2);
    }
}


class Manager extends Employee {
    constructor(firstName, lastName, salary, experience, ...devList) {
        super(firstName, lastName, salary, experience);
        this.devList = [...devList];
    }

    countSalary() {
        let managerBonus = super.countSalary();
        this.devList.length > 5 && this.devList.length < 10 ? managerBonus += 200 : managerBonus;
        this.devList.length > 10 ? managerBonus += 300 : managerBonus;
        const devArray = this.devList.filter(developer => developer instanceof Developer);
        devArray.length > this.devList.length / 2 ?  managerBonus *= 1.1 : managerBonus;
        return managerBonus.toFixed(2);
    }
    leadEmployees() {
        this.devList.forEach((element) => {
            element.manager = this;
        })
    }
}
const Julia = new Designer('Julia', 'Gonzales', 500, 3, 0.95);
const Ketty = new Designer('Ketty', 'Morose', 500, 3, 1);
const Victoria = new Designer('Victoria', 'Williams', 500, 3, 0.5);
const Vasia = new Developer('Vasia', 'Pupkin', 800, 2);
const Ricardo = new Developer('Ricardo', 'Milos', 1000, 3);
const Matheo = new Developer('Matheo', 'Vitara', 600, 1);
const Winston = new Developer('Winston', 'Freeman', 3000, 6);
const Andrew = new Developer('Andrew', 'Lincoln', 2000, 5);
const Leo = new Developer('Leo', 'Rodriguez', 1500, 3);
const Kenny = new Developer('Kenny', 'Smitt', 1000, 2);
const Matthew = new Manager('Matthew', 'Tuck', 300, 3);
const Charles = new Manager('Charles', 'Dickson', 500, 5);
const Aaren = new Manager('Aaren', 'Stringer', 800, 10, Julia);
const Dep = new Department;



