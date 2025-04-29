import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  fetchBookById,
  deleteBook,
  selectBookById,
  selectBooksStatus,
  selectBooksError
} from '../features/books/bookSlice';

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(selectBookById);
  const status = useSelector(selectBooksStatus);
  const error = useSelector(selectBooksError);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [id, dispatch]);

  const handleDeleteBook = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(id)).then(() => {
        navigate('/');
      });
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-10 text-gray-500">Loading book details...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!book) {
    return <div className="text-center py-10 text-red-500">Book not found</div>;
  }

  // Helper function for button classes
  const btnClasses = (variant) => {
    const base = "font-bold py-2 px-4 rounded transition duration-300";
    if (variant === 'primary') return `${base} bg-blue-500 hover:bg-blue-700 text-white`;
    if (variant === 'danger') return `${base} bg-red-500 hover:bg-red-700 text-white`;
    if (variant === 'secondary') return `${base} bg-gray-300 hover:bg-gray-400 text-gray-800`;
    return base;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full md:w-1/3 h-auto object-cover rounded" 
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{book.title}</h2>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${book.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Category:</span> {book.category}</p>
          <p className={`mb-4 ${book.inStock ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-semibold text-gray-700">Status:</span> {book.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to={`/edit/${book._id}`} className={btnClasses('primary')}>
              Edit Book
            </Link>
            <button 
              onClick={handleDeleteBook} 
              className={btnClasses('danger')}
            >
              Delete Book
            </button>
            <Link to="/" className={btnClasses('secondary')}>
              Back to List
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t pt-6">
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">Description</h3>
        <p className="text-gray-700 leading-relaxed">{book.description || 'No description available.'}</p>
      </div>
    </div>
  );
};

export default BookDetail;
