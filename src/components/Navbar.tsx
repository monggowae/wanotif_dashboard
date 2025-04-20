import React, { useState } from 'react';
import { Bell, MessageSquare, User, CreditCard, Menu, X } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { unreadNotificationsCount, currentUser } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Static Sidebar for Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <MessageSquare className="h-8 w-8 text-[#25D366]" />
              <span className="ml-2 text-xl font-bold text-gray-800">WhatsApp Orders</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-2">
              <Link to="/dashboard" className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                User Dashboard
              </Link>
              <Link to="/" className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                Products
              </Link>
              <Link to="/admin" className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                Admin Dashboard
              </Link>
              <Link to="/profile" className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link to="/profile" className="flex items-center">
              <CreditCard className="h-6 w-6 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Credits</p>
                <p className="text-xs text-gray-500">{currentUser?.credits || 0}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Notification Icon */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <Link to="/notifications" className="relative">
          <Bell className="h-6 w-6 text-gray-700 hover:text-gray-900" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-red-500 rounded-full">
              {unreadNotificationsCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-white shadow-md">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center">
            <MessageSquare className="h-8 w-8 text-[#25D366]" />
            <span className="ml-2 text-xl font-bold text-gray-800">WhatsApp Orders</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/notifications" className="relative">
              <Bell className="h-6 w-6 text-gray-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>
            <Link to="/profile">
              <User className="h-6 w-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 ${isSidebarOpen ? '' : 'pointer-events-none'}`}>
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <MessageSquare className="h-8 w-8 text-[#25D366]" />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <Link 
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                User Dashboard
              </Link>
              <Link 
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/admin"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                Admin Dashboard
              </Link>
              <Link 
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;