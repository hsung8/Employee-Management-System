DROP DATABASE IF EXISTS employerDB;
CREATE database employerDB;

USE employerDB;

CREATE TABLE department (
  department_id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE role (
  role_id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id INT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);
