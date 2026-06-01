import React from 'react';
export default function BranchOrdersDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl p-6 z-50">
      <h3 className="text-lg font-bold mb-4">Branch Orders</h3>
      <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Close</button>
    </div>
  );
}