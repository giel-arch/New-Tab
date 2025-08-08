import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Settings, Github, Heart } from 'lucide-react';
import { SettingsProvider } from './contexts/SettingsContext';
import AnimatedBackground from './components/AnimatedBackground';
import SearchBar from './components/SearchBar';
import WidgetGrid from './components/WidgetGrid';
import SettingsPanel from './components/SettingsPanel';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const searchRef = useRef(null);

  useKeyboardShortcuts({
    onSearchFocus: () => {
      const searchInput = searchRef.current?.querySelector('input');
      if (searchInput) {
        searchInput.focus();
      }
    },
    onSettingsOpen: () => setIsSettingsOpen(true),
  });

  return (
    <SettingsProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between p-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white/80 text-sm"
            >
              New Tab Page
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <motion.button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
                Selamat Datang
              </h1>
              <p className="text-xl text-white/80 text-shadow">
                Mulai hari Anda dengan produktivitas
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-2xl mb-12"
            >
              <SearchBar />
            </motion.div>

            {/* Widgets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full"
            >
              <WidgetGrid />
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="flex items-center justify-center p-6 text-white/60 text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center space-x-2"
            >
              <span>Dibuat dengan</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>untuk produktivitas</span>
            </motion.div>
          </footer>
        </div>

        {/* Settings Panel */}
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />

        {/* Floating Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="fixed bottom-6 right-6 z-20"
        >
          <motion.button
            onClick={() => setIsSettingsOpen(true)}
            className="p-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>

        {/* Keyboard Shortcuts Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="fixed bottom-6 left-6 z-20 text-white/40 text-xs"
        >
          <div>Ctrl + K: Fokus pencarian</div>
          <div>Ctrl + ,: Buka pengaturan</div>
        </motion.div>
      </div>
    </SettingsProvider>
  );
};

export default App; 