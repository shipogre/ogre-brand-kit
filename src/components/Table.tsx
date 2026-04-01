import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Spinner } from './Spinner';

export type SortDirection = 'Ascending' | 'Descending';

export interface FilterOption {
    value: string;
    label: string;
}

export interface TableColumn<T = Record<string, unknown>> {
    key: string;
    header: React.ReactNode;
    render?: (row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
    /** If set, this column is sortable. The value is the sort key passed to onSort. */
    sortKey?: string;
    /** If set, this column shows a filter dropdown. The filterKey is passed to onFilter. */
    filterKey?: string;
    /** The options for the filter dropdown. Required if filterKey is set. */
    filterOptions?: FilterOption[];
}

export interface TableProps<T = Record<string, unknown>> {
    columns: TableColumn<T>[];
    data: T[];
    title?: string;
    headerAction?: React.ReactNode;
    onRowClick?: (row: T) => void;
    className?: string;
    stickyHeader?: boolean;
    /** Maximum height for the scrollable area (e.g. "70vh", "600px"). Enables scroll container. */
    maxHeight?: string;
    /** Called when the user scrolls near the bottom. Enables infinite scroll. */
    onLoadMore?: () => void;
    /** Whether more data is currently being loaded. Shows a spinner at the bottom. */
    loadingMore?: boolean;
    /** Whether there is more data to load. Stops triggering onLoadMore when false. */
    hasMore?: boolean;
    /** Text to show when all data has been loaded. */
    endOfDataText?: string;
    /** Called when a sortable column header is clicked. */
    onSort?: (sortKey: string, direction: SortDirection) => void;
    /** The currently active sort key. */
    activeSortKey?: string;
    /** The current sort direction. */
    activeSortDirection?: SortDirection;
    /** Called when a filter value changes. Values is an array of selected filter values (empty = no filter). */
    onFilter?: (filterKey: string, values: string[]) => void;
    /** Map of filterKey → currently active filter values. */
    activeFilters?: Record<string, string[]>;
    /** Optional callback to add custom class names to table rows. */
    rowClassName?: (row: T) => string;
}

function SortIndicator({ direction, active }: { direction?: SortDirection; active: boolean }) {
    return (
        <span className={`inline-flex flex-col ml-1 leading-none ${active ? 'text-text-primary' : 'text-text-muted/40'}`}>
            <svg
                width="8" height="5" viewBox="0 0 8 5"
                className={`${active && direction === 'Ascending' ? 'text-primary' : ''}`}
            >
                <path d="M4 0L8 5H0L4 0Z" fill="currentColor" />
            </svg>
            <svg
                width="8" height="5" viewBox="0 0 8 5"
                className={`mt-0.5 ${active && direction === 'Descending' ? 'text-primary' : ''}`}
            >
                <path d="M4 5L0 0H8L4 5Z" fill="currentColor" />
            </svg>
        </span>
    );
}

function FilterDropdown({
    options,
    activeValues,
    onFilter,
}: {
    options: FilterOption[];
    activeValues: string[];
    onFilter: (values: string[]) => void;
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const toggleValue = (value: string) => {
        const next = activeValues.includes(value)
            ? activeValues.filter(v => v !== value)
            : [...activeValues, value];
        onFilter(next);
    };

    const hasActive = activeValues.length > 0;

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(prev => !prev); }}
                className={`ml-1 inline-flex items-center justify-center w-4 h-4 rounded transition-colors ${
                    hasActive ? 'text-primary' : 'text-text-muted/50 hover:text-text-muted'
                }`}
                aria-label="Filter"
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-bg-secondary border border-border dark:border-border-light rounded-lg shadow-lg z-50 min-w-[160px] py-1">
                    {hasActive && (
                        <button
                            onClick={() => onFilter([])}
                            className="w-full text-left px-3 py-1.5 text-xs text-primary hover:bg-bg-hover transition-colors"
                        >
                            Clear filter
                        </button>
                    )}
                    {options.map(opt => {
                        const isSelected = activeValues.includes(opt.value);
                        return (
                            <button
                                key={opt.value}
                                onClick={() => toggleValue(opt.value)}
                                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-bg-hover transition-colors flex items-center gap-2 ${
                                    isSelected ? 'text-primary font-bold' : 'text-text-secondary'
                                }`}
                            >
                                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                    isSelected ? 'bg-primary border-primary' : 'border-border dark:border-border-light'
                                }`}>
                                    {isSelected && (
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </span>
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export function Table<T extends Record<string, unknown>>({
    columns,
    data,
    title,
    headerAction,
    onRowClick,
    className = '',
    stickyHeader = true,
    maxHeight = '70vh',
    onLoadMore,
    loadingMore = false,
    hasMore = false,
    endOfDataText = 'End of results',
    onSort,
    activeSortKey,
    activeSortDirection,
    onFilter,
    activeFilters = {},
    rowClassName,
}: TableProps<T>) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setShowScrollTop(container.scrollTop > 300);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = useCallback(() => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (!onLoadMore || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore) {
                    onLoadMore();
                }
            },
            {
                root: scrollContainerRef.current,
                threshold: 0.1,
                rootMargin: '100px',
            }
        );

        observer.observe(sentinelRef.current);

        return () => observer.disconnect();
    }, [onLoadMore, hasMore, loadingMore]);

    const handleHeaderClick = (column: TableColumn<T>) => {
        if (!column.sortKey || !onSort) return;

        const nextDirection: SortDirection =
            activeSortKey === column.sortKey && activeSortDirection === 'Ascending'
                ? 'Descending'
                : 'Ascending';

        onSort(column.sortKey, nextDirection);
    };

    return (
        <div className={`bg-white dark:bg-bg-secondary rounded-lg border border-border dark:border-border-light shadow-sm overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-4 bg-primary flex justify-between items-center">
                    <h2 className="text-base font-bold text-white uppercase tracking-wide">{title}</h2>
                    {headerAction && <div>{headerAction}</div>}
                </div>
            )}

            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="overflow-auto"
                    style={{ maxHeight }}
                >
                    <table className="w-full text-left border-collapse">
                        <thead className={`bg-gray-50 dark:bg-bg-hover ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
                            <tr>
                                {columns.map((column) => {
                                    const isSortable = !!column.sortKey && !!onSort;
                                    const isActive = activeSortKey === column.sortKey;
                                    const isFilterable = !!column.filterKey && !!column.filterOptions && !!onFilter;

                                    return (
                                        <th
                                            key={column.key}
                                            onClick={isSortable ? () => handleHeaderClick(column) : undefined}
                                            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-muted border-b border-border dark:border-border-light ${
                                                isSortable ? 'cursor-pointer select-none hover:text-text-primary transition-colors' : ''
                                            } ${column.headerClassName || ''}`}
                                        >
                                            <span className="inline-flex items-center">
                                                {column.header}
                                                {isSortable && (
                                                    <SortIndicator
                                                        active={isActive}
                                                        direction={isActive ? activeSortDirection : undefined}
                                                    />
                                                )}
                                                {isFilterable && (
                                                    <FilterDropdown
                                                        options={column.filterOptions!}
                                                        activeValues={activeFilters[column.filterKey!] || []}
                                                        onFilter={(values) => onFilter!(column.filterKey!, values)}
                                                    />
                                                )}
                                            </span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 dark:divide-border-light/10">
                            {data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick?.(row)}
                                    className={`hover:bg-bg-hover/50 dark:hover:bg-bg-hover/20 transition-colors ${onRowClick ? 'cursor-pointer' : ''} ${rowClassName?.(row) || ''}`}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className={`px-4 py-3 text-sm text-text-secondary dark:text-text-muted ${column.className || ''}`}
                                        >
                                            {column.render ? column.render(row) : String(row[column.key] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {onLoadMore && (
                        <div ref={sentinelRef} className="py-6 flex flex-col items-center justify-center">
                            {loadingMore && (
                                <div className="flex items-center gap-3">
                                    <Spinner size="sm" />
                                    <span className="text-sm font-medium text-text-secondary">Loading more...</span>
                                </div>
                            )}
                            {!hasMore && data.length > 0 && (
                                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                    {endOfDataText}
                                </span>
                            )}
                        </div>
                    )}

                    {data.length === 0 && !loadingMore && (
                        <div className="px-6 py-12 text-center text-text-muted">
                            <p>No data available</p>
                        </div>
                    )}
                </div>

                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="absolute bottom-4 right-4 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover hover:scale-110 active:scale-95 transition-all z-50"
                        aria-label="Scroll to top"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 15l-6-6-6 6"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Table;
