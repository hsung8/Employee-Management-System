var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    runEmp();
});

function runEmp() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Delete Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    showAll();
                    break;

                case "View All Employees by Department":
                    showAllDept();
                    break;

                case "View All Employees by Manager":
                    showAllMng();
                    break;

                case "Add Employee":
                    addEmp();
                    break;

                case "Delete Employee":
                    deleteEmp();
                    break;

                case "Update Employee Role":
                    updateEmpRole();
                    break;

                case "Update Employee Manager":
                    updateEmpMng();
                    break;

                case "Exit":
                    connection.end()
                    break;
            }
        });
}

function showAll() {
    //let query = "SELECT * FROM employee INNER JOIN role ON employee.role_id=role.role_id JOIN department on role.department_id = department.department_id"
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, manager.manager_name FROM employee "

    query += "LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN department ON role.department_id = department.department_id LEFT JOIN manager ON employee.manager_id = manager.manager_id ORDER BY employee.id ASC"

    connection.query(query, function (err, res) {
        console.table(res)
        console.log("\n------------------------------------\n")
        runEmp();
    });
}

function showAllDept() {
    inquirer.prompt([
        {
            name: "department",
            type: "list",
            message: "Select a department: ",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        }
    ]).then(function (answer) {
        let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, manager.manager_name FROM employee "

        query += "LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN department ON role.department_id = department.department_id LEFT JOIN manager ON employee.manager_id = manager.manager_id "

        query += "WHERE department.department_name = ?"
        connection.query(query, [answer.department], function (err, res) {
            if (err) throw err;
            console.table(res)
            console.log("\n------------------------------------\n")
            runEmp();
        });
    })
}

function showAllMng() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL"
    connection.query(query, function (err, res) {
        if (err) throw err;
        managers = [];
        let managersArray = res;
        for (let i = 0; i < res.length; i++)
            managers.push(res[i].first_name + " " + res[i].last_name);
        inquirer.prompt([
            {
                name: "manager",
                type: "list",
                message: "Which manager do you want to select?",
                choices: managers
            }
        ]).then(function (answer) {
            let manager_id;
            for (let i = 0; i < managersArray.length; i++) {
                if (answer.manager === managersArray[i].first_name + " " + managersArray[i].last_name) {
                    manager_id = managersArray[i].id;
                }
            };
            let query = "SELECT * FROM employee WHERE manager_id = ?"
            connection.query(query, manager_id, function (err, res) {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    console.log(`The selected manager manages ${res[i].first_name} ${res[i].last_name}`);
                }
                console.log("\n------------------------------------\n")
                runEmp();
            })
        });
    });

}

function addEmp() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "Please enter the employee's first name: "
    },
    {
        type: "input",
        name: "lastName",
        message: "Please enter the employee's last name: "
    },
    {
        type: "number",
        name: "roleId",
        message: "Please enter the employee's role ID: "
    },
    {
        type: "number",
        name: "managerId",
        message: "Please enter the employee's manager ID: "
    }
    ]).then(function (answer) {
        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
        connection.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function (err, res) {
            if (err) throw err;
            console.log("\nSuccessfully added!-----------------------\n");
            showAll()
            runEmp();
        })
    })
}

function deleteEmp() {
    employeeList = [];
    let query = "SELECT * FROM employee"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++)
            employeeList.push(res[i].first_name);
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Select an employee to remove",
                choices: employeeList
            }
        ]).then(function (answer) {
            let query = "DELETE FROM employee WHERE first_name = ?"
            connection.query(query, [answer.employee], function (err, res) {
                if (err) throw err;
                console.log(`\n${answer.employee} is removed from DB --------------\n`);
                showAll()
                runEmp();
            });
        });
    });
}

function updateEmpRole() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter the employee's first name to update the person's role: "
            },
            {
                name: "updateRole",
                type: "input",
                message: "Please enter the new role id of the employee: "
            },
        ])
        .then(function (answer) {
            let updatedRole = answer.updateRole;
            let firstName = answer.firstName;
            const query = "UPDATE employee SET role_id = ? WHERE first_name = ?";

            connection.query(query, [updatedRole, firstName], function (err) {
                if (err) throw err;
                console.log(`\n${answer.firstName}'s role is updated -----------------\n`);
                showAll()
                runEmp();
            });
        });
}

function updateEmpMng() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter the employee's first name to change the person's manager: "
            },
            {
                name: "newManager",
                type: "input",
                message: "Please enter the employee's new manager's employee id: "
            },
        ])
        .then(function (answer) {
            let newManager = answer.newManager;
            let firstName = answer.firstName;
            const query = "UPDATE employee SET manager_id = ? WHERE first_name = ?";
            connection.query(query, [newManager, firstName], function (err) {
                if (err) throw err;
                console.log(`\n${answer.firstName}'s manager is updated -----------------\n`)
                showAll()
                runEmp();
            });
        });
}