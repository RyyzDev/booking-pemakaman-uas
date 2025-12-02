import React, { useState, useEffect } from 'react';
import { Trees, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = ({ setView, view, isAdmin, handleLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Efek visual saat di-scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (viewName) => {
        setView(viewName);
        setIsMenuOpen(false);
    };

    // Daftar menu navigasi utama
    const navItems = [
        { label: 'Beranda', target: 'home' },
        { label: 'Cari Kavling', target: 'booking' },
    ];

    // Komponen Tombol Navigasi (Reusable untuk Desktop & Mobile)
    const NavLink = ({ item, isMobile = false }) => (
        <button
            onClick={() => handleNavClick(item.target)}
            className={`
                relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group
                ${view === item.target 
                    ? 'text-emerald-100 bg-emerald-800/80 shadow-inner' 
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/40'
                }
                ${isMobile ? 'w-full text-left flex items-center gap-3' : ''}
            `}
        >
            {item.label}
            {/* Indikator garis bawah animasi untuk desktop */}
            {!isMobile && view === item.target && (
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-300 rounded-full animate-in fade-in zoom-in duration-300" />
            )}
        </button>
    );

    return (
        <nav 
            className={`
                fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10
                ${scrolled || isMenuOpen 
                    ? 'bg-emerald-950/90 backdrop-blur-md shadow-xl py-2' 
                    : 'bg-emerald-900 py-4 shadow-lg'}
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* LOGO AREA */}
                    <div 
                        className="flex items-center gap-3 cursor-pointer group" 
                        onClick={() => handleNavClick('home')}
                    >
                        <div className="bg-gradient-to-br from-emerald-400 to-emerald-700 p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Trees className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-bold text-white tracking-wide font-serif">Eternity</span>
                            <span className="text-sm font-medium text-emerald-300 tracking-widest uppercase">Gardens</span>
                        </div>
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-2">
                        {/* Loop menu utama */}
                        {navItems.map((item) => (
                            <NavLink key={item.target} item={item} />
                        ))}

                        <div className="h-6 w-px bg-emerald-700/50 mx-2" />

                        {/* Tombol Admin / Login */}
                        <button 
                            onClick={() => setView(isAdmin ? 'admin' : 'login')}
                            className={`
                                flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 border
                                ${view === 'admin' 
                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-100 shadow-lg shadow-emerald-900/20' 
                                    : 'bg-transparent text-emerald-100 border-emerald-600/50 hover:bg-emerald-800 hover:border-emerald-500'
                                }
                            `}
                        >
                            {isAdmin ? <LayoutDashboard size={18}/> : <User size={18}/>}
                            {isAdmin ? 'Dashboard' : 'Login Admin'} 
                        </button>

                        {/* Tombol Logout (Hanya jika Admin) */}
                        {isAdmin && (
                            <button 
                                onClick={() => {
                                    handleLogout(); 
                                    setView('login'); 
                                }}
                                className="p-2 rounded-full text-red-200 hover:bg-red-900/30 hover:text-red-100 transition-colors ml-1"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        )}
                    </div>

                    {/* MOBILE MENU TOGGLE */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-emerald-100 hover:bg-emerald-800/50 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {/* Menggunakan overflow-hidden dan max-h untuk animasi smooth */}
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pt-2 pb-6 space-y-2 bg-emerald-950/50 backdrop-blur-xl border-t border-emerald-800/50">
                    
                    {navItems.map((item) => (
                        <NavLink key={item.target} item={item} isMobile={true} />
                    ))}

                    <div className="h-px w-full bg-emerald-800/50 my-3" />

                    <button 
                        onClick={() => {
                            setView(isAdmin ? 'admin' : 'login');
                            setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition text-white 
                        ${view === 'admin' ? 'bg-emerald-700 shadow-md' : 'bg-emerald-800/50 hover:bg-emerald-700'}`}
                    >
                         {isAdmin ? <LayoutDashboard size={18}/> : <User size={18}/>}
                        {isAdmin ? 'Admin Dashboard' : 'Login Admin'} 
                    </button>

                    {isAdmin && (
                        <button 
                            onClick={() => {
                                handleLogout(); 
                                setView('login');
                                setIsMenuOpen(false); 
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-red-100 bg-red-900/30 hover:bg-red-900/50 border border-red-900/30" 
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;