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
    bottomAction?: BottomAction;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'dashboard', items, bottomAction }) => {
    // The design shows a fixed "Rail" style sidebar, so we might remove the collapse toggle
    // or keep it just for mobile? For now, let's match the visual which is a fixed width rail.
    const navigate = useNavigate();

    const handleItemClick = (item: NavItem) => {
        if (item.onClick) {
            item.onClick();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <aside className="bg-bg-secondary/30 dark:bg-gray-950 text-white flex flex-col h-screen w-[100px] border-r border-gray-800 flex-shrink-0 sticky top-0">
            {/* Sidebar Header */}
            <div className="p-4 flex flex-col items-center justify-center border-b border-gray-800/50 min-h-[80px]">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-white font-black text-xl">O</span>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-2 px-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className={`
                                w-full flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all duration-200 group relative
                                ${isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                }
                            `}
                        >
                            <div className="relative mb-1">
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                {item.badge !== undefined && (
                                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-gray-900">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wide ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Sidebar Footer */}
            {bottomAction && (
                <div className="p-3 border-t border-gray-800/50">
                    <button
                        onClick={bottomAction.onClick}
                        className="w-full flex flex-col items-center justify-center py-3 px-1 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all duration-200"
                    >
                        <bottomAction.icon size={20} className="mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500 group-hover:text-gray-300">
                            {bottomAction.label}
                        </span>
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
