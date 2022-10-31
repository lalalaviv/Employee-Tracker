DROP DATABASE IF EXISTS stafflist_db;
CREATE DATABASE stafflist_db;

USE stafflist_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id),
    REFERENCES department(id),
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT AUTO_INCREMENT,
    FOREIGN KEY(role_id),
    REFERENCES role(id),
    FOREIGN KEY(manager_id),
    REFERENCES employees(id),
    ON DELETE SET NULL
); 