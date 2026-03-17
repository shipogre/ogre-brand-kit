import React from 'react';

export type FilterBadgeVariant = 'dashboard' | 'alert' | 'dispute' | 'waiting' | 'partial' | 'claim' | 'completed';

export interface FilterBadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: FilterBadgeVariant;
    count?: number | string;
    active?: boolean;
    label: string;
}

const variantColors: Record<FilterBadgeVariant, { dot: string; count: string; activeBg: string; activeBorder: string }> = {
    dashboard: { dot: 'bg-gray-500', count: 'bg-gray-500 text-white', activeBg: 'bg-gray-100 dark:bg-gray-500/10', activeBorder: 'border-gray-500' },
    alert: { dot: 'bg-yellow-600', count: 'bg-yellow-500 text-white', activeBg: 'bg-yellow-50 dark:bg-yellow-500/10', activeBorder: 'border-yellow-500' },
    dispute: { dot: 'bg-red-700', count: 'bg-red-600 text-white', activeBg: 'bg-red-50 dark:bg-red-500/10', activeBorder: 'border-red-600' },
    waiting: { dot: 'bg-purple-600', count: 'bg-purple-500 text-white', activeBg: 'bg-purple-50 dark:bg-purple-500/10', activeBorder: 'border-purple-500' },
    partial: { dot: 'bg-blue-600', count: 'bg-blue-500 text-white', activeBg: 'bg-blue-50 dark:bg-blue-500/10', activeBorder: 'border-blue-500' },
    claim: { dot: 'bg-orange-500', count: 'bg-orange-500 text-white', activeBg: 'bg-orange-50 dark:bg-orange-500/10', activeBorder: 'border-orange-500' },
    completed: { dot: 'bg-green-600', count: 'bg-teal-500 text-white', activeBg: 'bg-green-50 dark:bg-green-500/10', activeBorder: 'border-green-500' },
};

export function FilterBadge({
    variant,
    count,
    active = false,
    label,
    className = '',
    ...props
}: FilterBadgeProps) {
    const colors = variantColors[variant];

    return (
        <button
            className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${active
                    ? `${colors.activeBg} border-b-2 ${colors.activeBorder}`
                    : 'bg-gray-50 dark:bg-bg-hover hover:bg-gray-100 dark:hover:bg-bg-hover/80'
                }
                ${className}
            `}
            {...props}
        >
            <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
            <span className="font-bold uppercase text-xs tracking-wide text-text-primary">
                {label}
            </span>
            {count !== undefined && count !== 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${colors.count}`}>
                    {count}
                </span>
            )}
        </button>
    );
}

export default FilterBadge;
