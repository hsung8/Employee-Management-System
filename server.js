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
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        console.table(res)
            ("------------------------------------\n")
        runEmp();
    });
}

function showAllDept() {
    inquirer
        .prompt({
            name: "dept",
            type: "rawlist",
            message: "Which department?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        })
        .then(function (answer) {
            switch (answer.dept) {
                case "Sales":
                    const deptid = 1
                case "Engineering":
                    const deptid = 2
                case "Finance":
                    const deptid = 3
                case "Legal":
                    const deptid = 4
            }
            const query = "SELECT * FROM employee, role WHERE role.department_id = ? AND employee.role_id = role_id";
            connection.query(query, deptid, function (err, res) {
                for (let i = 0; i < res.length; i++) {
                    console.log(`${result[i].first_name} ${result[i].last_name}`);
                }
                console.log("------------------------------------\n")
                runEmp();
            });
        });
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
        ]).then(function (answer){
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
                    console.log(`${res[i].first_name} ${res[i].last_name}`);
                }
                console.log("------------------------------------\n")
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
    connection.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function(err, res) {
        if (err) throw err;
        console.table("Successfully added!-----------------------\n");
        runEmp();
    })
})
}

function updateEmpRole() {

}

function updateEmpMng() {

}