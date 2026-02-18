import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const Component = hover ? motion.div : 'div';
  
  const hoverProps = hover ? {
    whileHover: { y: -8, boxShadow: '0 20px 40px rgba(11, 60, 93, 0.15)' },
    transition: { duration: 0.3 }
  } : {};
  
  return (
    <Component
      className={`bg-white rounded-2xl shadow-md overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
