import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Sparkles, BarChart2, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 glass-panel dark:bg-slate-900/80 border-b border-slate-250/20 dark:border-slate-800/80 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <CheckCircle className="h-5.5 w-5.5" />
          </div>
          <span className="text-md font-bold text-slate-800 dark:text-slate-100">
            TaskFlow <span className="text-primary dark:text-accent font-medium">Pro</span>
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-600 dark:text-slate-350 hover:text-primary dark:hover:text-accent transition-colors"
          >
            Log In
          </Link>
          <Link to="/register" className="btn-premium-primary py-2 text-sm shadow-sm">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        {/* Left column */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" /> Introducing TaskFlow Pro
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-6"
          >
            Manage tasks smarter.{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Work faster.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-md sm:text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            Streamline your workflow, track productivity charts, and stay on top of critical deadlines with our award-winning glassmorphic dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link to="/register" className="btn-premium-primary px-8 py-3.5 text-md w-full sm:w-auto shadow-md">
              Start Free Trial <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/login" className="btn-premium-secondary px-8 py-3.5 text-md w-full sm:w-auto">
              View Demo
            </Link>
          </motion.div>
        </div>

        {/* Right column: Floating Task Cards Representation */}
        <div className="flex-1 relative w-full max-w-lg h-[400px] flex items-center justify-center">
          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 dark:bg-primary/20 filter blur-3xl -z-10" />
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/10 dark:bg-accent/20 filter blur-3xl -z-10" />

          {/* Floating Task Card 1 (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-0 w-72 p-5 rounded-2xl glass-panel border border-white/40 dark:border-slate-800/40 shadow-xl animate-float-slow z-10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                High Priority
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Today</span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
              Finalize SaaS Mockups
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
              Apply Stripe-inspired gradients and shadows.
            </p>
            <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-4/5 rounded-full" />
            </div>
          </motion.div>

          {/* Floating Task Card 2 (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="absolute bottom-8 left-0 w-72 p-5 rounded-2xl glass-panel border border-white/40 dark:border-slate-800/40 shadow-xl animate-float-medium"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Completed
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Yesterday</span>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-through opacity-75 mb-1">
              Setup Render Database
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 opacity-75">
              Connect Mongoose to MongoDB Atlas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white/40 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
              99.9%
            </h3>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Server Uptime
            </p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
              10M+
            </h3>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Tasks Managed
            </p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
              4.9/5
            </h3>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              User Rating
            </p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
              120k+
            </h3>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Active Users
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
            Engineered for High-Performance Teams
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Everything you need to focus, run productive weeks, and visualize task metrics from a single interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col gap-4">
            <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-primary border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shadow-inner">
              <Zap className="h-5.5 w-5.5" />
            </div>
            <h3 className="font-bold text-slate-850 dark:text-slate-150">Instant Task Toggles</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Mark tasks pending or completed immediately. Edit priority levels, titles, and due dates effortlessly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col gap-4">
            <div className="h-11 w-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 text-accent border border-cyan-100 dark:border-cyan-900/30 flex items-center justify-center shadow-inner">
              <BarChart2 className="h-5.5 w-5.5" />
            </div>
            <h3 className="font-bold text-slate-850 dark:text-slate-150">Interactive Analytics</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Monitor project status using Recharts. Track task trends, completion rates, and weekly productivity averages.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col gap-4">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-success border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shadow-inner">
              <Shield className="h-5.5 w-5.5" />
            </div>
            <h3 className="font-bold text-slate-850 dark:text-slate-150">Strict SaaS Security</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              JWT session authorization, bcryptjs password hashes, express-rate-limit caps, and strict Helmet header defenses.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-100/40 dark:bg-slate-900/20 py-20 px-6 lg:px-16 border-t border-slate-250/20 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              Trusted by Task Masters
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Read how developers, product managers, and freelancers build better habits using TaskFlow Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                "TaskFlow Pro completely changed how I organize my sprint tasks. The minimalist dashboard and Recharts statistics kept me visual and focused. I finished my tasks 30% faster!"
              </p>
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Siddharth Kumar</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Lead Engineer, Vercel</p>
                </div>
                <div className="flex ml-auto text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                "The UI design feels extremely premium. Dark mode toggles, micro-animations, and instant searches are beautifully implemented. Highly recommend it to anyone seeking a cleaner workflow."
              </p>
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-accent to-emerald-400 flex items-center justify-center text-white font-bold">
                  EP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Elena Petrov</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Freelance Designer</p>
                </div>
                <div className="flex ml-auto text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-6 lg:px-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
          Supercharge Your Focus Today
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto">
          Sign up now, create your tasks, organize by priority, and stay synced. Completely free for individuals, no credit card required.
        </p>
        <Link to="/register" className="btn-premium-primary px-8 py-3.5 text-md inline-flex shadow-lg shadow-primary/25">
          Get Started For Free <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 px-6 py-12 lg:px-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-white">
              <CheckCircle className="h-4.5 w-4.5" />
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              TaskFlow Pro
            </span>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} TaskFlow Pro. All rights reserved. Created with passion for productivity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
