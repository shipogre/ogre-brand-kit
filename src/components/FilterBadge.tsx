import React from 'react';

export type FilterBadgeVariant = 'dashboard' | 'alert' | 'dispute' | 'waiting' | 'partial' | 'claim' | 'completed';

export interface FilterBadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: FilterBadgeVariant;
    count?: number;
    active?: boolean;
    label: string;
}

const variantClasses: Record<FilterBadgeVariant, { container: string; count: string; activeContainer: string; activeCount: string }> = {
    dashboard: {
        container: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
        count: 'bg-gray-500 text-white',
        activeContainer: 'ring-2 ring-gray-500 bg-gray-100 dark:bg-gray-800',
        activeCount: 'bg-gray-600 text-white'
    },
    alert: {
        container: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50',
        count: 'bg-yellow-500 text-white',
        activeContainer: 'ring-2 ring-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
        activeCount: 'bg-yellow-600 text-white'
    },
    dispute: {
        container: 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50',
        count: 'bg-orange-500 text-white',
        activeContainer: 'ring-2 ring-orange-500 bg-orange-100 dark:bg-orange-900/30',
        activeCount: 'bg-orange-600 text-white'
    },
    waiting: {
        container: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50',
        count: 'bg-purple-500 text-white',
        activeContainer: 'ring-2 ring-purple-500 bg-purple-100 dark:bg-purple-900/30',
        activeCount: 'bg-purple-600 text-white'
    },
    partial: {
        container: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50',
        count: 'bg-blue-500 text-white',
        activeContainer: 'ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-900/30',
        activeCount: 'bg-blue-600 text-white'
    },
    claim: {
        container: 'bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/50',
        count: 'bg-teal-500 text-white',
        activeContainer: 'ring-2 ring-teal-500 bg-teal-100 dark:bg-teal-900/30',
        activeCount: 'bg-teal-600 text-white'
    },
    completed: {
        container: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50',
        count: 'bg-green-500 text-white',
        activeContainer: 'ring-2 ring-green-500 bg-green-100 dark:bg-green-900/30',
        activeCount: 'bg-green-600 text-white'
    },
};

export function FilterBadge({
    variant,
    count,
    active = false,
    label,
    className = '',
    ...props
}: FilterBadgeProps) {
    const styles = variantClasses[variant];
    const containerClass = active ? styles.activeContainer : styles.container;
    const countClass = active ? styles.activeCount : styles.count;

    return (
        <button
            className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                ${containerClass}
                ${className}
            `}
            {...props}
        >
            <span className="font-semibold uppercase text-xs tracking-wide">
                {label}
            </span>
            {count !== undefined && count > 0 && (
                <span className={`
                    px-2 py-0.5 rounded-full text-[10px] font-bold
                    ${countClass}
                `}>
                    {count}
                </span>
            )}
        </button>
    );
}

export default FilterBadge;
