🌱 Agri Store - Backend API
This directory contains the complete backend server and API for the Agri Store e-commerce application. It is built with Node.js and Express.js, and it interacts with a MongoDB database.

The API is responsible for managing users, authentication, products, shopping carts, and orders.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose

Authentication: JSON Web Tokens (JWT) & bcrypt.js

Middleware: CORS, Multer (for future file uploads)

🚀 Getting Started
To run the backend server locally, follow these steps.

Navigate to the backend directory:

Bash

cd backend
Install dependencies:

Bash

npm install
Set up Environment Variables:

Create a file named .env in the root of the backend folder.

Add the following variables and replace the values with your own:

Code snippet

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_strong_secret_key_for_jwt
PORT=5000
Run the Server:

The project uses nodemon to automatically restart the server on file changes.

Use the following command to start the development server:

Bash

npm run dev
The API will be running on http://localhost:5000.

📝 API Endpoint Documentation
All endpoints are prefixed with /api.

Authentication (/api/auth)
Method	Endpoint	Description	Access
POST	/register	Register a new user.	Public
POST	/login	Log in a user, returns JWT.	Public

Export to Sheets
Products (/api/products)
Method	Endpoint	Description	Access
GET	/	Get a list of all products.	Public
POST	/	Create a new product.	Private (Admin)
GET	/:id	Get details of a single product.	Public
PUT	/:id	Update a product's details.	Private (Admin)
DELETE	/:id	Delete a product.	Private (Admin)

Export to Sheets
Shopping Cart (/api/cart)
Method	Endpoint	Description	Access
GET	/	Get the logged-in user's cart.	Private
POST	/add	Add a product to the cart.	Private
DELETE	/remove/:productId	Remove a product from the cart.	Private

Export to Sheets
Orders (/api/orders)
Method	Endpoint	Description	Access
POST	/checkout	Create a new order from the user's cart.	Private
GET	/myorders	Get the logged-in user's order history.	Privat