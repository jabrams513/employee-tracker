const mysql = require('mysql2');
const inquirer = require('inquirer');

//Connection to mysql server
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employeeDirectory_db'
},
    console.log('Welcome! You have successfully connected to the employee directory database!')
);

// CLI prompts for the user to make a selection from the list
function userPrompts() {
    inquirer.prompt({
        type: 'list',
        name: 'userChoices',
        message: 'What would you like to do?',
        choices:
            ["View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Quit"]
        // Given the users' choice, run a particular command
    }).then(function (answer) {
        switch (answer.userChoices) {
            case "View All Departments":
                viewDepartment();
                break;
            case "View All Roles":
                viewRole();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "Quit":
                process.exit();
        }

    })
}

// Function to view departments
function viewDepartment() {
    db.promise().query("SELECT * FROM department").then(([response]) => {
        console.table(response);
        userPrompts();
    })
}

// Function to view roles
function viewRole() {
    db.promise().query("SELECT * FROM role LEFT JOIN department ON role.department_id = department.id").then(([response]) => {
        console.table(response);
        userPrompts();
    })
}

// Function to view employees
function viewEmployees() {
    db.promise().query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS Employee, role.title, role.salary, department.name AS Department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id").then(([response]) => {
        console.table(response);
        userPrompts();
    })
}

// Call function to prompt user
userPrompts();
