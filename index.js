const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
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

function promptUser() {
    inquirer.prompt([{
        type: "list",
        choices: [
            "View all employees",
            "View All Employees By Department",
            "View All Emplyees By Manager",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ],
        message: "What would you like to do?",
        name: "userChoice"
    }]).then(({ userChoice }) => {
        switch (userChoice) {
            case "View all employees":
                empSearch()
                break;
            case "View All Employees By Department":
                depSearch()
                break;
            case "Add Department":
                addDep()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Employee":
                addEmployee()
                break;
            default:
                connection.end()
        }

    })
}

// ADD NEW DEPARTMENT
function addDep() {

    inquirer.prompt([{

        type: "input",
        message: "What is the name of the department you like to add?",
        name: "depName"

    }]).then(function ({ depName }) {

        connection.query("INSERT INTO department SET ?", { name: depName }, function (err) {
            if (err) throw err

            promptUser()
        })
    })
}

// ADD NEW ROLE
function addRole() {

    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err

        const depsArr = res.map(function (dep) {
            return ({
                name: dep.name,
                value: dep.id
            })
        })

        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the role you'd like to add?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is this role's salary?",
                name: "salary"
            },
            {
                type: "list",
                message: "please choose the department for this role?",
                name: "depId",
                choices: depsArr
            }
        ]).then(function (answers) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: answers.roleName,
                    salary: answers.salary,
                    department_id: answers.depId
                },
                function (err) {
                    if (err) throw err

                    promptUser()
                })

        })

    })

}

function addEmployee() {

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err

        const roleArr = res.map(function (role) {

            return ({

                title: role.name,
                salary: role.salary,
                department_id: role.id,
                value:role.id


            })
        })

        inquirer.prompt([
            {
                type: "input",
                message: "Employee's first name?",
                name: "first_name"
            },
            {
                type: "input",
                message: "Employee's last name?",
                name: "last_name"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: roleArr
            }
        ]).then(function (answers) {
            connection.query("INSERT INTO role SET ?",
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    role_id: answers.role
                },

                function (err) {
                    if (err) throw err

                    promptUser()
                })

        })
    })
}