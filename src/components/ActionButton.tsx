import React from 'react';

export type ActionButtonVariant = 'approve' | 'file' | 'reject' | 'contact';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ActionButtonVariant;
    children: React.ReactNode;
}

const variantClasses: Record<ActionButtonVariant, string> = {
    approve: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    file: 'bg-orange-500 hover:bg-orange-600 text-white',
    reject: 'bg-orange-600 hover:bg-orange-700 text-white',
    contact: 'bg-teal-500 hover:bg-teal-600 text-white',
};

export function ActionButton({
    variant,
    className = '',
    children,
    ...props
}: ActionButtonProps) {
    return (
        <button
            className={`w-full px-3 py-1.5 rounded text-xs font-semibold transition-colors duration-200 ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default ActionButton;
