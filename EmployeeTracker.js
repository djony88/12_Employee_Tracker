// Add Dependencies

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");

// Connection Properties

const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_trackerDB"
}

// Create connection

const connection = mysql.createConnection(connectionProperties);

connection.connect((err) => {
    if (err) throw err;

    console.log("\n Welcome to my Employee Tracker App \n");
    mainMenu();
});

// Main Menu function

function mainMenu() {
    inquirer.prompt({
        name:"action",
        type:"list",
        message:"Main Menu",
        choices: [
            "View all employees.",
            "View all employees by department.",
            "View all employees by role.",
            "View all employees by manager.",
            "Add department.",
            "Add role.",
            "Add employee.",
            "Update employee manager.",
            "Update employee role.",
            "Update employee.",
            "Delete department.",
            "Delete role.",
            "Delete employee.",
            "View department budgets."
        ]
    }) .then((answer) => {
        switch (answer.action) {
            case "View all employees.":
                viewAll();
                break;

            case "View all employees by department.":
                viewAllByDep();
                break;

            case "View all employees by role.":
                viewAllByRole();
                break;
            
            case "View all employees by manager.":
                viewAllByMng();
                break;

            case "Add department.":
                addDep();
                break;
            
            case "Add role.":
                addRole();
                break;

            case "Add employee.":
                addEmp();
                break;

            case "Update employee manager.":
                updateMng();
                break;

            case "Update employee role.":
                updateEmpRole();
                break;

            case "Update employee.":
                updateEmp();
                break;

            case "Delete department.":
                deleteDep();
                break;
                
            case "Delete role.":
                deleteRole();
                break;

            case "Delete employee.":
                deleteEmp();
                break;
                
            case "View department budgets.":
                viewBudget();
                break;
        }
    });
}

// View all employees function

function viewAll() {
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("\n");

        console.table(res);

        mainMenu();
    });
}

// View all employees by department

function viewAllByDep() {
    let depArray = [];

    promisemysql.createConnection(connectionProperties) .then((connect) => {
        return connect.query('SELECT name FROM department');
    }) .then(function(value) {
        depQuery = value;
        for(i=0; i < value.length; i++) {
            depArray.push(value[i].name);
        }
    }) .then (() => {
        inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to search?",
            choices: depArray
        }) .then((answer) => {
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
            connect.query(query, (err, res) => {
                if(err) return err;
                console.log("\n");

                console.table(res);

                mainMenu();
            });
        });
    });
}
// View all employees by role

function viewAllByRole(){
    let roleArray = [];

    promisemysql.createConnection(connectionProperties) .then((connect) => {
        return connect.query('SELECT title FROM role');
    }) .then(function(role) {
        for (i=0; i < role.length; i++) {
            roleArray.push(role[i].title);
        }
    }) .then(() => {
        inquirer.prompt({
            naem: "role",
            type: "list",
            message: "Which role would you like to search?",
            choices: roleArray
        }) .then((answer) => {
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;
            connetion.query(query, (err, res) => {
                if(err) return err;

                console.log("\n");

                console.table(res);

                mainMenu();
            });
        });
    });
}

// View all employees by manager

function viewAllByMng() {
    let mngArray = [];

    promisemysql.createConnection(connectionProperties) .then((connect) => {
        return connect.query("SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e Inner JOIN employee m ON e.manager_id = m.id");
    }) .then(function(manager) {
        for (i=0; i < managers.length; i++){
            managerArr.push(managers[i].manager);
        }

        return manager;
    }) .then((manager) => {
        inquirer.prompt({
            name: "manager",
            type: "list",
            message: "Which manager would you like to search?",
            choices: mngArray
        }) .then((answer) => {
            let managerID;

            for (i=0; i <manager.length; i++) {
                if (answer.manager == manager[i].manager){
                    managerID = manager[i].id;
                }
            }

            const query = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager
            FROM employee e
            LEFT JOIN employee m ON e.manager_id = m.id
            INNER JOIN role ON e.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            WHERE e.manager_id = ${managerID};`;

            connection.query(query, (err, res) => {
                if(err) return err;

                console.log("\n");

                console.table(res);

                mainMenu();
            });
        });
    });
}

// Add department

function addDep() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Input department name:"
    }) .then((answer) => {
        connection.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (err, res) => {
            if(err) return err;

            console.log("\n Department Added...\n");

            mainMenu();
        });
    });
}

// Add role

function addRole() {
    let depArray = [];

    promisemysql.createConnection(connectionProperties) .then((connect) => {
        return connect.query('SELECT id, name FROM department ORDER BY name ASC');
    }) .then((department) => {
        for (i=0; i < department.length; i++){
            depArray.push(department[i].name);
        }
        return department;
    }) .then((department) => {
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "Role title: "
            },
            {
                name: "salary",
                type: "number",
                message: "Salary: "
            },
            {
                name: "dpt",
                type: "list",
                message: "Department: ",
                choices: depArray
            }
        ]) .then((answer) => {
            let depID;

            for(i=0; i <department.length; i++) {
                if (answer.dpt == department[i].name){
                    depID = department[i].id;
                }
            }

            connection.query(`INSERT INTO role (title, salary, department_id
                VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                    if(err) return err;
                    
                    console.log(`\n Role ${answer.roleTitle} Added...\n`);

                    mainMenu();
                });
        });
    });
}

// Add employee

function addEmp() {
    let roleArray = [];
    let mngArray = [];

    promisemysql.createConnection(connectionProperties) .then((connect) => {
        return Promise.all([
            connect.query('SELECT id, title FROM role ORDER BY title ASC'),
            connect.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }) .then(([role, manager]) => {

        for(i=0; i <role.length; i++) {
            roleArray.push(role[i].title);
        }

        for(i=0; i <manager.length; i++) {
            mngArray.push(manager[i].employee);
        }

        return Promise.all([role, manager]);
    }) .then(([role, manager]) => {

        mngArray.unshift('--');

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "First name: ",
                validate: function(input) {
                    if (input === "") {
                        console.log("!!!REQUIRED INPUT!!!");
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            },
            {
                name: "lastName",
                type: "input",
                message: "Last name: ",
                validate: function(input) {
                    if (input === "") {
                        console.log("!!!REQUIRED INPUT!!!");
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            },
            {
                name: "role",
                type: "list",
                message: "What is their role?",
                choices: roleArray
            },
            {
                name: "manager",
                type: "list",
                message: "Who is their manager?",
                choices: mngArray 
            }
        ]) .then((answer) => {
            let roleID;

            let managerID = null;

            for (i=0; i < role.length; i++) {
                if (answer.role == role[i].title) {
                    roleID = role[i].id;
                }
            }

            for (i=0; i <manager.length; i++) {
                if (answer.manager == manager[i].employee) {
                    managerID = manager[i].id;
                }
            }

            connetion.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
                if (err) return err;

                console.log(`\n Employee ${answer.firstName} ${answer.lastName} Added...\n `);

                mainMenu();
            });
        });
    });
}

// Update employee manager

function updateMng() {
    let empArray = [];

    promisemysql.createConnection(connectionProperties) .then ((connect) => {
        return connect.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC");
    }) .then ((employee) => {

        for (i=0; i < employee.length; i++) {
            empArray.push(employees[i].employee);
        }

        return employee;
    }) .then((employee) => {

        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee would you like to edit?",
                choices: empArray
            },
            {
                name: "manager",
                type: "list",
                message: "Who is their manager?",
                choices: empArray
            }
        ]) .then((answer) => {

            let employeeID;
            let managerID;

            for (i=0; i < employee.length; i++) {
                if (answer.manager == employee[i].employee) {
                    managerID = employee[i].id;
                }
            }

            for (i=0; i < employee.length; i++){
                if (answer.employee == employee[i].employee) {
                    employeeID = employee[i].id;
                }
            }

            connetion.query(`UPDATE employee SET manager_id = ${managerID} WHERE id = ${employeeID}`, (err, res) => {
                if(err) return err;

                console.log(`\n ${answer.employee} MANAGER UPDATED TO ${answer.manager}...\n`);

                mainMenu();

            });
        });
    });
}

// Update employee role

function updateEmpRole() {

    let empArray = [];

    let roleArray = [];

    promisemysql.createConnection(connectionProperties) .then((connect) => {

        return Promise.all([

            connect.query('SELECT id, title FROM role ORDER BY title ASC'),
            connect.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }) .then(([role, employee]) => {

        for (i=0; i < role.length; i++){
            roleArray.push(role[i].title);
        }

        for (i=0; i < employee.length; i++){
            empArray.push(employee[i].employee);
        }

        return Promise.all([role, employee]);
    }) .then(([role, employee]) => {
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Who would you like to edit?",
                choices: empArray
            },
            {
                name: "role",
                type: "list",
                message: "What is new role?",
                choices: roleArray
            }
        ]) .then((answer) => {

            let roleID;
            let employeeID;

            for (i=0; i < role.length; i++){
                if (answer.role == role[i].title){
                    roleID = role[i].id;
                }
            }

            for (i=0; i < employee.length; i++){
                if (answer.employee == employee[i].employee){
                    employeeID = employee[i].id;
                }
            }

            connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`, (err, res) => {
                if(err) return err;

                console.log(`\n ${answer.employee} ROLE UPDATED TO ${answer.role}...\n `);

                mainMenu();
            });
        });
    });
}

// Delete department

function deleteDep() {

    let depArray = [];

    promisemysql.createConnection(connectionProperties).then((connect) => {

            return connect.query("SELECT id, name FROM department");
        }) .then((department) => {
            for (i=0; i < department.length; i++){
                depArray.push(department[i].name);
            }

            inquirer.prompt([
                {
                    name: "delete",
                    type: "list",
                    message: "*** WARNING *** Deleting a department will delete all roles and employees associated with the department. Do you want to continue?",
                    choices: ["NO", "YES"]
                }
            ]) .then((answer) => {
                if (answer.delete === "NO") {

                    mainMenu();
                }
            }) .then(() => {
                inquirer.prompt([
                {
                    name: "depatrtment",
                    type: "list",
                    message: "Which department would you like to delete?",
                    choices: deptArr
                }, 
                {
                    name: "delete",
                    type: "Input",
                    message: "Type the EXACT department name to confirm deletion of the department: "
                }
    
            ]) .then((answer) => {
                if(answer.delete === answer.department){

                    let deptID;
                    for (i=0; i < department.length; i++){
                        if (answer.department == department[i].name){
                            deptID = department[i].id;
                        }
                    }

                    connection.query(`DELETE FROM department WHERE id=${deptID};`, (err, res) => {
                        if(err) return err;

                        console.log(`\n Department '${answer.dept}' Deleted...\n `);

                        mainMenu();
                    });
                }
                else {
                    console.log(`\n Department '${answer.dept}' Not deleted...\n `);

                    mainMenu();
                }
            });
        });
    });
}

// Delete role

function deleteRole(){

    let roleArray = [];

    promisemysql.createConnection(connectionProperties) .then ((connect) => {

        return connect.query("SELECT id, title FROM role");
    }) .then((role) => {

        for (i=0; i < role.length; i++){
            roleArray.push(role[i].title);
        }

        inquirer.prompt([
            {
            name: "delete",
            type: "list",
            message: "*** WARNING *** Deleting role will delete all employees associated with the role. Do you want to continue?",
            choices: ["NO", "YES"]
            }
        ]) .then((answer) => {

            if (answer.delete === "NO") {

                mainMenu();
            }
        }) .then(() => {
            inquirer.prompt([
                {
                name: "role",
                type: "list",
                message: "Which role would you like to delete?",
                choices: roleArray
                },
                {
                name: "delete",
                type: "Input",
                message: "Type the EXACT role title to confirm deletion of the role: " 
                }
            ]) .then((answer) => {

                if (answer.delete === answer.role) {

                    let roleID;

                    for (i=0; i < role.length; i++){
                        if (answer.role == role[i].title) {
                            roleID = role[i].id;
                        }
                    }

                    connetion.query(`DELETE FROM role WHERE id=${roleID};`, (err, res) => {
                        if (err) return err;

                        console.log(`\n Role '${answer.role}' Deleted...\n `);

                        mainMenu();
                    });
                }
                else {
                    console.log(`\n ROLE '${answer.role}' NOT DELETED...\n `);

                    mainMenu();
                }
            });
        });
    });
}

// Delete employee


// View department budgets

