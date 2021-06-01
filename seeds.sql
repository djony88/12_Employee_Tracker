USE employee_trackerDB;

-- DEPARTMENT SEEDS --

INSERT INTO department (id, name)
VALUE (1, "Human Resources");

INSERT INTO department (id, name)
VALUE (2, "Sales");

INSERT INTO department (id, name)
VALUE (3, "Legal");

INSERT INTO department (id, name)
VALUE (4, "Engineering");

INSERT INTO department (id, name)
VALUE (5, "Finance");

-- EMPLOYEE ROLE SEEDS --

INSERT INTO role (id, title, salary, department_id)
VALUE (1, "HR Director", 55000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUE (2, "Sales Director", 65000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUE (3, "Sales Manager", 59000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUE (4, "Salesperson", 50000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUE (5, "Lawyer", 75000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUE (6, "Lead Engineer", 95000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUE (7, "Assistant Engineer", 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUE (8, "IT Manager", 55000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUE (9, "Accountant", 75000, 5);

-- EMPLOYEE SEEDS --


