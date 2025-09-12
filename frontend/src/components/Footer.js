// frontend/src/components/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100 pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image 
                src="/logo1.png" // Your logo file
                alt="BSC Agripreneur Logo"
                width={42}
                height={42}
                className="rounded-md"
              />
              <span className="text-xl font-bold text-white">BSC Agripreneur</span>
            </Link>
            <p className="text-sm leading-relaxed text-green-100/90">
              Providing top-quality agricultural products to help you achieve a bountiful harvest.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-amber-400 transition-colors">Products</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/cart" className="hover:text-amber-400 transition-colors">Your Cart</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-amber-300 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-green-100/90">
              <li>121 Near MM college , Darwha. pncode - 445202</li>
              <li>
                <a href="mailto:contact@bscagri.com" className="hover:text-amber-400 transition-colors">
                  contact@bscagri.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-amber-400 transition-colors">
                  +91 9096090143
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-amber-300 mb-4">Follow Us</h3>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-amber-400 transition-colors"><FaFacebook size={22} /></a>
              <a href="#" className="hover:text-amber-400 transition-colors"><FaTwitter size={22} /></a>
              <a href="https://www.instagram.com/bsc.agripreneur?utm_source=ig_web_button_share_sheet&igsh=MXR4cWM2azJjdmRxNg==" className="hover:text-amber-400 transition-colors"><FaInstagram size={22} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 py-4 border-t border-green-700 text-center text-sm text-green-200">
          <p>&copy; {new Date().getFullYear()} BSC Agripreneur. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
