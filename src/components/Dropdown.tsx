import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export interface DropdownItem {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    active?: boolean;
    separator?: boolean;
    className?: string;
    onClick?: () => void;
}

export interface DropdownProps {
    trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
    items: DropdownItem[];
    align?: 'left' | 'right';
    width?: string;
    className?: string;
    /** Show a search input when item count exceeds this threshold. Default: 10 */
    searchThreshold?: number;
    /** Placeholder text for the search input */
    searchPlaceholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    items,
    align = 'left',
    width = 'w-72',
    className = '',
    searchThreshold = 10,
    searchPlaceholder = 'Search...',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const showSearch = items.length > searchThreshold;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && showSearch) {
            setTimeout(() => searchInputRef.current?.focus(), 0);
        }
        if (!isOpen) {
            setSearchQuery('');
        }
    }, [isOpen, showSearch]);

    const filteredItems = searchQuery
        ? items.filter(item =>
            item.id === '__clear' ||
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : items;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {typeof trigger === 'function' ? trigger(isOpen) : trigger}
            </div>

            {isOpen && (
                <div className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} mt-2 ${width} bg-white dark:bg-bg-secondary rounded-sm shadow-lg border border-border dark:border-border-light py-1 z-[60] ring-1 ring-black ring-opacity-5`}>
                    {showSearch && (
                        <div className="px-2 py-1.5 border-b border-border dark:border-border-light">
                            <div className="relative">
                                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className="w-full pl-8 pr-3 py-1.5 text-sm bg-bg-secondary dark:bg-bg-hover rounded border-none outline-none text-text-primary placeholder:text-text-muted"
                                />
                            </div>
                        </div>
                    )}
                    <div className={showSearch ? 'max-h-60 overflow-y-auto' : ''}>
                        {filteredItems.map((item, index) => (
                            <React.Fragment key={item.id}>
                                {item.separator && index > 0 && (
                                    <div className="border-t border-border dark:border-border-light my-1" />
                                )}
                                <div
                                    onClick={() => {
                                        item.onClick?.();
                                        setIsOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                                        item.className
                                            ? item.className
                                            : item.active
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
                        {filteredItems.length === 0 && (
                            <div className="px-4 py-3 text-sm text-text-muted text-center">No matches found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
