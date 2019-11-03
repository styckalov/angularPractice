const express = require('express');
const {Department, Developer, Designer, Manager} = require('./department');
const bodyParser = require('body-parser');


const Aaren = new Manager('Aaren', 'Stringer', 300, 3);
const Matthew = new Manager('Matthew', 'Tuck', 400, 4);
const Joel = new Manager('Joel', 'Birch', 500, 5);
const Mira = new Developer('Mira', 'Mirror', 400, 4);

const Employees = [

];

const Managers = [

];

const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .post('/api/v1/managers', (req, res, next) => {
        Managers.push(req.body);
        res.end('I got manager' + JSON.stringify(req.body));
        console.log(req.body);
    })
    .post('/api/v1/employees', (req, res, next) => {
        Employees.push(req.body);
        res.end('I got developer' + JSON.stringify(req.body));
    })
    .get('/api/v1/employees', (req, res, next) =>{
        res.end(JSON.stringify(Employees));
    })
    .get('/api/v1/employee/:id', (req, res, next) => {
        const parsed = JSON.parse(Employees);

    })
    .get('/api/v1/managers', (req, res, next) => {
        res.end(JSON.stringify(Managers));
    })
    .listen(3000);
