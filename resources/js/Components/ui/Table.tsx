import React from 'react';

interface Header {
    key: string;
    label: string;
    align?: 'left' | 'right' | 'center';
    className?: string;
}

interface TableProps {
    headers: Header[];
    children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
    return (
        <div className="cardPage overflow-hidden p-0">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-primary-600">
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header.key}
                                    scope="col"
                                    className={`px-6 py-3.5 text-xs font-semibold text-white uppercase tracking-wider ${
                                        header.align === 'right'
                                            ? 'text-right'
                                            : header.align === 'center'
                                            ? 'text-center'
                                            : 'text-left'
                                    } ${header.className ?? ''}`}
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">{children}</tbody>
                </table>
            </div>
        </div>
    );
}

Table.Row = function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="hover:bg-primary-500/10 transition-colors">{children}</tr>;
};

Table.Cell = function TableCell({
    children,
    align = 'left',
    className = '',
    colSpan,
}: {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    className?: string;
    colSpan?: number;
}) {
    const alignment =
        align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

    return (
        <td colSpan={colSpan} className={`px-6 py-4 text-sm text-texto-500 whitespace-nowrap ${alignment} ${className}`}>
            {children}
        </td>
    );
};