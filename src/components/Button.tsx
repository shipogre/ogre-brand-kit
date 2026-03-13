import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  dark: 'btn-dark',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-small',
  md: '',
  lg: 'btn-large',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [
    'btn',
    variantClasses[variant],
    sizeClasses[size],
    disabled || isLoading ? 'opacity-50 pointer-events-none' : '',
    'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner spinner-sm mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;
