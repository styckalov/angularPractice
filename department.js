class Department {
    managersList = [];
    giveSalary() {
        this.managersList.forEach(element => {
            const firstName = element.firstName;
            const lastName = element.lastName;
            const salary = element.salary;
            console.log(`Manager - ${firstName} ${lastName}: got salary: ${salary.toFixed(2)}$`);
            for(let key in element.devList) {
                const firstName = element.devList[key].firstName;
                const lastName = element.devList[key].lastName;
                const salary = element.devList[key].salary;
                console.log(`Developer - ${firstName} ${lastName}: got salary: ${salary.toFixed(2)}$`);
            }
        });

    };
    addManagers(...managers) {
        this.managersList.push(...managers);
    }
}


class Employee{
    constructor(firstName, lastName, salary, experience, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.experience = experience;
        this.manager = manager;
    }
    countSalary() {
        this.experience > 2 && this.experience < 5 ? this.salary += 200: this.salary;
        this.experience > 5 ? this.salary = (this.salary * 1.2) + 500 : this.salary;
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, salary, experience, manager) {
        super (firstName, lastName, salary, experience, manager)
    }
}

class Designer extends Employee{
    constructor(firstName, lastName, salary, experience, effCoeff) {
        super (firstName, lastName, salary, experience,);
        this.effCoeff = effCoeff;
    }
    countSalary() {
        super.countSalary();
        this.salary *= this.effCoeff;
    }
}


class Manager extends Employee {
    constructor(firstName, lastName, salary, experience, ...devList) {
        super(firstName, lastName, salary, experience);
        this.devList = [...devList];
    }

    countSalary() {
        super.countSalary();
        this.devList.length > 5 && this.devList.length < 10 ? this.salary += 200 : this.salary;
        this.devList.length > 10 ? this.salary += 300 : this.salary;
        let designerCounter = 0;
        let developerCounter = 0;
        this.devList.forEach((element) => {
            if(element instanceof Designer) {
                designerCounter++;
            }
            else if (element instanceof Developer) {
                developerCounter++;
            }
        });
        developerCounter > designerCounter ?  this.salary *= 1.1 : this.salary;
    }
}
const Julia = new Designer('Julia', 'Gonzales', 500, 3, 0.95);
const Ketty = new Designer('Ketty', 'Morose', 500, 3, 1);
const Victoria = new Designer('Victoria', 'Williams', 500, 3, 0.5);
const Vasia = new Developer('Vasia', 'Pupkin', 800, 2);
const Ricardo = new Developer('Ricardo', 'Milos', 1000, 3);
const Matheo = new Developer('Matheo', 'Vitara', 600, 1,);
const Winston = new Developer('Winston', 'Freeman', 3000, 6,);
const Andrew = new Developer('Andrew', 'Lincoln', 2000, 5,);
const Leo = new Developer('Leo', 'Rodriguez', 1500, 3);
const Kenny = new Developer('Kenny', 'Smitt', 1000, 2);
const Matthew = new Manager('Matthew', 'Tuck', 300, 3, Kenny, Victoria);
const Charles = new Manager('Charles', 'Dickson', 500, 5, Vasia, Julia, Ricardo);
const Aaren = new Manager('Aaren', 'Stringer', 800, 10, Matheo, Winston, Andrew, Leo, Ketty);
const Dep = new Department;



