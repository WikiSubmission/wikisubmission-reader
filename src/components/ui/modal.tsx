"use client";

export function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded bg-white p-6 shadow-xl dark:bg-gray-900">
        <button className="absolute right-2 top-2 text-gray-600 hover:text-black" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
