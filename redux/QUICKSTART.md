# Redux Book Store - Quick Start Guide

This guide will help you get started with the Redux Book Store application.

## Prerequisites

- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. **Clone the repository or download the files**

2. **Install dependencies for the entire project:**

   ```bash
   npm run install-all
   ```

   This will install dependencies for the root project, backend, and frontend.

## Configuration

1. **Set up MongoDB:**
   - Make sure MongoDB is running locally on port 27017, or
   - Update the `.env` file in the `backend` directory with your MongoDB connection string

2. **Environment Variables:**
   - The backend uses a `.env` file with the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/redux-bookstore
     ```

## Running the Application

1. **Seed the database with sample data:**

   ```bash
   npm run seed
   ```

2. **Start both backend and frontend in development mode:**

   ```bash
   npm run dev
   ```

   This will start:
   - Backend server with nodemon at http://localhost:5000
   - Frontend Vite dev server at http://localhost:5173

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Available Scripts

- `npm run dev` - Start both backend and frontend in development mode
- `npm run server:dev` - Start only the backend with nodemon
- `npm run client` - Start only the frontend
- `npm run seed` - Seed the database with initial data
- `npm start` - Start both backend and frontend in production mode

## Learning Redux

This project is designed to help you learn Redux. Here are some resources included:

1. **REDUX_CONCEPTS.md** - Explains key Redux concepts used in this project
2. **EXERCISES.md** - Contains exercises to practice and extend Redux functionality
3. **README.md** - Project overview and structure

## Project Structure

```
redux/
├── backend/                  # Express server and MongoDB/Mongoose
│   ├── models/               # Database models
│   │   ├── Book.js           # Book model
│   ├── routes/               # API routes
│   │   ├── books.js          # Book routes
│   ├── .env                  # Environment variables
│   ├── server.js             # Express server setup
│   ├── seed.js               # Database seeding script
│   └── package.json          # Backend dependencies
└── frontend/                 # React application with Redux
    ├── public/               # Static files
    ├── src/                  # Source code
    │   ├── app/              # Redux store configuration
    │   │   └── store.js      # Redux store setup
    │   ├── components/       # React components
    │   │   ├── BookList.jsx  # Book listing component
    │   │   ├── BookDetail.jsx # Book details component
    │   │   ├── AddBookForm.jsx # Form to add books
    │   │   └── EditBookForm.jsx # Form to edit books
    │   ├── features/         # Redux features
    │   │   └── books/        # Book-related Redux code
    │   │       └── bookSlice.js # Book Redux slice
    │   ├── App.jsx           # Main app component
    │   └── main.jsx          # Entry point
    └── package.json          # Frontend dependencies
```

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book by ID
- `POST /api/books` - Create a new book
- `PATCH /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Next Steps

After getting familiar with the application, try the exercises in `EXERCISES.md` to enhance your understanding of Redux and add new features to the application.
