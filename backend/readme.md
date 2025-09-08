🌱 Agri Store – Backend API

This directory contains the backend server and REST API for the BSC Agripreneur E-commerce Application.
It is built with Node.js and Express.js, and interacts with a MongoDB database.

The API manages users, authentication, products, shopping carts, and orders, including image uploads to Cloudinary.

🚀 Getting Started

Follow these steps to run the backend server locally.

📂 Navigate to Backend
cd backend

📦 Install Dependencies
npm install

⚙️ Setup Environment Variables

Create a file named .env in the /backend directory and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_for_jwt
PORT=5000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

▶️ Run the Server
npm run dev


The API will be available at 👉 http://localhost:5000

📝 API Endpoint Documentation

All endpoints are prefixed with:

/api

🔐 Authentication (/api/auth)
Method	Endpoint	Description	Access
POST	/register	Register a new user	Public
POST	/login	Log in user, returns JWT	Public
🛒 Products (/api/products)
Method	Endpoint	Description	Access
GET	/	Get all products (filter by ?category=...)	Public
POST	/	Create a new product (with image upload)	Private (Admin)
GET	/:id	Get details of a single product	Public
PUT	/:id	Update product details	Private (Admin)
DELETE	/:id	Delete a product + images from Cloudinary	Private (Admin)
🛍 Shopping Cart (/api/cart)
Method	Endpoint	Description	Access
GET	/	Get logged-in user's cart	Private
POST	/add	Add product to cart	Private
DELETE	/remove/:id	Remove product from cart	Private
📦 Orders (/api/orders)
Method	Endpoint	Description	Access
POST	/checkout	Create a new order from user's cart	Private
GET	/myorders	Get logged-in user's order history	Private
