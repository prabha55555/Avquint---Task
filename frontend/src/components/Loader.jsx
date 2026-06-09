import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-t-primary border-r-transparent border-b-accent border-l-transparent`}
        style={{ borderStyle: 'solid' }}
      ></div>
    </div>
  );
};

export default Loader;
