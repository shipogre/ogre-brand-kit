import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    active?: boolean;
    separator?: boolean;
    onClick?: () => void;
}

export interface DropdownProps {
    trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
    items: DropdownItem[];
    align?: 'left' | 'right';
    width?: string;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    items,
    align = 'left',
    width = 'w-72',
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {typeof trigger === 'function' ? trigger(isOpen) : trigger}
            </div>

            {isOpen && (
                <div className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} mt-2 ${width} bg-white dark:bg-bg-secondary rounded-sm shadow-lg border border-border dark:border-border-light py-1 z-[60] ring-1 ring-black ring-opacity-5`}>
                    {items.map((item, index) => (
                        <React.Fragment key={item.id}>
                            {item.separator && index > 0 && (
                                <div className="border-t border-border dark:border-border-light my-1" />
                            )}
                            <div
                                onClick={() => {
                                    item.onClick?.();
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                                    item.active
                                        ? 'bg-gray-100 dark:bg-bg-hover text-text-primary'
                                        : 'text-text-secondary dark:text-text-muted hover:bg-gray-100 dark:hover:bg-bg-hover hover:text-text-primary dark:hover:text-text-primary'
                                }`}
                            >
                                {item.icon && <span className={item.active ? 'text-primary' : ''}>{item.icon}</span>}
                                <div className="flex flex-col">
                                    <span className={item.description ? 'text-sm font-medium' : ''}>{item.label}</span>
                                    {item.description && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.description}</span>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
