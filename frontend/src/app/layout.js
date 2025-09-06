// frontend/src/app/layout.js
import '@/i18n-client'; // Keep this for translations

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import TranslationsProvider from "@/components/TranslationsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BSC Agripreneur",
  description: "Your one-stop shop for agricultural needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-800`}>
        <AuthProvider>
          <TranslationsProvider>
            <Navbar />
            {/* THIS IS THE CHANGE: We removed the container classes from the main tag */}
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}