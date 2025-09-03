// frontend/src/components/Navbar.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // Fix hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  if (!isMounted) return null;

  return (
    <nav className="bg-green-800 text-white p-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo1.png"
            alt="BSC Agripreneur Logo"
            width={38}
            height={38}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-amber-300">
            BSC Agripreneur
          </span>
        </Link>

        {/* Desktop Menu */}
        <div
          suppressHydrationWarning
          className="hidden md:flex space-x-5 items-center"
        >
          <Link href="/" className="hover:text-amber-300 transition">
            {t("home")}
          </Link>
          <Link href="/products" className="hover:text-amber-300 transition">
            {t("products")}
          </Link>
          <Link href="/contact" className="hover:text-amber-300 transition">
            {t("contact")}
          </Link>
          <Link href="/cart" className="hover:text-amber-300 transition">
            {t("cart")}
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="font-bold bg-amber-400 text-black px-3 py-1 rounded hover:bg-amber-300"
                >
                  {t("admin")}
                </Link>
              )}
              <span className="font-medium">
                {t("welcome_user", { name: user.name })}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:text-amber-300 transition"
            >
              {t("login_register")}
            </Link>
          )}

          {/* Language Switch */}
          <div className="flex space-x-2 text-sm">
            <button
              onClick={() => changeLanguage("en")}
              className={`font-bold ${
                i18n.language.startsWith("en")
                  ? "text-amber-300"
                  : "text-white hover:text-amber-300"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("hi")}
              className={`font-bold ${
                i18n.language === "hi"
                  ? "text-amber-300"
                  : "text-white hover:text-amber-300"
              }`}
            >
              HI
            </button>
            <button
              onClick={() => changeLanguage("mr")}
              className={`font-bold ${
                i18n.language === "mr"
                  ? "text-amber-300"
                  : "text-white hover:text-amber-300"
              }`}
            >
              MR
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          suppressHydrationWarning
          className="md:hidden mt-3 bg-green-700 rounded-lg shadow-lg p-4 space-y-3 animate-slideDown"
        >
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-amber-300"
          >
            {t("home")}
          </Link>
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="block hover:text-amber-300"
          >
            {t("products")}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block hover:text-amber-300"
          >
            {t("contact")}
          </Link>
          <Link
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="block hover:text-amber-300"
          >
            {t("cart")}
          </Link>

          <hr className="border-green-600" />

          {user ? (
            <div className="space-y-3">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block text-center font-bold bg-amber-400 text-black px-3 py-2 rounded hover:bg-amber-300"
                >
                  {t("admin")}
                </Link>
              )}
              <span className="block text-center font-medium">
                {t("welcome_user", { name: user.name })}
              </span>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-sm"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center hover:text-amber-300"
            >
              {t("login_register")}
            </Link>
          )}

          <hr className="border-green-600" />

          {/* Language Switch - Mobile */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => changeLanguage("en")}
              className={`font-bold ${
                i18n.language.startsWith("en")
                  ? "text-amber-300"
                  : "text-white hover:text-amber-300"
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("hi")}
              className={`font-bold ${
                i18n.language === "hi"
                  ? "text-amber-300"
                  : "text-white hover:text-amber-300"
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => changeLanguage("mr")}
              className={`font-bold ${
                i18n.language === "mr"
                  ? "text-amber-300"
                  : "text-white hover:text-amber-300"
              }`}
            >
              मराठी
            </button>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
