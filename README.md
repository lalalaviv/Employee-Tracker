# Employee Tracker

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

Because this application won’t be deployed, you’ll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You’ll need to submit a link to the video and add it to the README of your project.

## Table of Contents
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Demonstration](#demonstration)
  - [License](#license)
  - [Questions](#questions)
  - [Credits](#credits)


## Installation 

  Before attempting to use this application, you must have the follow programs installed to your computer: 

  - VS Code
  - Node.js
  - MySQL 
  
  In the terminal of VS Code please install enter the following to install all dependencies: 
  ```bash
  npm install
  ```
- [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4)
- [MySQL](https://dev.mysql.com/downloads/windows/visualstudio/)

## Usage

 To use the application locally please clone the repo to your local environment.
 <br/>
 To view database from MySQL run the following command: 
 ```bash
 mysql -u root -p
 ````
 The application will be invoked by using the following command:

  ```bash
  node index.js
  ```

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Demonstration

The following video shows an example of the application being used from the command line:

[![A video showing the command-line employee management application walkthrough.](https://user-images.githubusercontent.com/106384519/199663880-625cbe79-c127-4a0f-9ea3-832cff492902.mp4)



## License 

  ![License](https://img.shields.io/github/license/lalalaviv/Employee-Tracker)



## Questions

  Feel free to reach out if you have any enquiries
  <br/>
  GitHub: [@lalalaviv](https://github.com/lalalaviv)
  Email: lalala.viv@hotmail.com


## Credits

  Vivian Lee
