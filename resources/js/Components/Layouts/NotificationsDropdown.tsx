import { useEffect, useRef, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';

interface Notification {
    text: string;
    time: string;
}

interface NotificationsDropdownProps {
    notifications: Notification[];
}

export default function NotificationsDropdown({ notifications }: NotificationsDropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Notificaciones"
                aria-expanded={open}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <Bell className="h-5 w-5 text-gray-600" />
                {notifications.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full text-[10px] font-medium text-white flex items-center justify-center ring-2 ring-white">
                        {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-texto-500">Notificaciones</h3>
                        {notifications.length > 0 && (
                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                                {notifications.length} nueva{notifications.length !== 1 && 's'}
                            </span>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 py-10 px-4 text-center">
                                <BellOff className="h-6 w-6 text-gray-300" />
                                <p className="text-sm text-gray-400">No tienes notificaciones</p>
                            </div>
                        ) : (
                            notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0 border-gray-100 hover:bg-primary-50/50 cursor-pointer transition-colors"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary-600 mt-1.5 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-texto-500 truncate">{notification.text}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{notification.time}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <button className="w-full text-center text-xs font-medium text-primary-600 hover:bg-primary-50 py-2.5 border-t border-gray-100 transition-colors">
                            Ver todas
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}