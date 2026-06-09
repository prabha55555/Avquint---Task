import React, { useState } from 'react';
import { Menu, LogOut, User, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ toggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Mobile drawer trigger button */}
      <button
        onClick={toggleMobileSidebar}
        className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 md:hidden transition-all duration-200 shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Greetings section */}
      <div className="hidden md:block">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
          TaskFlow <span className="text-primary dark:text-accent font-medium">Pro</span>
        </h2>
        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3.5 ml-auto md:ml-0">
        <ThemeToggle />

        {/* User profile dropdown button */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl border border-slate-200 dark:border-slate-705 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200 shadow-sm text-left"
          >
            {/* Avatar representation */}
            <div className="h-8.5 w-8.5 rounded-lg bg-gradient-to-tr from-primary to-accent text-white font-bold text-sm flex items-center justify-center shadow-md">
              {getInitials(user?.name)}
            </div>
            <span className="hidden sm:block text-xs font-semibold text-slate-600 dark:text-slate-200 pr-1">
              {user?.name}
            </span>
          </motion.button>

          {/* Animate Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <>
                {/* Backdrop handler to close */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2.5 w-56 rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800 shadow-xl z-20 py-2 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>

                  <div className="p-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-700/60 p-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
