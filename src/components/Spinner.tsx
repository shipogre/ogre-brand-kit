import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'spinner-sm',
  md: '',
  lg: 'spinner-lg',
};

export function Spinner({
  size = 'md',
  className = '',
  ...props
}: SpinnerProps) {
  return (
    <span
      className={`spinner ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}

export default Spinner;
