// frontend/src/components/Navbar.js
"use client";

import Link from 'next/link';
import Image from 'next/image'; // <-- Added this import for the logo
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* === THIS IS THE UPDATED LOGO SECTION === */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
              src="/logo1.png" // Assumes your logo is named logo.png in the /public folder
              alt="Agri Store Logo"
              width={40}
              height={40}
          />
          <span className="text-2xl font-bold">Agri Store</span>
        </Link>
        {/* ======================================= */}

        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:text-green-200">Home</Link>
          <Link href="/products" className="hover:text-green-200">Products</Link>
          <Link href="/cart" className="hover:text-green-200">Cart</Link>
          
          {user ? (
            <>
              <span className="font-semibold">Welcome, {user.name}</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-green-200">Login/Register</Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;