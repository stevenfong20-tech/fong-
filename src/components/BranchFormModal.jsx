import React from 'react';
export default function BranchFormModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Branch Form</h3>
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Close</button>
      </div>
    </div>
  );
}