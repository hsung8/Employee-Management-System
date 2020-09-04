# Employer Management System

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. This tool is to manage a company's employees using node, inquirer, and MySQL.

## User Story
```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Data Scheme

Design the following database schema containing three tables:

* **department**:

  * **department_id** - INT PRIMARY KEY
  * **department_name** - VARCHAR(30) to hold department name

* **role**:

  * **role_id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

* **Manager**:

  * **manager_id** - INT PRIMARY KEY
  * **manager_name** - VARCHAR(30) to hold the manager's name

![Database Schema](Assets/schema.png)

## Demo

Build a command-line application that at a minimum allows the user to:

  * Add and view departments, roles, employees: please click ![here](https://drive.google.com/file/d/1EWXLg5gu0SpWN6PNMzNYg5wRKrcfljx_/view?usp=sharing) to see demo video.

  * Update employee's roles: please click ![here](https://drive.google.com/file/d/16IQO9KG3gq4xUi8GZR3nVbqXPMpvB4lY/view?usp=sharing)

  * Update employee's manager: please click ![here](https://drive.google.com/file/d/1q6r9YvZJHGFfaueR2Ffht8uZ0cXqYTC_/view?usp=sharing)

## Requirements

* [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

* [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

- - -
© 2020 Hae Seung Sung