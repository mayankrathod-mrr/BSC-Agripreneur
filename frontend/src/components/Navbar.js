// frontend/src/components/Navbar.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  if (!isMounted) {
    return (
      <nav className="bg-green-600 text-white p-3 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo1.png" alt="BSC Agripreneur Logo" width={36} height={36}/>
            <span className="text-xl font-bold">BSC Agripreneur</span>
          </Link>
          <FaBars size={22} />
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-green-600 text-white p-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo1.png" alt="BSC Agripreneur Logo" width={36} height={36}/>
          <span className="text-xl font-bold">BSC Agripreneur</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-5 items-center font-medium">
          <Link href="/" className="hover:text-green-200">{t('home')}</Link>
          <Link href="/products" className="hover:text-green-200">{t('products')}</Link>
          <Link href="/contact" className="hover:text-green-200">{t('contact')}</Link>
          <Link href="/cart" className="hover:text-green-200">{t('cart')}</Link>

          {user ? (
            <>
              <Link href="/orders" className="hover:text-green-200">{t('my_orders')}</Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300">{t('admin')}</Link>
              )}
              <span className="font-semibold">{t('welcome_user', { name: user.name })}</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">{t('logout')}</button>
            </>
          ) : (
            <Link href="/login" className="hover:text-green-200">{t('login_register')}</Link>
          )}

          {/* Language Switch */}
          <div className="flex space-x-2 text-sm">
            <button onClick={() => changeLanguage('en')} className={`font-bold ${i18n.language.startsWith('en') ? 'underline' : ''}`}>EN</button>
            <button onClick={() => changeLanguage('hi')} className={`font-bold ${i18n.language === 'hi' ? 'underline' : ''}`}>HI</button>
            <button onClick={() => changeLanguage('mr')} className={`font-bold ${i18n.language === 'mr' ? 'underline' : ''}`}>MR</button>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 items-center bg-green-700/90 p-4 rounded-lg mx-3 transition-all duration-300">
          <Link href="/" onClick={() => setIsOpen(false)}>{t('home')}</Link>
          <Link href="/products" onClick={() => setIsOpen(false)}>{t('products')}</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>{t('contact')}</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)}>{t('cart')}</Link>

          {user && (
            <Link href="/orders" onClick={() => setIsOpen(false)}>{t('my_orders')}</Link>
          )}

          <hr className="w-full border-green-400" />

          {user ? (
            <div className="flex flex-col items-center space-y-3 w-full">
              {user.role === 'admin' && (
                <Link href="/admin" onClick={() => setIsOpen(false)} className="bg-yellow-400 text-black px-3 py-1 rounded w-full text-center">{t('admin')}</Link>
              )}
              <span className="font-semibold">{t('welcome_user', { name: user.name })}</span>
              <button onClick={() => { logout(); setIsOpen(false); }} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded w-full">{t('logout')}</button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>{t('login_register')}</Link>
          )}

          <hr className="w-full border-green-400" />

          <div className="flex space-x-3">
            <button onClick={() => changeLanguage('en')} className={`font-bold ${i18n.language.startsWith('en') ? 'underline' : ''}`}>EN</button>
            <button onClick={() => changeLanguage('hi')} className={`font-bold ${i18n.language === 'hi' ? 'underline' : ''}`}>HI</button>
            <button onClick={() => changeLanguage('mr')} className={`font-bold ${i18n.language === 'mr' ? 'underline' : ''}`}>MR</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
