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
  useEffect(() => { setIsMounted(true); }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  if (!isMounted) {
    // Render a basic shell on the server to prevent layout shift
    return (
        <nav className="bg-green-500 text-white p-4 shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo1.png" alt="BSC Agripreneur Logo" width={40} height={40}/>
              <span className="text-2xl font-bold">BSC Agripreneur</span>
            </Link>
            <div className="md:hidden"><FaBars size={24} /></div>
          </div>
        </nav>
    );
  }

  return (
    <nav className="bg-green-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo1.png" alt="BSC Agripreneur Logo" width={40} height={40}/>
          <span className="text-2xl font-bold">BSC Agripreneur</span>
        </Link>
        
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-green-200">{t('home')}</Link>
          <Link href="/products" className="hover:text-green-200">{t('products')}</Link>
          <Link href="/contact" className="hover:text-green-200">{t('contact')}</Link>
          <Link href="/cart" className="hover:text-green-200">{t('cart')}</Link>
          
          {user ? (
            <>
              <Link href="/orders" className="hover:text-green-200">{t('my_orders')}</Link>
              {user.role === 'admin' && (<Link href="/admin" className="font-bold bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400">{t('admin')}</Link>)}
              
              {/* === THIS IS THE CHANGE FOR DESKTOP === */}
              <Link href="/profile" className="font-semibold hover:text-green-200">
                {t('welcome_user', { name: user.name })}
              </Link>

              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">{t('logout')}</button>
            </>
          ) : ( <Link href="/login" className="hover:text-green-200">{t('login_register')}</Link> )}
          
          <div className="flex space-x-2 text-sm">
             <button onClick={() => changeLanguage('en')} className={`font-bold ${i18n.language.startsWith('en') ? 'underline' : ''}`}>EN</button>
             <button onClick={() => changeLanguage('hi')} className={`font-bold ${i18n.language === 'hi' ? 'underline' : ''}`}>HI</button>
             <button onClick={() => changeLanguage('mr')} className={`font-bold ${i18n.language === 'mr' ? 'underline' : ''}`}>MR</button>
          </div>
        </div>
        
        <div className="md:hidden"><button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</button></div>
      </div>
      
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 items-center">
          <Link href="/" onClick={() => setIsOpen(false)}>{t('home')}</Link>
          <Link href="/products" onClick={() => setIsOpen(false)}>{t('products')}</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>{t('contact')}</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)}>{t('cart')}</Link>
          {user && (<Link href="/orders" onClick={() => setIsOpen(false)}>{t('my_orders')}</Link>)}
          <hr className="w-full border-green-700"/>
          {user ? (
            <div className="flex flex-col items-center space-y-4 w-full">
              {user.role === 'admin' && (<Link href="/admin" onClick={() => setIsOpen(false)} className="font-bold bg-yellow-500 text-black px-3 py-1 rounded w-full text-center">{t('admin')}</Link>)}
              
              {/* === THIS IS THE CHANGE FOR MOBILE === */}
              <Link href="/profile" onClick={() => setIsOpen(false)} className="font-semibold hover:text-green-200">
                {t('welcome_user', { name: user.name })}
              </Link>
              
              <button onClick={() => { logout(); setIsOpen(false); }} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded w-full">{t('logout')}</button>
            </div>
          ) : (<Link href="/login" onClick={() => setIsOpen(false)}>{t('login_register')}</Link>)}
           <hr className="w-full border-green-700"/>
          <div className="flex space-x-4">
             <button onClick={() => changeLanguage('en')} className={`font-bold ${i18n.language.startsWith('en') ? 'underline' : ''}`}>English</button>
             <button onClick={() => changeLanguage('hi')} className={`font-bold ${i18n.language === 'hi' ? 'underline' : ''}`}>हिंदी</button>
             <button onClick={() => changeLanguage('mr')} className={`font-bold ${i18n.language === 'mr' ? 'underline' : ''}`}>मराठी</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;