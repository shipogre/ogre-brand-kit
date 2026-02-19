import React from 'react';

export interface SelectableRowProps {
    onClick?: () => void;
    selected?: boolean;
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    rightContent?: React.ReactNode;
    className?: string;
}

export const SelectableRow: React.FC<SelectableRowProps> = ({
    onClick,
    selected = false,
    icon,
    title,
    subtitle,
    rightContent,
    className = '',
}) => {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }}
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer group ${
                selected
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-border dark:border-border-light hover:border-primary/50 hover:bg-bg-hover/50 dark:hover:bg-bg-hover'
            } ${className}`}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <span className={`transition-colors ${selected ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`}>
                        {icon}
                    </span>
                )}
                <div>
                    <p className="text-sm font-semibold text-text-primary">{title}</p>
                    {subtitle && (
                        <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
                    )}
                </div>
            </div>
            {rightContent && (
                <div className="text-sm font-semibold text-text-primary">
                    {rightContent}
                </div>
            )}
        </div>
    );
};

export default SelectableRow;
