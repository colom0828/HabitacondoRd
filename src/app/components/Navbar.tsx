import React from 'react';
import { Menu, User, LogOut, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import logoSinFondo from "figma:asset/53cba963ea396b5515da13160fbe00e16138950a.png";

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentSection: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function Navbar({ onNavigate, currentSection, isLoggedIn, onLogout, isDarkMode, onToggleDarkMode }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm ${
      isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={isLoggedIn ? 'cursor-default' : 'cursor-pointer'}
            onClick={() => !isLoggedIn && onNavigate('home')}
          >
            <img src={logoSinFondo} alt="Habita-condo RD" className="h-12 w-auto" />
          </motion.div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {!isLoggedIn && (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className={`transition-colors ${
                    currentSection === 'home' 
                      ? isDarkMode ? 'text-blue-400' : 'text-[#0B3C5D]'
                      : isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-[#0B3C5D]'
                  }`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => onNavigate('apartments')}
                  className={`transition-colors ${
                    currentSection === 'apartments'
                      ? isDarkMode ? 'text-blue-400' : 'text-[#0B3C5D]'
                      : isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-[#0B3C5D]'
                  }`}
                >
                  Apartamentos
                </button>
                <button className={`transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-[#0B3C5D]'
                }`}>
                  Ayuda
                </button>
              </>
            )}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center gap-4">
            {isLoggedIn && onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className={`px-4 py-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-[#F5F6F8] hover:bg-[#B0B7C3]'
                }`}
                title={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-[#0B3C5D]" />
                )}
              </button>
            )}
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-[#F5F6F8] hover:bg-[#B0B7C3]'
                  }`}
                >
                  <Menu size={20} className={isDarkMode ? 'text-white' : 'text-[#0B3C5D]'} />
                  <div className="w-8 h-8 rounded-full bg-[#0B3C5D] flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                </button>
                
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden ${
                      isDarkMode 
                        ? 'bg-gray-800 border border-gray-700' 
                        : 'bg-white border border-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setShowUserMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center gap-2 ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-blue-400' 
                          : 'hover:bg-[#F5F6F8] text-[#0B3C5D]'
                      }`}
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center gap-2 text-red-600 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#F5F6F8]'
                      }`}
                    >
                      <LogOut size={18} />
                      Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-2 rounded-full bg-[#0B3C5D] text-white hover:bg-[#164E7F] transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}