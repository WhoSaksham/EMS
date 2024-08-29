# EMS - Employee Management System

[EMS]() is a web app for managing Employees.

## Usage

```
Deployed URL - https://ems.onrender.com
```

## Understanding
The application has 5 pages:
 - Login
 - Register
 - Departments
 - Employees
 - Employee Details

### Login
The Users (Employees and Managers) can access the page to Login themselves to access the application.

### Register
The Users (Employees and Managers) can access the page to Register themselves to start using the application by filling the necessary details (Name, Location, Email, Password and Role).

### Departments
The Departments page can only be accessible by Managers as per both Frontend Logic and Backend Logic.

The Managers can View, Add, Edit and Delete the Departments.

### Employees
The Employees page can only be accessible by Employees and Managers both as per both Frontend Logic and Backend Logic.

The Employees can View and Add the Employees but not Edit, Delete or Assign Employees (to a particular Department).

The Managers can View, Add, Edit, Delete and Assign Employees (to a particular Department).

Addition to this, there is two filters named `Location Filter` and `Name Filter`. Using this, the Employees List can be sorted out according to the Location and/or Name in Ascending/Descending order.

### Employee Details
The Employee Details page can be accessible by clicking on the name of any Employee from the Table of Employees List. 

The Managers can access any Employees' Details by clicking on Name, but Employees can access only their Details and not others.

## Features

### Backend
 - Error Handling, and Good Error Messages
 - Authentication and Authorization
 - Middlewares
 - Pagination
 - Clean and Readable Code
 - Data Validation
 - MVC Architecture

### Frontend
 - Lazy Loading and Suspense
 - Authentication and Authorization
 - Role Permissions
 - Custom Component Widgets
 - Data Validation
 - Clean and Readable Code

## Tech Stack
 - React.js
 - Node.js
 - Express.js
 - MongoDB

## Note
The Server is deployed on a free hosting platform, thus it has some limitations, like the server will spin down due to inactivity after a while. To spin up the server, you need to hit a request to server and wait for a minute to work.