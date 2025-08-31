🌱 Agri Store - Full-Stack E-commerce Platform
Welcome to Agri Store, a complete e-commerce web application built for agricultural products. This project demonstrates a full-stack application using the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) with a focus on core e-commerce functionalities like user authentication, product catalogs, a shopping cart, and an order management system.

Live Demo: [Link to your deployed website will go here]

📸 Screenshots
Homepage:

Products Page:

Cart Page:

Order History:

✨ Key Features
User Authentication: Secure user registration and login system using JSON Web Tokens (JWT).

Product Catalog: Browse products with categories (Seeds, Fertilizers, Pesticides).

Dynamic Pages: View detailed information for each individual product.

Shopping Cart: Fully functional cart to add, view, and remove items, linked to the logged-in user.

Order System: A complete checkout process that converts a cart into a permanent order.

Order History: Users can view a list of their past orders with details and status.

Responsive Design: A modern and clean user interface built with Tailwind CSS that works on all devices.

Engaging Homepage: Features a dynamic image slider and a "Featured Products" section.

🛠️ Tech Stack
This project is built with a modern, full-stack JavaScript architecture.

Frontend:

Next.js - React Framework

React - UI Library

Tailwind CSS - Utility-First CSS Framework

React Slick - for the homepage carousel

Axios / Fetch API - for API requests

Backend:

Node.js - JavaScript Runtime

Express.js - Web Framework

MongoDB - NoSQL Database

Mongoose - Object Data Modeling (ODM) for MongoDB

Authentication & Authorization:

JSON Web Tokens (JWT) - for secure user sessions

bcrypt.js - for password hashing

Tools:

Git & GitHub

Postman (for API testing)

VS Code

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need to have Node.js and npm installed on your machine.

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/mayankrathod-mrr/BSC-Agripreneur.git
cd agri-store 
Setup the Backend:

Bash

cd backend
npm install
Create a .env file in the backend folder and add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Setup the Frontend:

Bash

cd ../frontend
npm install
Run the application:

To run the backend server, open a terminal in the backend folder and run:

Bash

npm run dev
To run the frontend server, open a new, separate terminal in the frontend folder and run:

Bash

npm run dev
Your application should now be running, with the frontend on http://localhost:3000 and the backend on http://localhost:5000.

👤 Author
Mayank Rathod

GitHub: @mayankrathod-mrr







