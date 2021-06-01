-- CREATING DATABASE --
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- CREATE DEPARTMENT TABLE --

CREATE TABLE department (
    id INT NOT NULL AUTO_UNCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- CREATE ROLE TABLE --

CRETAE TABLE role (
    id INT NOT NULL AUTO_UNCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

