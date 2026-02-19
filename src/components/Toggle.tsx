import React from 'react';

export interface ToggleProps {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: { track: 'h-5 w-9', thumb: 'h-3 w-3', translate: 'translate-x-4' },
    md: { track: 'h-6 w-11', thumb: 'h-4 w-4', translate: 'translate-x-5' },
    lg: { track: 'h-7 w-13', thumb: 'h-5 w-5', translate: 'translate-x-6' },
};

export const Toggle: React.FC<ToggleProps> = ({
    checked,
    onChange,
    disabled = false,
    size = 'md',
}) => {
    const s = sizeClasses[size];

    return (
        <div
            role="switch"
            aria-checked={checked}
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? undefined : onChange}
            onKeyDown={disabled ? undefined : (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onChange();
                }
            }}
            className={`
                relative inline-flex ${s.track} items-center rounded-full transition-colors duration-200 cursor-pointer
                ${checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            <span
                className={`
                    inline-block ${s.thumb} transform rounded-full bg-white shadow-sm transition-transform duration-200
                    ${checked ? s.translate : 'translate-x-1'}
                `}
            />
        </div>
    );
};

export default Toggle;
