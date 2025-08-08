import { useEffect } from 'react';

export const useKeyboardShortcuts = ({ onSearchFocus, onSettingsOpen }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl + K: Focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        onSearchFocus?.();
      }

      // Ctrl + ,: Open settings
      if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        event.preventDefault();
        onSettingsOpen?.();
      }

      // Escape: Close modals/panels
      if (event.key === 'Escape') {
        // This will be handled by individual components
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearchFocus, onSettingsOpen]);
}; 