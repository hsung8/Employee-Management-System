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
                "Update Employee Manager"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    showAll();
                    break;

                case "View All Employees by Department":
                    showAllDpt();
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

                case "pdate Employee Manager":
                    updateEmpMng();
                    break;
            }
        });
}

function showAll (){

}

function showAllDpt(){

}

function showAllMng(){

}

function addEmp(){

}

function updateEmpRole(){

}

function updateEmpMng(){
    
}