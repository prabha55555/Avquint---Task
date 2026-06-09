import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative Blur blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 dark:bg-primary/20 filter blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md p-8 rounded-3xl glass-panel border border-white/40 dark:border-slate-800/40 shadow-2xl space-y-6"
      >
        <div className="p-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-450 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center shadow-inner mx-auto w-fit">
          <HelpCircle className="h-12 w-12 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            404
          </h1>
          <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Oops! The link you followed might be broken, or the page may have been removed. Let's get you back on track.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="btn-premium-primary py-3 px-6 text-sm"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Safety
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
