import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook, selectAllBooks, selectBooksStatus, selectBooksError } from '../features/books/bookSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const status = useSelector(selectBooksStatus);
  const error = useSelector(selectBooksError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(id));
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-10 text-gray-500">Loading books...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">No books available</h2>
        <p className="text-gray-600 mb-4">Add some books to get started!</p>
        <Link 
          to="/add" 
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-48 object-cover" // Adjusted height
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-1 truncate">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              <p className="text-lg font-bold text-blue-600 mb-3">${book.price.toFixed(2)}</p>
              <div className="mt-auto space-y-2"> 
                <Link 
                  to={`/books/${book._id}`} 
                  className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
                >
                  View Details
                </Link>
                <Link 
                  to={`/edit/${book._id}`} 
                  className="block w-full text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 text-sm"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDeleteBook(book._id)} 
                  className="block w-full text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
