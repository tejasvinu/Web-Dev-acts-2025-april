import { Routes, Route, Link } from 'react-router-dom'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import AddBookForm from './components/AddBookForm'
import EditBookForm from './components/EditBookForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">
            <h1>Redux Book Store</h1>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200">Books</Link>
            </li>
            <li>
              <Link to="/add" className="hover:text-blue-200">Add Book</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/add" element={<AddBookForm />} />
          <Route path="/edit/:id" element={<EditBookForm />} />
        </Routes>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>Redux Book Store - A Demo Application for Learning Redux</p>
      </footer>
    </div>
  )
}

export default App
