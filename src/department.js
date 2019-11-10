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
        this.experience > 2 && this.experience <= 5 ? bonus += 200: bonus;
        this.experience > 5 ? bonus = (bonus * 1.2) + 500 : bonus;
        return bonus;
    }
    toString() {
        if (this instanceof Manager) {
            return `MANAGER - ${this.firstName} ${this.lastName}, experience: ${this.experience}`
        }
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
        return designerBonus;
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
        return managerBonus;
    }
    leadEmployees() {
        this.devList.forEach((element) => {
            element.manager = this;
        })
    }
}

module.exports = {
    Developer, Designer, Manager
};

