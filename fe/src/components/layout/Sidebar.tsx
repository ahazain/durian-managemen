import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, Home, LogOut, User, Citrus as Fruit, Menu, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isMobile: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) setIsOpen(false);
  };

  if (!user) return null;

  const adminLinks = [
    { to: '/admin', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/admin/accounts', icon: <Users size={20} />, label: 'Account Management' },
    { to: '/admin/scheduling', icon: <Calendar size={20} />, label: 'Scheduling' },
    { to: '/admin/attendance', icon: <CheckCircle size={20} />, label: 'Attendance Verification' },
    { to: '/admin/prediction', icon: <Fruit size={20} />, label: 'Durian Prediction' },
  ];

  const employeeLinks = [
    { to: '/employee', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/employee/account', icon: <User size={20} />, label: 'My Account' },
    { to: '/employee/schedule', icon: <Calendar size={20} />, label: 'My Schedule' },
    { to: '/employee/attendance', icon: <CheckCircle size={20} />, label: 'Attendance' },
    { to: '/employee/prediction', icon: <Fruit size={20} />, label: 'Durian Prediction' },
  ];

  const links = user.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-durian-600 text-white rounded-md shadow-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMobile ? 'lg:translate-x-0' : ''}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Header */}
          <div className="h-24 flex items-center justify-center border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Fruit className="h-8 w-8 text-durian-600" />
              <h1 className="text-xl font-bold text-durian-800">
                Durian Management
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-durian-100 text-durian-700 font-medium'
                          : 'hover:bg-gray-100'
                      }`
                    }
                    end={link.to === '/admin' || link.to === '/employee'}
                  >
                    <span className="mr-3 text-gray-500">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                <img
                  src={user.avatar || 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{user.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};