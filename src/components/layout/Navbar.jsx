// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              School Manager
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700">Admin Panel</span>
          </div>
        </div>
      </div>
    </nav>
  );
}