# MindTask - AI-Powered Task Manager

A surreal, minimalist to-do app with AI-generated tasks powered by Google's Gemini API.

## Features

- **AI Task Generation**: Enter your goals, projects, or situations and get AI-generated actionable tasks
- **Immersive UI**: Surreal, minimalist design with glass morphism and subtle animations 
- **Responsive**: Works beautifully on all devices
- **Task Management**: Create, edit, delete, and mark tasks as complete

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend directory with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## How to Use the AI Task Generator

1. Log in to your account
2. On the Tasks page, you'll see the AI Task Generator dialog
3. Enter a description of your goal, project, or situation
4. Click "Generate Tasks"
5. The AI will create 3-5 specific, actionable tasks based on your input
6. Tasks will appear in your task list, where you can manage them like regular tasks

## Example Prompts for the AI

- "I need to plan a website redesign project for a small business"
- "I'm organizing a birthday party for my friend next weekend"
- "I need to prepare for a job interview in the tech industry"
- "I'm moving to a new apartment next month and need to get organized"
- "I want to start a healthy meal prep routine for the work week"

## Technology Stack

- React
- Google Gemini AI API
- Tailwind CSS
- Express.js backend
- MongoDB database
