# User Management Application

This is a User Management application built with React. It allows you to view, add, edit, and delete users. The users are fetched from an API and displayed in a responsive table with actions available for each user. The form to add or edit users is included and it validates inputs before submission.

## Features

- Fetch users from a placeholder API (`https://jsonplaceholder.typicode.com/users`) with pagination.
- Add new users to the list.
- Edit existing users.
- Delete users from the list.
- Form validation for required fields and valid email.
- Scroll-based pagination to fetch more users as the user scrolls down the page.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the API.
- **UUID**: For generating unique identifiers for users.
- **CSS**: For styling and responsiveness.

## Getting Started

### Prerequisites

- You need to have `Node.js` and `npm` installed to run this application.

### Installation

1. Clone this repository:
   ```bash
   git clone <repo-url>
   ```

Application Breakdown

1. UserList Component
   The UserList component is responsible for displaying the list of users in a table format. It includes actions to delete and edit users.

Queries Used in UserList.js:
Fetching User Data:
The user data is fetched using the componentDidMount lifecycle method, which makes an API request to https://jsonplaceholder.typicode.com/users.
Pagination: The handleScroll function listens for scroll events, and when the user reaches the bottom of the page, more users are fetched based on the current page. 2. UserForm Component
The UserForm component is used for adding and editing users. It includes fields for first name, last name, email, and department. It validates form inputs and displays error messages if any validation fails.

Queries Used in UserForm.js:
Add User:

When the form is submitted, a POST request is made to https://jsonplaceholder.typicode.com/users to add a new user.
A unique UUID is generated for each new user using the uuidv4() method.
Edit User:

If the form is in edit mode (i.e., when currentUser is set), a PUT request is sent to update the user's details at https://jsonplaceholder.typicode.com/users/{userId}.
Form Validation:

Checks if all fields are filled.
Validates that the email input follows a valid email format. 3. Error Boundary Component
The ErrorBoundary component is used to catch JavaScript errors anywhere in the component tree, log those errors, and display a fallback UI instead of crashing the app.

Queries Used in ErrorBoundary.js:
getDerivedStateFromError:
Updates the state when an error is caught, allowing the component to render an error message instead of crashing.
componentDidCatch:
Logs the error details for debugging purposes. 4. App Component
The App component manages the state for the entire application, including user data, error messages, and form visibility.

Queries Used in App.js:
Fetching Data:

Users are fetched using an axios.get request to https://jsonplaceholder.typicode.com/users?_page={page}&_limit=10.
Scroll-Based Pagination:

As the user scrolls to the bottom of the page, more users are fetched by incrementing the page number.
Add/Edit/Delete Users:

The addUser, editUser, and deleteUser methods use axios to make POST, PUT, and DELETE requests respectively to the API. 5. CSS Styling
The application includes CSS to ensure that it is responsive and user-friendly.

Queries Used in App.css:
Responsive Design:

The table is designed to be scrollable on small screens using the .table-wrapper class.
Media queries are used to adjust table styles for different screen sizes (max-width: 576px for mobile, max-width: 768px for tablets, and min-width: 1024px for desktop).
Hover Effects:

The table rows and buttons have hover effects to improve the user interface.
Focus Styles:

Buttons and table elements have focus styles to improve accessibility for keyboard and screen reader users.
