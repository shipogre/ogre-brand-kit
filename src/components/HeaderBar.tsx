import React from 'react';
import { Link } from 'react-router-dom';
import { SearchInput } from './SearchInput';

export interface HeaderBarProps {
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    title?: string;
    subtitle?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    belowContent?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
    title,
    subtitle,
    leftContent,
    rightContent,
    belowContent
}) => {
    return (
        <nav className="bg-white dark:bg-bg-secondary border-b border-gray-200 dark:border-sidebar-border sticky top-0 z-50 transition-colors duration-300">
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Left: Title or custom content */}
                    {leftContent ? (
                        <div className="flex items-center">{leftContent}</div>
                    ) : (
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 dark:text-white uppercase">{title}</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
                        </div>
                    )}

                    {/* Center: Search Bar */}
                    <div className="flex-1 max-w-md mx-8">
                        <SearchInput
                            placeholder="Search Companies/Locations..."
                            className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                    </div>

                    {/* Right: OGRE branding + user menu */}
                    <div className="flex items-center gap-4">
                        <Link to="/" className="block cursor-pointer transition-opacity hover:opacity-90">
                            <img
                                src="/ogre_with_tag.png"
                                alt="OGRE - Ship Like A Beast"
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        {rightContent}
                    </div>
                </div>
                {belowContent && (
                    <div className="mt-3 border-t border-gray-200 dark:border-sidebar-border pt-3">
                        {belowContent}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default HeaderBar;
