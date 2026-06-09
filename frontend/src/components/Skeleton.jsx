import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="w-full p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
      </div>
      <div className="h-px bg-slate-100 dark:bg-slate-700"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse flex items-center gap-4"
        >
          <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
      <div className="h-64 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
    </div>
  );
};

const Skeleton = {
  Card: CardSkeleton,
  Stats: StatsSkeleton,
  Chart: ChartSkeleton,
};

export default Skeleton;
