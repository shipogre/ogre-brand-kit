import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
    path?: string;
    onClick?: () => void;
}

export interface BottomAction {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
}

export interface SidebarProps {
    activeItem?: string;
    items: NavItem[];
    bottomActions?: BottomAction[];
    headerContent?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'dashboard', items, bottomActions, headerContent }) => {
    const navigate = useNavigate();

    const handleItemClick = (item: NavItem) => {
        if (item.onClick) {
            item.onClick();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <aside className="bg-[#1a1a2e] text-white flex flex-col h-screen w-[72px] flex-shrink-0 sticky top-0 z-[60] overflow-visible">
            {/* Sidebar Header */}
            <div className="flex flex-col items-center justify-center py-4 min-h-[64px] mb-4">
                {headerContent ?? (
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-black text-lg">O</span>
                    </div>
                )}
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 flex flex-col pt-2 gap-8">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className={`
                                relative w-full flex flex-col items-center justify-center py-3 px-1 transition-colors duration-150 group
                                ${isActive
                                    ? 'text-white'
                                    : 'text-gray-500 hover:text-gray-300'
                                }
                            `}
                        >
                            {/* Active indicator - left border */}
                            {isActive && (
                                <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-r-full" />
                            )}
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                            <span className={`text-[9px] font-semibold uppercase tracking-wider mt-1 leading-tight text-center ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                {item.label}
                            </span>
                            {item.badge !== undefined && (
                                <span className={`text-[9px] mt-0.5 font-medium ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {item.badge.toLocaleString()}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Sidebar Footer */}
            {bottomActions && bottomActions.length > 0 && (
                <div className="flex flex-col items-center gap-4 py-4">
                    {bottomActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.onClick}
                            className="text-gray-500 hover:text-gray-300 transition-colors"
                            title={action.label}
                        >
                            <action.icon size={18} />
                        </button>
                    ))}
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
