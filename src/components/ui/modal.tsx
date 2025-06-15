"use client";

export function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-xl w-full max-w-lg relative">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={onClose}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}