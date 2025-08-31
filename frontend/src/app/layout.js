// frontend/src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; // Make sure this is imported

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agri Store",
  description: "Your one-stop shop for agricultural needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The Provider must wrap everything that needs auth info */}
        <AuthProvider>
          <Navbar /> {/* <-- ✅ NOW INSIDE THE BUBBLE */}
          <main className="container mx-auto px-4 min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}