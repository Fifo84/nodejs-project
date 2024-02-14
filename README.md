# Nodejs Project - Users & Cards CRUD

The Nodejs Project - Users & Cards CRUD is a comprehensive Node.js application designed for managing user accounts and business cards. Leveraging Express for server functionality and Mongoose for database interaction.

## Features

- **User Authentication**: Implements secure signup and login processes.
- **Account Management**: Allows users to manage their accounts.
- **Security**: Utilizes bcrypt for password hashing and JSON Web Tokens (JWT) for session management.
- **Error Handling**: Custom error handling middleware for clear, consistent error responses.
- **Error and Request Logging**: Utilizes Morgan and Winston libraries for comprehensive error and request logging, aiding in monitoring and debugging.

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies with `npm install`.
3. Edit the `.env` file at the root of the project and configure the necessary environment variables (e.g., database connection string, JWT secret).
4. Run `nodemon` to launch the server.

```bash
git clone https://github.com/fifo84/nodejs-project.git
Change into the project directory
Install dependencies
```

### Prerequisites

- Node.js (v14 or newer recommended)
- MongoDB
- npm or yarn

## API Endpoints

### User Endpoints

| No. | Method | URL          | Action            | Authorization            | Return         |
| --- | ------ | ------------ | ----------------- | ------------------------ | -------------- |
| 1   | POST   | /users       | Register user     | All                      | User object    |
| 2   | POST   | /users/login | Login             | All                      | JWT            |
| 3   | GET    | /users       | Get all users     | Admin                    | Users array    |
| 4   | GET    | /users/:id   | Get user          | Registered user or Admin | User object    |
| 5   | PUT    | /users/:id   | Edit user         | Registered user          | Updated user   |
| 6   | PATCH  | /users/:id   | Change isBusiness | Registered user          | Updated status |
| 7   | DELETE | /users/:id   | Delete user       | Registered user or Admin | Deleted user   |

### Card Endpoints

| No. | Method | URL                   | Action          | Authorization         | Return       |
| --- | ------ | --------------------- | --------------- | --------------------- | ------------ |
| 1   | GET    | /cards                | Get all cards   | All                   | Cards array  |
| 2   | GET    | /cards/my-cards       | Get user cards  | Registered user       | User's cards |
| 3   | GET    | /cards/:id            | Get card        | All                   | Card object  |
| 4   | POST   | /cards                | Create new card | Business user         | Created card |
| 5   | PUT    | /cards/:id            | Edit card       | Card creator          | Updated card |
| 6   | PATCH  | /cards/:id            | Like card       | Registered user       | Updated card |
| 7   | DELETE | /cards/:id            | Delete card     | Card creator or Admin | Deleted card |
| 8   | PATCH  | /cards/biz-number/:id | Delete user     | Admin                 | Deleted user |

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime
- [Express.js](https://expressjs.com/) - The web application framework
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Implementation of JSON Web Tokens
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for Node.js.
- [Config](https://www.npmjs.com/package/config) - Node.js application configuration management.
- [Winston](https://www.npmjs.com/package/winston) - A multi-transport async logging library for Node.js.

## Authors

- **Ofir Aaronson** - _Initial work_ - [Fifo84](https://github.com/Fifo84)

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
