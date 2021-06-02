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

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (1, "Sarah", "Colman", 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (2, "Tanya", "Hawkings", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (3, "Brian", "Mosca", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (4, "John", "Rinaldi", 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (5, "Ana", "Nowitcky", 5, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (6, "Zack", "McDonald", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (7, "Kristen", "Smith", 7, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (8, "Simon", "Siemens", 7, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (9, "Michel", "Polk", 8, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (10, "Tim", "Novak", 9, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (11, "Nikola", "Stamenkovic", 7, 6);

