import React from 'react';

export type ActionButtonVariant = 'approve' | 'file' | 'reject' | 'contact';

export interface ActionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
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
