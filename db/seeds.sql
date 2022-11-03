INSERT INTO department(name)
VALUES ('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role(title, salary, department_id)
VALUES 
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Anna', 'Anderson', 3, null),
('Benjamin', 'Bentford', 5, 1),
('Caitlyn', 'Crowford', 7, null),
('Donna', 'Dawn', 1, null),
('Elysa', 'Binot', 2, 5),
('Frank', 'Rusli', 4, null),
('George', 'Lee', 6, null),
('Henry', 'Chen', 8, 7);
