User Dashboard (React)
A simple and responsive User Dashboard built with React.
It fetches user data from a public API and provides search, sorting, and pagination features.

Features:

Fetch users from API

Display users in card layout (Name, Email, City)

Search users by name (with debounce)

Sort users (A → Z, Z → A)

Pagination

Loading state

Error handling

Fully responsive (mobile + desktop)

Tech Stack
React (Functional Components + Hooks)

JavaScript (ES6+)

CSS (basic inline styling)

Project Structure
src/
│── App.js
│── App.css
│── index.js
│── User.jsx   // main dashboard component
│── App.test.js
│── reportWebVitals.js
│── setupTests.js
API Used
https://jsonplaceholder.typicode.com/users
Installation & Setup
Clone the repository:

git clone https://github.com/rohanbhairi/task_userDashboard.git
Navigate to the project folder:

Install dependencies:

npm install
Start the development server:

npm start
Open in browser:

http://localhost:3000

Bonus Implementations
Debounced search (custom hook)

Pagination logic

Error + loading states

Clean UI without external libraries

License
This project is open-source and free to use.
