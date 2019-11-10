const express = require('express');
const {Developer, Designer, Manager} = require('./department');
const bodyParser = require('body-parser');

const Employees = [];
const Managers = [];

const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .post('/api/v1/managers', (req, res, next) => {
        let manager = new Manager(req.body.firstName, req.body.lastName, req.body.salary, req.body.experience);
        Managers.push(manager);
        res.end()
    })
    .post('/api/v1/employees', (req, res, next) => {
        if(req.body.type === "developer") {
            let developer = new Developer(req.body.firstName, req.body.lastName, req.body.salary, req.body.experience);
            Employees.push(developer);
        }else if(req.body.type === "designer") {
            let designer = new Designer(req.body.firstName, req.body.lastName, req.body.salary, req.body.experience, req.body.effCoeff);
            Employees.push(designer);
        }else {
            res.status(204);
        }
        res.end();
    })
    .post('/api/v1/managers/:id/team', function (req, res, next) {
        const managerId = req.params.id;
        const employeeId = req.body.employee_id;
        const condition = Managers.includes(Managers[managerId]) && Employees.includes(Employees[employeeId]);
        if(condition) {
            Employees[employeeId].manager_id = managerId;
            Managers[managerId].devList.push(Employees[employeeId]);
        }else {
            res.status(204);
        }
        res.end(JSON.stringify(Managers[managerId]));
    })
    .get('/api/v1/employees', (req, res, next) => {
        let id = 0;
        Employees.forEach(element => {
            element.id = id;
            id++;
        });
        res.json(Employees);
        res.end();
    })
    .get('/api/v1/employees/:id', (req, res, next) => {
        const id = parseInt(req.params.id);
        if(Employees.includes(Employees[id])) {
            const tempObject = {};
            if(Employees[id] instanceof Developer) {
                tempObject.type = "developer";
            }else {
                tempObject.type = "designer";
            }
            tempObject.id = id;
            tempObject.firstName = Employees[id].firstName;
            tempObject.lastName = Employees[id].lastName;
            tempObject.experience = Employees[id].experience;
            tempObject.salary = Employees[id].countSalary();
            res.json(tempObject);
        }else {
            res.status(204);
        }
        res.end()
    })
    .get('/api/v1/managers', (req, res, next) => {
        let id = 0;
        const managersWithoutTeam = [];
        Managers.forEach(element => {
            let {firstName, lastName, salary, experience} = element;
            let tempObject = {"type": "manager", "id": id, firstName, lastName, salary, experience};
            managersWithoutTeam.push(tempObject);
            id++;
        });
        res.json(managersWithoutTeam);
        res.end();
    })
    .get('/api/v1/managers/:id', (req, res, next) => {
        const id = parseInt(req.params.id);
        if(Managers.includes(Managers[id])) {
            const tempObject = {};
            tempObject.type = "manager";
            tempObject.id = id;
            tempObject.firstName = Managers[id].firstName;
            tempObject.lastName = Managers[id].lastName;
            tempObject.experience = Managers[id].experience;
            tempObject.salary = Managers[id].countSalary();
            res.json(tempObject);
        }else {
            res.status(204);
        }
        res.end()
    })
    .get('/api/v1/managers/:id/team', (req, res, next) => {
        const id = parseInt(req.params.id);
        const condition = Managers.includes(Managers[id]) && Managers[id].devList !== [];
        if(condition) {
            res.json(Managers[id].devList)
        }else {
            res.status(204);
        }
        res.end();
    })
    .listen(3000);
