DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    name VARCHAR(30),
id INT PRIMARY KEY (id),
);

CREATE TABLE role(
    title VARCHAR(30) NULL,
    salary DECIMAL(7,2) NULL,
    departement_id INT NULL,
    id INT PRIMARY KEY(id),
);

CREATE TABLE employee (
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT,
    manager_id INT,
    id INT PRIMARY KEY(id),
);
