// src/Components/ui/Pagination.tsx

import React from 'react';
import { router } from '@inertiajs/react';

interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export function Pagination({ links }: PaginationProps) {
  if (!links || links.length <= 3) return null;

  return (
    <div className="flex items-center justify-center mt-6 space-x-1">
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => link.url && router.visit(link.url)}
          disabled={!link.url}
          className={`px-3 py-1 text-sm rounded-md border 
            ${link.active ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 hover:bg-gray-100'}
            ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}
