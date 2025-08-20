import React, { useEffect, useState } from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: (confirmed: boolean) => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmClass?: string;
    cancelClass?: string;
    containerClass?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    title = 'Are you sure?',
    description = 'Are you sure you want to continue',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmClass = 'bg-red-600 hover:bg-red-700 text-white',
    cancelClass = 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    containerClass = '',
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm ${containerClass}`}>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                {description && <p className="mb-4 text-sm text-gray-600">{description}</p>}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => onClose(false)}
                        className={`px-4 py-2 rounded ${cancelClass}`}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => onClose(true)}
                        className={`px-4 py-2 rounded ${confirmClass}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
