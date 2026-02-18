import React from 'react';

export interface TableColumn<T = any> {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

export interface TableProps<T = any> {
    columns: TableColumn<T>[];
    data: T[];
    title?: string;
    headerAction?: React.ReactNode;
    onRowClick?: (row: T) => void;
    className?: string;
    stickyHeader?: boolean;
}

export function Table<T extends Record<string, any>>({
    columns,
    data,
    title,
    headerAction,
    onRowClick,
    className = '',
    stickyHeader = true,
}: TableProps<T>) {
    return (
        <div className={`bg-white dark:bg-bg-secondary rounded-lg border border-border dark:border-border-light shadow-sm overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-4 bg-primary flex justify-between items-center">
                    <h2 className="text-base font-bold text-white uppercase tracking-wide">{title}</h2>
                    {headerAction && <div>{headerAction}</div>}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className={`bg-gray-50 dark:bg-bg-hover ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-muted border-b border-border dark:border-border-light ${column.headerClassName || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 dark:divide-border-light/10">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick?.(row)}
                                className={`hover:bg-bg-hover/50 dark:hover:bg-bg-hover/20 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-4 py-3 text-sm text-text-secondary dark:text-text-muted ${column.className || ''}`}
                                    >
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data.length === 0 && (
                <div className="px-6 py-12 text-center text-text-muted">
                    <p>No data available</p>
                </div>
            )}
        </div>
    );
}

export default Table;
