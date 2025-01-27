// src/components/layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, AcademicCapIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', to: '/', icon: HomeIcon },
    { name: 'Classes', to: '/classes', icon: AcademicCapIcon },
    { name: 'Teachers', to: '/teachers', icon: UserIcon },
    { name: 'Students', to: '/students', icon: UserGroupIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)]">
      <nav className="mt-5 px-2">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.name}
              to={link.to}
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <link.icon
                className={`mr-4 h-6 w-6 ${
                  isActive ? 'text-primary-600' : 'text-gray-400'
                }`}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}