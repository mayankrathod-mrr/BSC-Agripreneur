// frontend/src/components/Navbar.js
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    // I've used your preferred bg-green-500 color from your old code
    <nav className="bg-green-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/" className="flex items-center space-x-2">
          <Image 
              src="/logo1.png" // Using your logo name from your old code
              alt="BSC Agripreneur Logo"
              width={40}
              height={40}
          />
          <span className="text-2xl font-bold">BSC Agripreneur</span>
        </Link>

        {/* Desktop Menu */}
        <div suppressHydrationWarning className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-green-200">Home</Link>
          <Link href="/products" className="hover:text-green-200">Products</Link>
          <Link href="/contact" className="hover:text-green-200">Contact</Link>
          <Link href="/cart" className="hover:text-green-200">Cart</Link>
          
          {user ? (
            <>
              {/* === THIS IS THE NEW ADMIN LINK FOR DESKTOP === */}
              {user.role === 'admin' && (
                <Link href="/admin" className="font-bold bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400">
                  Admin
                </Link>
              )}
              {/* ============================================== */}

              <span className="font-semibold">Welcome, {user.name}</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-green-200">Login/Register</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div suppressHydrationWarning className="md:hidden mt-4 flex flex-col space-y-4 items-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-green-200">Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-green-200">Products</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-green-200">Contact</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)} className="hover:text-green-200">Cart</Link>
          
          <hr className="w-full border-green-700"/>

          {user ? (
            <div className="flex flex-col items-center space-y-4 w-full">
              {/* === THIS IS THE NEW ADMIN LINK FOR MOBILE === */}
              {user.role === 'admin' && (
                <Link href="/admin" onClick={() => setIsOpen(false)} className="font-bold bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 w-full text-center">
                  Admin
                </Link>
              )}
              {/* ============================================= */}

              <span className="font-semibold">Welcome, {user.name}</span>
              <button onClick={() => { logout(); setIsOpen(false); }} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded w-full">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-green-200">Login/Register</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;