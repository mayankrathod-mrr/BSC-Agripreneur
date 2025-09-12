🌱 BSC Agripreneur - Full-Stack E-commerce Platform
Welcome to BSC Agripreneur, a complete e-commerce web application built for agricultural products. This project demonstrates a full-stack application using the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) and includes a rich set of features designed to provide a seamless and professional user experience.

The application is fully translated into English, Hindi (हिन्दी), and Marathi (मराठी).

Live Demo: [Link to your deployed website will go here]

📸 Screenshots
<!-- Add screenshots of your application here to make your project look professional! -->

Homepage: (Add a screenshot of your homepage with the slider)

Products Page: (Add a screenshot of your products list with real images)

Admin Dashboard: (Add a screenshot of your "Add Product" form)

Cart & Order History: (Add screenshots of the cart and order pages)

✨ Key Features
Full E-commerce Flow: Complete user journey from browsing products to placing an order.

User Authentication: Secure user registration and login system using JSON Web Tokens (JWT).

Admin & User Roles: A protected admin dashboard for managing products, separate from the regular user view.

Product Management: Admins can add new products, including details and real images.

Cloud Image Uploads: Product images are uploaded directly to a Cloudinary cloud service for fast and reliable hosting.

Dynamic Product Catalog: Users can browse all products or filter them by category.

Search Functionality: A working search bar to find products by name.

Product Reviews & Ratings: Logged-in users can leave a star rating and a written comment on products.

Shopping Cart: A fully functional cart to add, view, and remove items.

Order System: A complete checkout process that converts a user's cart into a permanent order.

User Profile & Order History: Users can view their profile information and a complete history of their past orders.

Multi-Language Support: The entire user interface can be switched between English, Hindi, and Marathi.

Responsive Design: A modern UI built with Tailwind CSS that works beautifully on mobile phones, tablets, and desktops.

🛠️ Tech Stack
This project is built with a modern, full-stack JavaScript architecture.

Frontend:

Next.js - React Framework (with App Router)

React - UI Library

Tailwind CSS - Utility-First CSS Framework

i18next & react-i18next - for multi-language support

React Slick & React Icons - for UI components

Backend:

Node.js & Express.js - for the server and API

MongoDB - NoSQL Database

Mongoose - Object Data Modeling (ODM) for MongoDB

Authentication & Image Handling:

JSON Web Tokens (JWT) & bcrypt.js - for secure sessions and password hashing

Cloudinary - for cloud-based image hosting

Multer - for handling file uploads

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need to have Node.js and npm installed on your machine.

Installation & Setup
Clone the repository:

git clone [https://github.com/mayankrathod-mrr/BSC-Agripreneur.git](https://github.com/mayankrathod-mrr/BSC-Agripreneur.git)
cd agri-store 

Setup the Backend:

cd backend
npm install

Create a .env file in the backend folder and add the following variables with your own secret keys:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Setup the Frontend:

cd ../frontend
npm install

Run the application:

To run the backend server, open a terminal in the backend folder and run:

npm run dev

To run the frontend server, open a new, separate terminal in the frontend folder and run:

npm run dev

Your application should now be running, with the frontend on http://localhost:3000 and the backend on http://localhost:5000.

👤 Author
Mayank Rathod

GitHub: @mayankrathod-mrr