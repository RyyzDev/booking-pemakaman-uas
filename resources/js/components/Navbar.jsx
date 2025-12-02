import React, { useState } from 'react';
import { Trees, Menu, X, LogOut } from 'lucide-react';

const Navbar = ({ setView, view, isAdmin, handleLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (viewName) => {
      setView(viewName);
      setIsMenuOpen(false);
    };

    const getButtonClass = (targetView) => 
      `px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-2
       ${view === targetView 
         ? 'bg-emerald-800 text-emerald-100 shadow-inner' 
         : 'hover:bg-emerald-800/50 hover:text-emerald-100 text-emerald-50/90'
       }`;

    return (
      <nav className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div 
              className="flex items-center gap-3 font-serif text-xl cursor-pointer hover:opacity-90 transition" 
              onClick={() => handleNavClick('home')}
            >
              <div className="bg-emerald-800 p-2 rounded-full">
                <Trees className="w-6 h-6 text-emerald-300" />
              </div>
              <span className="text-white-600">Eternity</span> <span className="text-white-800">Gardens</span>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex gap-2">
              <button onClick={() => handleNavClick('home')} className={getButtonClass('home')}>
                Beranda
              </button>
              <button onClick={() => handleNavClick('booking')} className={getButtonClass('booking')}>
                Cari Kavling
              </button>
             <button 
                  onClick={() => setView(isAdmin ? 'admin' : 'login')}
                  className={`px-4 py-2 rounded-lg transition text-white ${view === 'admin' ? 'bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                  {isAdmin ? 'Admin Dashboard' : 'Login Admin'} 
              </button>
             {isAdmin && (
                      <button 
                          onClick={() => {
                              handleLogout(); 
                              setView('login'); 
                          }}
                          className={`px-4 py-2 rounded-lg transition text-white bg-red-600 hover:bg-red-700`} 
                      >
                          <LogOut size={16} className="mr-1" />
                          Logout
                      </button>
                  )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-emerald-800 text-emerald-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>

            </div>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <div className="md:hidden bg-emerald-900 border-t border-emerald-800 pb-4 animate-in slide-in-from-top-5 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => handleNavClick('home')} 
                className={`w-full text-left ${getButtonClass('home')}`}
              >
                Beranda
              </button>
              <button 
                onClick={() => handleNavClick('booking')} 
                className={`w-full text-left ${getButtonClass('booking')}`}
              >
                Cari Kavling
              </button>
             <button 
                  onClick={() => setView(isAdmin ? 'admin' : 'login')} // <-- UBAH INI
                  className={`px-4 py-2 rounded-lg transition text-white ${view === 'admin' ? 'bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                  {isAdmin ? 'Admin Dashboard' : 'Login Admin'} 
              </button>
              {isAdmin && (
                      <button 
                          onClick={() => {
                              handleLogout(); 
                              setView('login'); 
                          }}
                          className={`px-4 py-2 rounded-lg transition text-white bg-red-600 hover:bg-red-700`} 
                      >
                          <LogOut size={16} className="mr-1" />
                          Logout
                      </button>
                  )}
            </div>
          </div>
        )}
      </nav>
    );
  };

export default Navbar;
