var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptUser();
});

function promptUser(){
    inquirer.prompt({
        type:"list",
        choices: ["View all employees", "View All Employees By Department", 
        "View All Emplyees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
        message: "What would you like to do?",
        name: "userChoice"
    })
}