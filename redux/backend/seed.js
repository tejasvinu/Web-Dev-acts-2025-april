const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/Book');

// Sample books data
const bookData = [
  {
    title: 'The Redux Handbook',
    author: 'Jane Developer',
    description: 'A comprehensive guide to understanding and using Redux in modern web applications. Learn how to manage state effectively in large-scale applications.',
    price: 29.99,
    category: 'Programming',
    inStock: true,
    coverImage: 'https://picsum.photos/seed/redux/300/450'
  },
  {
    title: 'React Patterns',
    author: 'John Smith',
    description: 'Master the most common and effective React design patterns. Improve your component architecture and application structure.',
    price: 24.99,
    category: 'Programming',
    inStock: true,
    coverImage: 'https://picsum.photos/seed/react/300/450'
  },
  {
    title: 'MongoDB for Beginners',
    author: 'Sarah Johnson',
    description: 'Start your journey with MongoDB. This book covers everything from installation to advanced queries and database design.',
    price: 19.99,
    category: 'Database',
    inStock: true,
    coverImage: 'https://picsum.photos/seed/mongodb/300/450'
  },
  {
    title: 'Full-Stack Development',
    author: 'Michael Wilson',
    description: 'Learn to build complete web applications from front-end to back-end using modern JavaScript frameworks and tools.',
    price: 34.99,
    category: 'Programming',
    inStock: false,
    coverImage: 'https://picsum.photos/seed/fullstack/300/450'
  },
  {
    title: 'Express.js Deep Dive',
    author: 'David Brown',
    description: 'An in-depth exploration of Express.js for building robust Node.js web applications and APIs.',
    price: 22.99,
    category: 'Programming',
    inStock: true,
    coverImage: 'https://picsum.photos/seed/express/300/450'
  },
  {
    title: 'State Management Strategies',
    author: 'Emily Clark',
    description: 'Compare different state management libraries including Redux, MobX, Context API, and Recoil. Learn when to use each one.',
    price: 27.99,
    category: 'Programming',
    inStock: true,
    coverImage: 'https://picsum.photos/seed/state/300/450'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/redux-bookstore')
  .then(() => {
    console.log('MongoDB connected for seeding');
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await Book.deleteMany({});
    console.log('Existing books removed');

    // Insert new data
    const books = await Book.insertMany(bookData);
    console.log(`${books.length} books seeded successfully`);

    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}
