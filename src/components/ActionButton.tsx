import React from 'react';

export type ActionButtonVariant = 'approve' | 'file' | 'reject' | 'contact' | 'success' | 'warning' | 'danger' | 'info';

export interface ActionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant: ActionButtonVariant;
    children: React.ReactNode;
}

const variantClasses: Record<ActionButtonVariant, string> = {
    approve: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    file: 'bg-orange-500 hover:bg-orange-600 text-white',
    reject: 'bg-orange-600 hover:bg-orange-700 text-white',
    contact: 'bg-teal-500 hover:bg-teal-600 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
};

export function ActionButton({
    variant,
    className = '',
    children,
    ...props
}: ActionButtonProps) {
    return (
        <div
            role="button"
            tabIndex={0}
            className={`w-full px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors duration-200 cursor-pointer ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export default ActionButton;
