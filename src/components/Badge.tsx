import React from 'react';

export type BadgeStatus = 'active' | 'progress' | 'review' | 'completed' | 'pending';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  children: React.ReactNode;
}

const statusClasses: Record<BadgeStatus, string> = {
  active: 'status-active',
  progress: 'status-progress',
  review: 'status-review',
  completed: 'status-completed',
  pending: 'status-pending',
};

export function Badge({
  status,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`status-badge ${statusClasses[status]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
