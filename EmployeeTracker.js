// Add Dependencies

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");



// Create connection

const connection = mysql.createConnection(connectionProperties);

connection.connect((err) => {
    if (err) throw err;

    console.log("\n Welcome to my Employee Tracker App \n");
    mainMenu();
});

