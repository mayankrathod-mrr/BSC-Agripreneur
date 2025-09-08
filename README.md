🌱 BSC Agripreneur – Full-Stack E-commerce Platform

Welcome to BSC Agripreneur, a complete e-commerce web application built for agricultural products.
This project demonstrates a full-stack MERN application (MongoDB, Express.js, React/Next.js, Node.js) with features designed for a real-world user experience.

🚀 Live Demo: [Add your deployed link here]

✨ Key Features

🛒 Complete E-commerce Flow – Browse products, add to cart, checkout, and view order history.

🛠 Admin Dashboard – Secure role-protected area for admins to add new products with real image uploads.

🌍 Multi-Language Support – English, Hindi (हिन्दी), and Marathi (मराठी).

🔐 Secure Authentication – JWT-based login & registration with bcrypt password encryption.

☁️ Cloud Image Hosting – Product images uploaded & served via Cloudinary.

📱 Responsive Design – Mobile-first UI built with Tailwind CSS.

🏷 Category Filtering – Quickly filter products by Seeds, Fertilizers, and Pesticides.

🛠 Tech Stack

Frontend:

Next.js (App Router)

React

Tailwind CSS

i18next (for translations)

React Icons

Backend:

Node.js & Express.js

MongoDB + Mongoose

JWT & bcrypt.js (authentication & security)

Image Hosting:

Cloudinary

🚀 Getting Started

Follow these steps to set up the project locally.

✅ Prerequisites

Install Node.js
 (with npm)

📦 Installation & Setup

1. Clone the repo

git clone https://github.com/mayankrathod-mrr/BSC-Agripreneur.git
cd BSC-Agripreneur


2. Setup Backend

cd backend
npm install


Create a .env file in /backend and add:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=5000


3. Setup Frontend

cd ../frontend
npm install


4. Run the application
Start the backend:

cd backend
npm run dev


Start the frontend (in a new terminal):

cd frontend
npm run dev


Now open 👉 http://localhost:3000

👤 Author

Mayank Rathod

GitHub: @mayankrathod-mrr
