# Note Auth

A secure note-taking API built with Express.js featuring user authentication and SQLite persistence.

## Features

- **User Registration & Login** - Secure user account creation and authentication
- **JWT Authentication** - Token-based authentication for protected endpoints
- **Password Hashing** - Passwords hashed with bcrypt for security
- **User Notes** - Create and retrieve personal notes linked to user accounts
- **SQLite Database** - Lightweight, file-based database for data persistence

## Tech Stack

- **Express.js** - Web framework for Node.js
- **better-sqlite3** - SQLite3 bindings for Node.js
- **bcrypt** - Password hashing library
- **jsonwebtoken** - JWT token generation and verification
- **dotenv** - Environment variable management

## Project Structure

```
note-auth/
├── controllers/          # Request handlers and business logic
│   ├── authController.js # Authentication logic
│   └── noteController.js # Note CRUD operations
├── models/              # Database models and queries
│   └── db.js           # SQLite database initialization
├── middleware/          # Express middleware
│   └── authMiddleware.js # JWT verification
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd note-auth
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
JWT_SECRET=your_secret_key_here
```

4. Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Authentication

#### Register

- **POST** `/register`
- **Body**: `{ "username": "string", "password": "string" }`
- **Response**: `{ "message": "Registered successfully" }`

#### Login

- **POST** `/login`
- **Body**: `{ "username": "string", "password": "string" }`
- **Response**: `{ "token": "jwt_token" }`

### Notes (Requires Authentication)

#### Get All Notes

- **GET** `/notes`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "result": [{ "id": number, "title": string, "content": string, "user_id": number }] }`

#### Create Note

- **POST** `/notes`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "title": "string", "content": "string" }`
- **Response**: Success/error message

## Usage Example

### Using Postman

1. **Register a new user:**
   - Method: `POST`
   - URL: `http://localhost:3000/register`
   - Body (JSON): `{ "username": "john", "password": "password123" }`

2. **Login:**
   - Method: `POST`
   - URL: `http://localhost:3000/login`
   - Body (JSON): `{ "username": "john", "password": "password123" }`
   - Copy the token from the response

3. **Get all notes:**
   - Method: `GET`
   - URL: `http://localhost:3000/notes`
   - Headers: `Authorization: Bearer <your_token>`

4. **Create a note:**
   - Method: `POST`
   - URL: `http://localhost:3000/notes`
   - Headers: `Authorization: Bearer <your_token>`
   - Body (JSON): `{ "title": "My Note", "content": "This is my first note" }`

5. **Update a note:**
   - Method: `PUT`
   - URL: `http://localhost:3000/notes/:id`
   - Headers: `Authorization: Bearer <your_token>`
   - Body (JSON): `{ "title": "Updated Title", "content": "Updated content" }`

6. **Delete a note:**
   - Method: `DELETE`
   - URL: `http://localhost:3000/notes/:id`
   - Headers: `Authorization: Bearer <your_token>`


## Database Schema

### Users Table

| Column   | Type    | Description     |
| -------- | ------- | --------------- |
| id       | INTEGER | Primary key     |
| username | TEXT    | Unique username |
| password | TEXT    | Hashed password |

### Notes Table

| Column  | Type    | Description         |
| ------- | ------- | ------------------- |
| id      | INTEGER | Primary key         |
| title   | TEXT    | Note title          |
| content | TEXT    | Note content        |
| user_id | INTEGER | Foreign key (users) |

## Security Considerations

- Passwords are hashed using bcrypt before storage
- JWT tokens are used for stateless authentication
- Environment variables protect sensitive data like JWT_SECRET
- Foreign key constraints ensure data integrity

## Future Enhancements

- Update and delete note endpoints
- Error handling improvements
- Input validation and sanitization
- Rate limiting for API endpoints
- Refresh token implementation
- Unit and integration tests

## License

ISC
