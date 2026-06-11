import React from 'react';
import { Link } from 'react-router-dom';
import { SearchInput } from './SearchInput';
import ogreLogo from '../../assets/ogre_with_tag.png';
import ogreLogoDark from '../../assets/ogre_with_tag_dark.png';

export interface HeaderBarProps {
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    title?: string;
    subtitle?: string;
    leftContent?: React.ReactNode;
    centerContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    belowContent?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
    title,
    subtitle,
    leftContent,
    centerContent,
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

                    {/* Center: Search Bar or custom content */}
                    {centerContent ?? (
                        <div className="flex-1 max-w-md mx-8">
                            <SearchInput
                                placeholder="Search Companies/Locations..."
                                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            />
                        </div>
                    )}

                    {/* Right: OGRE branding + user menu */}
                    <div className="flex items-center gap-4">
                        {/* Light/dark variants of the brand mark — the dark variant has the
                         * OGRE/SHIP LIKE A BEAST text re-rendered in white so it stays legible
                         * on a dark body. The red square + ogre face is identical in both. */}
                        <Link to="/" className="block cursor-pointer transition-opacity hover:opacity-90">
                            <img
                                src={ogreLogo}
                                alt="OGRE - Ship Like A Beast"
                                className="h-12 w-auto object-contain block dark:hidden"
                            />
                            <img
                                src={ogreLogoDark}
                                alt="OGRE - Ship Like A Beast"
                                className="h-12 w-auto object-contain hidden dark:block"
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
