import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // nuevos tamaños opcionales
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // default
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Fondo oscuro */}
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-25"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Contenido del modal con tamaño dinámico */}
        <div
          className={`bg-white rounded-lg p-6 w-full ${sizeClasses[size]} z-10 shadow-lg`}
        >
          {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
}
