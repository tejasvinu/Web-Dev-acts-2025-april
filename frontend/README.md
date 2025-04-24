# React Todo Application

This Todo application is built with React and Tailwind CSS as a teaching resource to demonstrate various React concepts and best practices.

## Features and React Concepts Implemented

### 1. Lists and Keys
- **TaskList Component**: Demonstrates proper use of the `key` prop when rendering multiple components in a list
- **Basic List Component**: Shows how to efficiently render arrays of data in React
- **Multiple Component Rendering**: Showcases techniques for rendering collections of components from data arrays

### 2. Working with Forms and Inputs
- **TaskForm Component**: Complete example of controlled form components
- **Form Validation**: Client-side validation techniques  
- **Input State Management**: Managing form input state with useState hook

### 3. Refs and the DOM
- **Focus Management**: Using refs to programmatically focus elements
- **DOM Access**: Safe patterns for accessing DOM elements directly when necessary
- **useRef Hook**: Proper usage of the useRef hook for persisting values between renders

### 4. Lifting State Up
- **Shared State**: Components sharing state by lifting it to their closest common ancestor
- **Temperature Converter Example**: Classic React example showing bidirectional data flow
- **Parent-Child Communication**: Patterns for communication between parent and child components

### 5. Error Boundaries
- **Error Handling**: Graceful error handling with React's Error Boundary feature
- **Fallback UIs**: Providing user-friendly fallback interfaces when errors occur
- **Error Reporting**: Capturing and reporting errors in component hierarchies

### 6. Composition vs. Inheritance
- **Containment Pattern**: Using children prop to create wrapper components
- **Specialization Pattern**: Creating specialized components from more generic ones
- **Component Reusability**: Building a component system with high reusability

### 7. Thinking in React
- **Component Hierarchy**: Breaking UI into a component hierarchy
- **Single Responsibility Principle**: Components focused on doing one thing well
- **State Management**: Identifying and placing state in the right components
- **Data Flow**: Following React's unidirectional data flow principles

## Application Architecture

### Context API for State Management
- **AuthContext**: Manages authentication state across the app
- **TaskContext**: Provides task management functionality to components

### React Router for Navigation
- **Route Protection**: Securing routes with authentication checks
- **Declarative Routing**: Component-based routing structure

### Component Organization
- **Pages**: Container components representing entire app views
- **Components**: Reusable UI elements with specific functionality
- **Context**: Global state providers
- **Utils**: Utility functions and services

## API Integration
- **Axios Integration**: Clean API service for backend communication
- **API Error Handling**: Proper error handling for API calls
- **Authentication**: Token-based authentication with the backend

## Getting Started

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

3. The application will be available at `http://localhost:5173`

## Building for Production

```
npm run build
```

## Key Files and Their Purpose

- **App.jsx**: Main application component with routing setup
- **AuthContext.jsx**: Authentication state management
- **TaskContext.jsx**: Task management state and operations
- **Navigation.jsx**: App-wide navigation component
- **PrivateRoute.jsx**: Route protection for authenticated users
- **TaskForm.jsx**: Form handling for task creation/editing
- **TaskList.jsx**: Rendering lists of tasks with proper keys
- **TaskItem.jsx**: Individual task display and management
- **ErrorBoundary.jsx**: Error handling for component failures
- **Home.jsx**: Landing page with app introduction
- **Tasks.jsx**: Main task management interface
- **ReactExamples.jsx**: Educational examples of React concepts
- **api.js**: Backend API communication service
