import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  size = 'md',
  className = '',
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: { height: '4px' },
    md: { height: '6px' },
    lg: { height: '8px' },
  };

  return (
    <div className={`inline-flex items-center ${className}`} {...props}>
      <div
        className="progress-bar"
        style={{ ...sizeStyles[size], width: size === 'lg' ? '150px' : '100px' }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="progress-text">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}

export default ProgressBar;
