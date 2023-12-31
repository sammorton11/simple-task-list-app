# simple-task-list-app

Todo List App
Overview
This project is a simple CRUD (Create, Read, Update, Delete) Todo List application built with React on the frontend and Node.js, Sequelize, and PostgreSQL on the backend.

Features
User Authentication: Users can sign up, log in, and log out securely.

Task Management: Add, edit, and delete tasks with ease.

Responsive Design: The application is designed to work seamlessly on various devices.

Tech Stack
Frontend: React with React Router

Backend: Node.js, Sequelize (ORM for PostgreSQL)

Database: PostgreSQL

Authentication: JWT (JSON Web Tokens)

Styling: Custom CSS




Getting Started


Clone the repository:
```
git clone https://github.com/your-username/todo-list-app.git
Install dependencies for both frontend and backend:
```

```
cd todo-list-app/frontend
npm install

cd ../backend
npm install
Configure the database:
```

Create a PostgreSQL database.
Update the database configurations in backend/config/config.json.


Run the application:
```
# Start the backend server
cd backend
npm start
```

# Start the frontend development server
```
cd ../frontend
npm start
```

Open your browser and navigate to http://localhost:3000 to view the app.

API Endpoints:
GET /api/todos/todo/:user_id: Get all todos for a specific user.

POST /api/todos/todo/:user_id: Add a new todo for a user.

PUT /api/todos/todo/:user_id/:id: Update a todo for a user.

GET /api/todos/todo/:user_id/:id: Get a specific todo for a user.

DELETE /api/todos/todo/:user_id/:id: Delete a todo for a user.

DELETE /api/todos/todo/:user_id: Delete all completed todos for a user.



![Screen Shot 2023-12-19 at 10 00 13 AM](https://github.com/sammorton11/simple-task-list-app/assets/86651172/886c4674-6b74-45c9-8b99-9c868f0e1402)


