import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  className,
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-durian-600 hover:bg-durian-700 text-white',
    secondary: 'bg-durian-yellow-500 hover:bg-durian-yellow-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    outline: 'bg-transparent border border-durian-600 text-durian-600 hover:bg-durian-50',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = clsx(
    'rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-durian-500',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    (disabled || loading) ? 'opacity-70 cursor-not-allowed' : '',
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center justify-center">
        {loading && <span className="mr-2"><LoadingSpinner size="small" color="text-current" /></span>}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </div>
    </button>
  );
};