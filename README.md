# Project Name

## Overview
This project aims to provide a user authentication system by implementing a login feature. It includes the implementation of a login model, service, and controller.

## Features

### Login Model
The login model has been added to the project to handle the user authentication data. It includes the following attributes:
- `email`: A string representing the user's email.
- `password`: A string representing the user's password (we need encrypt in the future).
- `imei`: A string representing the International Mobile Equipment Identity (IMEI) number of the user's device.
- `user_id`: An identifier representing the unique ID of the user.

### Login Service
The login service has been created to handle user authentication and related functionalities. It includes the following functions:
- `createUser(email, password, imei)`: This function allows the creation of a new user in the system. It takes the `email`, `password`, and `imei` as input and stores them securely in the database.

### User Controller
The user controller has been added to manage user-related interactions with the system. It includes the following function:
- `userCreate(req, res)`: This function is responsible for handling HTTP requests related to user creation. It takes the request (`req`) and response (`res`) objects as inputs and utilizes the login service's `createUser` function to create a new user.

## Programming Styles
In this project, we follow the following programming styles:

- Class Naming and Controllers: We use `PascalCase` style for class names and controllers. For example, `UserController`, `UserProfileController`.

- Variables and Function Naming: We use `camelCase` style for variables and function names. For example, `userModel`, `getUserById`.

- Route URLs: We use `kebab-case` style for route URLs in Express. For example, `/user/`.

By following these styles, we aim to maintain code consistency and readability throughout the project.
