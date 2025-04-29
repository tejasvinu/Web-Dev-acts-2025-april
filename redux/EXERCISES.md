# Redux Learning Exercises

This file contains a series of exercises designed to help you practice and master Redux concepts using this book store application.

## Exercise 1: Add a Search Feature

**Objective**: Implement a search feature that filters books by title or author.

**Tasks**:
1. Update the bookSlice.js:
   - Add a new state property called `searchTerm`
   - Create a new action to update the search term
   - Create a selector that returns filtered books based on the search term

2. Create a SearchBar component:
   - Add an input field for the search term
   - Dispatch an action when the search term changes

3. Update the BookList component:
   - Use the new selector to get filtered books
   - Render the SearchBar component

**Hints**:
- Use the existing Redux infrastructure
- Filter books in a selector, not in the component

## Exercise 2: Add Book Categories Feature

**Objective**: Add the ability to filter books by category.

**Tasks**:
1. Update the bookSlice.js:
   - Add a `selectedCategory` state property
   - Create an action to update the selected category
   - Create a selector that returns books filtered by category

2. Create a CategoryFilter component:
   - Display a list of available categories from the books
   - Allow the user to select a category
   - Dispatch an action when a category is selected

3. Update the BookList component:
   - Use the new selector to get filtered books
   - Render the CategoryFilter component

**Hints**:
- Extract unique categories from the list of books
- Use a selector to combine filtering by search term and category

## Exercise 3: Add a Shopping Cart Feature

**Objective**: Implement a shopping cart for the book store.

**Tasks**:
1. Create a new cartSlice.js:
   - Initialize state with items, totalQuantity, and totalPrice
   - Create actions: addToCart, removeFromCart, updateQuantity, clearCart
   - Create selectors for cart items, total quantity, and total price

2. Create CartItem and CartSummary components:
   - Display items in cart with quantity controls
   - Show the total price
   - Add a "Checkout" button

3. Update the BookDetail component:
   - Add an "Add to Cart" button
   - Dispatch the addToCart action when clicked

4. Create a CartPage component:
   - List all items in the cart
   - Allow the user to update quantities or remove items
   - Show the order total

**Hints**:
- Don't forget to add the cartReducer to the store
- Use `createSelector` for derived data like total price

## Exercise 4: Implement User Authentication

**Objective**: Add a basic authentication system.

**Tasks**:
1. Create a new authSlice.js:
   - Track user information, authentication status, and errors
   - Create actions for login, logout, and registration
   - Create thunks for async authentication operations

2. Create Login and Register components:
   - Create forms for login and registration
   - Dispatch the appropriate actions

3. Update the App component:
   - Add login/logout navigation
   - Create protected routes for adding/editing books

**Hints**:
- Use localStorage to persist authentication tokens
- Add an auth header to API requests when the user is authenticated

## Exercise 5: Add Book Reviews

**Objective**: Allow users to leave reviews for books.

**Tasks**:
1. Update the Book model on the backend:
   - Add a reviews array field with user, rating, and comment
   
2. Create API endpoints for reviews:
   - POST /api/books/:id/reviews
   - GET /api/books/:id/reviews

3. Update the bookSlice.js:
   - Create a thunk for adding a review
   - Update the state to include reviews for a book

4. Create ReviewForm and ReviewList components:
   - Display existing reviews
   - Allow authenticated users to add reviews

**Hints**:
- Reviews should be associated with a user ID
- Use a form to collect review data

## Exercise 6: Performance Optimization

**Objective**: Optimize your Redux application for better performance.

**Tasks**:
1. Implement memoized selectors with `createSelector`:
   - Create a selector for filtered books
   - Create a selector for book categories

2. Use React.memo for components:
   - Wrap list item components with React.memo
   - Implement proper equality checking

3. Optimize normalize state shape:
   - Store books in an entities/ids structure
   - Update selectors and reducers accordingly

**Hints**:
- Use the Redux DevTools extension to profile performance
- Check unnecessary re-renders with React DevTools

## Exercise 7: Advanced State Management

**Objective**: Implement more advanced Redux patterns.

**Tasks**:
1. Add pagination for the book list:
   - Track current page, page size, and total items
   - Create actions to change the page
   - Update the API calls to include pagination parameters

2. Implement data caching:
   - Track when data was last fetched
   - Only fetch new data if needed (based on time or other conditions)

3. Add request cancellation:
   - Use AbortController to cancel API requests
   - Add logic to prevent race conditions

**Hints**:
- Use the Redux Toolkit QuerySlice pattern
- Consider using RTK Query for advanced data fetching
