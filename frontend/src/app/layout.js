// frontend/src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import TranslationsProvider from "@/components/TranslationsProvider"; // <-- Import our new provider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BSC Agripreneur",
  description: "Your one-stop shop for agricultural needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TranslationsProvider>
            <Navbar />
            <main className="container mx-auto px-4 min-h-screen">
              {children}
            </main>
            <Footer />
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}