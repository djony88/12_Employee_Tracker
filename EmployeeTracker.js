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



