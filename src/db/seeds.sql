INSERT INTO department (name) VALUES 
('Engineering'),
('HR'),
('Finance');

INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 60000, 2),
('Accountant', 70000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Mike', 'Johnson', 3, 1);