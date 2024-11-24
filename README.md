# Backend Engineer Work Sample

## Overview

This project provides a basic implementation for managing users in a database using Express.js, Mongoose, and MongoDB. It includes endpoints to create and retrieve users, with support for sorting and pagination.

## Features

-   Create a new user with a unique id, name, email address, and creation date
-   Retrieve all users with optional sorting and pagination
-   Support for query parameter `created` to sort users by creation date ascending or descending

## Scripts

- `npm install` Install dependencies to run tests or dev server without docker.

-   `npm start`: Starts the server
-   `npm run dev`: Starts the nodemon dev server
-   `npm test`: Executes the tests

## Run the development containers:

````bash
docker-compose up --build
````


## Project Structure

````

src/
├── config/ # Configurations (database, logger, etc.)
├── controllers/ # Handles HTTP requests.
├── errors/ # Custom error classes.
├── models/ # Mongoose schemas/models.
├── repositories/ # Database queries abstraction.
├── routers/ # Route definitions.
├── services/ # Business logic.
├── utils/ # Reusable helpers.
└── app.ts # App setup.

````

## Endpoints

### 1. Create a User

**POST /users**

-   Description: Adds a new user to the database.
-   Request Body:

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890"
}
````

-   Response:

```json
{
    "_id": "unique-user-id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "createdAt": "2024-11-21T10:00:00.000Z"
}
```

### 2. Retrieve All Users

**GET /users**

-   Description: Fetches all users with optional sorting and pagination.
-   Query Parameters:
    -   `skip` (optional): Number of users to skip (default: 0).
    -   `limit` (optional): Number of users to retrieve (default: 10).
    -   `created` (optional): Sort by creation date. Accepts `asc` or `desc` (default: `asc`).
-   Response:

```json
[
    {
        "_id": "unique-user-id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "createdAt": "2024-11-21T10:00:00.000Z"
    }
]
```
