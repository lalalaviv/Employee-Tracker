// import mysql2
const mysql = require('mysql2')
// import inquirer 
const inquirer = require('inquirer');

require('dotenv').config()

// connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'stafflist_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

// function after connection is established and welcome image shows 
afterConnection = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE TRACKER         *")
    console.log("*                                 *")
    console.log("***********************************")
    startPrompt();
};

//================== Initial Prompt =======================//
function startPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View all Departments",
                "View all Employees",
                "View all Roles",
                "View all Employees by Department",
                "Add Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Delete a Department",
                "Delete a Role",
                "Delete an Employee"
            ]
        }
    ]).then(function (val) {
        switch (val.choice) {
            case "View all Departments":
                viewAllDepartments();
                break;

            case "View all Employees":
                viewAllEmployees();
                break;

            case "View all Roles":
                viewAllRoles();
                break;

            case "View all Employees By Deparments":
                viewEmployeeDepartments();
                break;

            case "View all Employees by Manager":
                viewEmployeeManager();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add a Role":
                addRole();
                break;

            case "Add an Employee":
                addEmployee();
                break;

            case "Update an Employee Role":
                updateEmployee();
                break;
            
            case "Delete a Department":
                deleteDepartment();
                break;

            case "Delete a Role":
                deleteRole();
                break;

            case "Delete an Employee":
                deleteEmployee();
                break; 


        }
    })
}
//============= View all departments ====================//

function viewAllDepartments() {
    connection.query("SELECT department.id AS ID, department.name AS Deparment FROM department;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

//============= View All Employees ==========================//
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}
//============= View All Roles ==========================//
function viewAllRoles() {
    connection.query("SELECT id AS ID, title AS Title, salary AS Salary, department_id AS Department FROM role",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}
//============= View All Employees By Departments ==========================//
function viewEmployeeDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}


//=============== View employee by manager =============//
function viewEmployeeManager() {
    connection.query("SELECT employee.first_name, employee.last_name, employee.first_name AS Manager FROM employee JOIN employee ON empolyee.manager_id = employee.id ORDER BY employee.id",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

//================= Select Role Quieries Role Title for Add Employee Prompt ===========//
var roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }

    })
    return roleArr;
}
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
var managersArr = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }

    })
    return managersArr;
}
//============= Add Employee ==========================//
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: val.firstName,
                last_name: val.lastName,
                manager_id: managerId,
                role_id: roleId

            }, function (err) {
                if (err) throw err
                console.table(val)
                startPrompt()
            })

    })
}
//============= Update Employee ==========================//
function updateEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee you want update in the database."
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the new role number id associated with the employee you want to update in the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.first_name], function (err, data) {
            if (err) throw err;
            console.log('The new role entered has been added successfully to the database.');

            connection.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};
//============= Add Employee Role ==========================//
function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"

            }
        ]).then(function (res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )

        });
    });
};
//============= Add Department ==========================//
function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name

            },
            function (err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
}

// ========= Delete department ==============//
function deleteDepartment() {
    inquirer.prompt([
        {
            name: "department_id",
            type: "number",
            message: "Please enter the id of the department you want to delete from the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        connection.query("DELETE FROM department WHERE id = ?", [response.department_id], function (err, data) {
            if (err) throw err;
            console.log("The department entered has been deleted successfully from the database.");

            connection.query(`SELECT * FROM department`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};

// ============== Delete role==================//
function deleteRole() {
    inquirer.prompt([
        {
            name: "role_id",
            type: "number",
            message: "Please enter the id of the role you want to delete from the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        connection.query("DELETE FROM role WHERE id = ?", [response.role_id], function (err, data) {
            if (err) throw err;
            console.log("The role entered has been deleted successfully from the database.");

            connection.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};

// ================= Delete Employee================//
function deleteEmployee() {
    inquirer.prompt([
        {
            name: "employee_id",
            type: "number",
            message: "Please enter the id of the employee you want to delete from the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        connection.query("DELETE FROM employee WHERE id = ?", [response.employee_id], function (err, data) {
            if (err) throw err;
            console.log("The employee entered has been deleted successfully from the database.");

            connection.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
    });
    };