import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Spinner } from './Spinner';

export type ActionModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ActionModalTone = 'primary' | 'danger';

export interface ActionModalProps {
    open: boolean;
    onClose: () => void;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    /**
     * Primary action label + handler. Omit both for a view-only modal
     * (the footer collapses to a single "Close" button).
     */
    primaryLabel?: string;
    onPrimaryClick?: () => void;
    primaryLoading?: boolean;
    primaryDisabled?: boolean;
    leftAction?: React.ReactNode;
    headerRight?: React.ReactNode;
    /**
     * Maximum content width. Defaults to `'2xl'` (≈1152px), the original
     * hard-coded width — appropriate for details / form modals. Pick a
     * smaller size for confirm dialogs.
     */
    maxWidth?: ActionModalSize;
    /**
     * Visual tone for the header icon box and primary action button.
     * `'primary'` (default) uses the brand-kit primary color; `'danger'`
     * uses red — appropriate for destructive confirmations.
     */
    tone?: ActionModalTone;
}

const maxWidthClasses: Record<ActionModalSize, string> = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    '2xl': 'max-w-6xl',
};

const toneClasses: Record<ActionModalTone, { iconBg: string; primaryBg: string }> = {
    primary: {
        iconBg: 'bg-primary',
        primaryBg: 'bg-primary hover:bg-primary-hover',
    },
    danger: {
        iconBg: 'bg-red-600',
        primaryBg: 'bg-red-600 hover:bg-red-700',
    },
};

export const ActionModal: React.FC<ActionModalProps> = ({
    open,
    onClose,
    icon,
    title,
    subtitle,
    children,
    primaryLabel,
    onPrimaryClick,
    primaryLoading = false,
    primaryDisabled = false,
    leftAction,
    headerRight,
    maxWidth = '2xl',
    tone = 'primary',
}) => {
    const hasPrimaryAction = primaryLabel !== undefined && onPrimaryClick !== undefined;
    const { iconBg, primaryBg } = toneClasses[tone];
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCloseRef.current();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div
                className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] bg-white dark:bg-bg-secondary rounded-xl shadow-xl overflow-hidden flex flex-col`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <header className="p-6 border-b border-gray-100 dark:border-border-light flex justify-between items-start shrink-0">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-white text-xl shadow-sm`}>
                            {icon}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-text-primary">{title}</h1>
                            {subtitle && (
                                <p className="text-gray-500 dark:text-text-muted text-sm mt-1">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {headerRight}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-text-primary transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </header>

                {/* Body */}
                <main className="p-6 flex-1 overflow-y-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="p-4 border-t border-gray-200 dark:border-border-light bg-gray-50 dark:bg-bg-hover flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                    <div className="w-full sm:w-auto">
                        {leftAction}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 dark:border-border-light bg-white dark:bg-bg-secondary text-gray-700 dark:text-text-secondary rounded-lg hover:bg-gray-50 dark:hover:bg-bg-hover transition-colors text-sm font-medium w-full sm:w-auto"
                        >
                            {hasPrimaryAction ? 'Cancel' : 'Close'}
                        </button>
                        {hasPrimaryAction && (
                            <button
                                onClick={onPrimaryClick}
                                disabled={primaryDisabled || primaryLoading}
                                className={`px-6 py-2 ${primaryBg} text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {primaryLoading ? <Spinner size="sm" /> : primaryLabel}
                            </button>
                        )}
                    </div>
                </footer>
            </div>
        </div>,
        document.body
    );
};

export default ActionModal;
