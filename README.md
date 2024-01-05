# Employee Tracker
Content management for employees

## Purpose
Build an app that runs in the CLI and allows a user to manage employee information. The user can access and change information regarding the departments, roles, and employees at the company.

## User Story

AS A business owner

I WANT to be able to view and manage the departments, roles, and employees in my company

SO THAT I can organize and plan my business

## Acceptance Criteria

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

## Usage
To ensure the application will work make sure to run "npm install" and "node index.js" in your CLI

## Screenshot
Please refer to the following video link(s) as a reference for the application's appearance and functionality:

[CLI Employee Tracker Demo Video](https://drive.google.com/file/d/1ZaS6WP8qO6Zh8Nx5PSOwkgYoq1jmaP4b/view) <br/>

## Code Sources and Collaborators
I had the opportunity to collaborate with my peers Kenny and Mustapha. We checked our work with one another.

In addition, I received feedback from my instructor, Diego, my TA, Andrew, as well as my tutor, Corey.

All code used was self-generated or otherwise gathered from class materials.