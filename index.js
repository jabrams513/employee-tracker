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

// Function to add departments
function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "Enter department name",
        name: "name"
    }).then(answer => {
        db.promise().query("INSERT INTO department SET ?", { name: answer.name }).then(([response]) => {
            if (response.affectedRows > 0) {
                viewDepartment();
            }
            else {
                console.error("Failed to add department");
                userPrompts();
            }
        })
    })
}

// Function to add roles
async function addRole() {
    const [departments] = await db.promise().query("SELECT * FROM department");
    const departmentArray = departments.map(department => ({ name: department.name, value: department.id }))
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the role title",
            name: "title"
        },
        {
            type: "input",
            message: "Enter the role salary",
            name: "salary"
        },
        {
            type: "list",
            message: "Select the department for the role",
            name: "department_id",
            choices: departmentArray
        }
    ]).then(({ title, salary, department_id }) => {
        const roleObj = { title, salary, department_id };
        db.promise().query("INSERT INTO role SET ?", roleObj).then(([response]) => {
            if (response.affectedRows > 0) {
                viewRole();
            }
            else {
                console.error("Failed to add department");
                userPrompts();
            }
        });
    })
}

// Function to add employees
function addEmployee() {
    db.promise().query("SELECT * FROM role").then(([roles]) => {
        const roleArray = roles.map(role => ({ name: role.title, value: role.id }));
        inquirer.prompt([
            {
                type: "input",
                message: "Enter employee first name:",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter employee last name:",
                name: "last_name"
            },
            {
                type: "list",
                message: "Select employee role:",
                name: "role_id",
                choices: roleArray
            },
            {
                type: "input",
                message: "Enter employee's manager ID (leave blank for no manager):",
                name: "manager_id"
            }
        ]).then(({ first_name, last_name, role_id, manager_id }) => {
            const employeeObj = {
                first_name,
                last_name,
                role_id,
                manager_id: manager_id === '' ? null : manager_id
            };

            db.promise().query("INSERT INTO employee SET ?", employeeObj).then(([response]) => {
                if (response.affectedRows > 0) {
                    console.log("Employee added successfully!");
                    viewEmployees();
                } else {
                    console.error("Failed to add employee");
                    userPrompts();
                }
            });
        });
    });
}

// Call function to prompt user
userPrompts();
