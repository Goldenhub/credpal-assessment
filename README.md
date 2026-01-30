# CredPal Assessment

## Todo API

A backend assessment project built with **Node.js, Express, TypeScript, and MongoDB**, implementing a **CRUD Todo API** with authentication.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Testing](#testing)

---

## Features

- Full CRUD operations for **Todos**
- User registration and login with **JWT authentication**
- Password hashing and secure storage
- Ownership checks: users can only access their own Todos
- Repository pattern to **decouple database from business logic**
- Controllers only handle HTTP requests; services contain business logic

---

## Tech Stack

- **Node.js** + **TypeScript**
- **Express** web framework
- **MongoDB** + Mongoose ODM
- **bcrypt** for password hashing
- **jsonwebtoken** for authentication
- **Postman** ready for endpoint testing

---

## Architecture

The project is designed with **separation of concerns** in mind:

| Layer          | Responsibility                                                          |
| -------------- | ----------------------------------------------------------------------- |
| **Model**      | Mongoose schema + data invariants (password hashing, toJSON transforms) |
| **Repository** | Encapsulates all database operations (CRUD, queries)                    |
| **Service**    | Business logic, JWT generation, password comparison                     |
| **Controller** | HTTP request/response handling only                                     |
| **DTO**        | DTO for validation                                                      |
| **Routes**     | Expose API endpoints and attach middleware for authentication           |

---

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables

```bash
DATABASE_URL=<your-mongodb-uri>
ACCESS_TOKEN_SECRET=<your-jwt-secret>
ACCESS_TOKEN_EXPIRATION=<your-jwt-expiration>
PORT=<your-port>
```

## Running the project

- Development mode:

```bash
npm run dev
```

- Build and run:

```bash
npm run build
npm start
```

The API will run on localhost

## Testing

- use Postman or any REST client
