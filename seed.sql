--- Departments
INSERT INTO department (department_id, department_name)
VALUES (1, "Sales");

INSERT INTO department (department_id, department_name)
VALUES (2, "Engineering");

INSERT INTO department (department_id, department_name)
VALUES (3, "Finance");

INSERT INTO department (department_id, department_name)
VALUES (4, "Legal");

--- Roles
INSERT INTO role (role_id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (2, "Salesperson", 80000, 1);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (3, "Lead Engineer", 150000, 2);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (4, "Software Engineer", 120000, 2);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (5, "Accountant", 125000, 3);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (6, "Legal Team Lead", 250000, 4);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (7, "Lawyer", 190000, 4);

--- Employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Mike", "Chan", 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Ashley", "Rodriguez", 3, null) ;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Kevin", "Tupik", 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Hae Seung", "Sung", 4, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Malia", "Brown", 5, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Sarah", "Lourd", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Tom", "Allen", 7, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Bon", "Koo", 7, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Tammer", "Galal", 4, 4);

--- managers
INSERT INTO manager (manager_id, manager_name)
VALUES (1, "John Doe");

INSERT INTO manager (manager_id, manager_name)
VALUES (3, "Ashley Rodriguez");

INSERT INTO manager (manager_id, manager_name)
VALUES (4, "Kevin Tupik");

INSERT INTO manager (manager_id, manager_name)
VALUES (7, "Sarah Lourd");

INSERT INTO manager (manager_id, manager_name)
VALUES (8, "Tom Allen");