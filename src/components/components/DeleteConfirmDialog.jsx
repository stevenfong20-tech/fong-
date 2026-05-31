import React from 'react';
export default function DeleteConfirmDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center">
        <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
        <p className="text-gray-500 mb-4">This action cannot be undone.</p>
        <div className="flex justify-center gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
        </div>
      </div>
    </div>
  );
}
