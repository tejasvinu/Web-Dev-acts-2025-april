import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  fetchBookById, 
  updateBook,
  selectBookById,
  selectBooksStatus, 
  selectBooksError 
} from '../features/books/bookSlice';

const categories = [
  'Fiction',
  'Non-fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Biography',
  'History',
  'Self-help',
  'Business',
  'Children',
  'Young Adult'
];

const EditBookForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(selectBookById);
  const status = useSelector(selectBooksStatus);
  const error = useSelector(selectBooksError);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
    coverImage: 'https://via.placeholder.com/150'
  });

  // Load book data when component mounts or id changes
  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [id, dispatch]);

  // Update form when book data is loaded
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        price: book.price || '',
        category: book.category || '',
        inStock: book.inStock !== undefined ? book.inStock : true,
        coverImage: book.coverImage || 'https://via.placeholder.com/150'
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.author || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const bookData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    dispatch(updateBook({ id, bookData })).then((result) => {
      if (!result.error) {
        navigate(`/books/${id}`);
      }
    });
  };

  // Helper function for button classes
  const btnClasses = (variant, disabled = false) => {
    const base = "font-bold py-2 px-4 rounded transition duration-300";
    let styles = '';
    if (variant === 'primary') styles = `${base} bg-blue-500 hover:bg-blue-700 text-white`;
    if (variant === 'secondary') styles = `${base} bg-gray-300 hover:bg-gray-400 text-gray-800`;
    
    if (disabled) {
      styles += ' opacity-50 cursor-not-allowed';
    }
    return styles;
  };

  // Input/Select/Textarea base classes
  const inputBaseClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";


  if (status === 'loading' && !book) {
    return <div className="text-center py-10 text-gray-500">Loading book data...</div>;
  }

  if (error) {
    return <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputBaseClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author*</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={inputBaseClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={inputBaseClasses}
            rows="4"
          ></textarea>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price*</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputBaseClasses}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category*</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputBaseClasses}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className={inputBaseClasses}
          />
        </div>

        <div className="flex items-center">
           <input
            id="inStockEdit" // Changed id to avoid conflict if Add form is somehow rendered nearby
            name="inStock"
            type="checkbox"
            checked={formData.inStock}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="inStockEdit" className="ml-2 block text-sm text-gray-900">
            In Stock
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className={btnClasses('primary', status === 'loading')}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/books/${id}`)}
            className={btnClasses('secondary')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
