import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const LinksWidget = () => {
  const { state, dispatch } = useSettings();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ name: '', url: '' });

  const handleAddLink = (e) => {
    e.preventDefault();
    if (newLink.name.trim() && newLink.url.trim()) {
      dispatch({
        type: 'ADD_CUSTOM_LINK',
        payload: {
          name: newLink.name.trim(),
          url: newLink.url.trim(),
          icon: 'link',
        },
      });
      setNewLink({ name: '', url: '' });
      setShowAddForm(false);
    }
  };

  const handleRemoveLink = (index) => {
    dispatch({ type: 'REMOVE_CUSTOM_LINK', payload: index });
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  const getIconForLink = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('github')) return '💻';
    if (lowerName.includes('youtube')) return '📺';
    if (lowerName.includes('reddit')) return '🤖';
    if (lowerName.includes('twitter') || lowerName.includes('x')) return '🐦';
    if (lowerName.includes('facebook')) return '📘';
    if (lowerName.includes('instagram')) return '📷';
    if (lowerName.includes('linkedin')) return '💼';
    if (lowerName.includes('gmail') || lowerName.includes('mail')) return '📧';
    if (lowerName.includes('drive') || lowerName.includes('google')) return '☁️';
    if (lowerName.includes('spotify')) return '🎵';
    if (lowerName.includes('netflix')) return '🎬';
    return '🔗';
  };

  return (
    <motion.div
      className={state.theme === 'dark' ? 'widget-card-dark' : 'widget-card'}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Link className="w-5 h-5 text-white/80" />
          <h3 className="text-white font-semibold">Link Favorit</h3>
        </div>
        <div className="text-white/60 text-sm">
          {state.customLinks.length} link
        </div>
      </div>

      {/* Add new link form */}
      {showAddForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleAddLink}
          className="mb-4 space-y-2"
        >
          <input
            type="text"
            value={newLink.name}
            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
            placeholder="Nama link..."
            className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
            autoFocus
          />
          <input
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="URL (https://example.com)"
            className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
          />
          <div className="flex space-x-2">
            <motion.button
              type="submit"
              className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Tambah
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Batal
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Links list */}
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {state.customLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <span className="text-lg">{getIconForLink(link.name)}</span>
              
              <button
                onClick={() => handleLinkClick(link.url)}
                className="flex-1 text-left text-sm text-white hover:text-white/80 transition-colors flex items-center space-x-1"
              >
                <span className="truncate">{link.name}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
              </button>
              
              <motion.button
                onClick={() => handleRemoveLink(index)}
                className="text-white/60 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add button */}
      {!showAddForm && (
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="w-full mt-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4 inline mr-1" />
          Tambah Link
        </motion.button>
      )}

      {/* Empty state */}
      {state.customLinks.length === 0 && (
        <div className="text-center py-4">
          <div className="text-white/50 text-sm">
            Belum ada link favorit. Tambahkan link baru!
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LinksWidget; 