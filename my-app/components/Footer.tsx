import Link from 'next/link';
import { Package, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Himshakti
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Smart inventory management platform for modern businesses. Track, manage, and optimize your inventory with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/transactions" className="text-gray-400 hover:text-white transition-colors">
                  Transactions
                </Link>
              </li>
              <li>
                <Link href="/suppliers" className="text-gray-400 hover:text-white transition-colors">
                  Suppliers
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Real-time Inventory Tracking</li>
              <li>Low Stock Alerts</li>
              <li>Transaction History</li>
              <li>Supplier Management</li>
              <li>Analytics & Reports</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>ajaybisht114333@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 7409619849</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Uttarakhand, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Himshakti Inventory Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
