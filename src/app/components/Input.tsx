import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-[#0B3C5D]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B3C5D] pointer-events-none z-10">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} rounded-xl border-2 border-[#0B3C5D]/40 
            hover:border-[#0B3C5D] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20
            transition-all duration-300 bg-white/95 backdrop-blur-sm text-[#0B3C5D]
            placeholder:text-gray-500
            ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}