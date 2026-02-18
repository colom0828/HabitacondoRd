import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'rounded-xl transition-all duration-300 font-medium';
  
  const variantClasses = {
    primary: 'bg-[#0B3C5D] text-white hover:bg-[#164E7F] shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-[#B0B7C3] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white shadow-md hover:shadow-lg disabled:bg-gray-200 disabled:cursor-not-allowed',
    outline: 'border-2 border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed',
    ghost: 'text-[#0B3C5D] hover:bg-[#F5F6F8] disabled:text-gray-300 disabled:cursor-not-allowed'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
