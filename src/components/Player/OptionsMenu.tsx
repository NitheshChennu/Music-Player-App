import React from 'react';
// import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
}

export const OptionsMenu: React.FC<Props> = ({ isOpen, onClose, onExit }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute bottom-full right-4 mb-2 bg-[#282828] rounded-lg shadow-lg overflow-hidden animate-fadeIn"
      role="menu"
      aria-hidden={!isOpen}
    >
      <div className="p-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded"
          aria-label="Cancel"
        >
          Cancel
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExit();
          }}
          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-white/10 rounded"
          aria-label="Exit Player"
        >
          Exit Player
        </button>
      </div>
    </div>
  );
};
