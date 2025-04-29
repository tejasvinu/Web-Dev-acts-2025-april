# Redux Book Store - Learning Redux

This project is a MERN stack application designed to teach Redux concepts through a practical book store application. It uses Vite for the React frontend and Mongoose for MongoDB database interactions.

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

## Key Redux Concepts Demonstrated

1. **Redux Store**: Centralized state management
2. **Redux Slices**: Organizing reducers and actions
3. **Redux Toolkit**: Modern Redux best practices
4. **Thunks**: Handling async operations
5. **Selectors**: Accessing and deriving state

## Features

- View a list of books
- View book details
- Add new books
- Edit existing books
- Delete books
- Filter books by category

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/redux-bookstore
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Learning Path

1. **Understanding Store Setup**: Examine `src/app/store.js`
2. **Exploring Redux Slice**: Study `src/features/books/bookSlice.js`
3. **Redux with React Components**: See how components use Redux in `src/components/`
4. **Async Operations**: Look at thunks in `bookSlice.js`
5. **State Selection**: Learn about selectors in components

## Redux Concepts

### Store

The store is the central state container. It's configured in `src/app/store.js`.

### Slice

A slice contains the reducer logic and actions for a specific feature. The book slice (`bookSlice.js`) manages all book-related state.

### Actions and Reducers

Redux Toolkit combines these concepts. Actions are created using `createSlice` and reducers are automatically generated.

### Thunks

Asynchronous operations like API calls are handled using thunks. See the `fetchBooks`, `addBook`, etc. functions in `bookSlice.js`.

### Selectors

Selectors help components access specific parts of the state. See `selectAllBooks`, `selectBookById`, etc.
