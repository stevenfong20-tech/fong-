import React from 'react';

export const Button = ({ children, variant, size, className, onClick, ...props }) => {
  // Simple style fallback for Vercel to build
  const baseStyle = "px-4 py-2 rounded-md font-medium text-sm transition-colors";
  const variantStyle = variant === "outline" 
    ? "border border-gray-300 bg-transparent hover:bg-gray-100" 
    : variant === "ghost" 
    ? "hover:bg-gray-100 text-gray-700" 
    : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variantStyle} ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
};
