import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Palette, Search, Eye, EyeOff, Clock, Cloud, CheckSquare, Quote, Link } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { state, dispatch } = useSettings();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Umum', icon: Settings },
    { id: 'appearance', name: 'Tampilan', icon: Palette },
    { id: 'search', name: 'Pencarian', icon: Search },
    { id: 'widgets', name: 'Widget', icon: Clock },
  ];

  const searchEngines = [
    { id: 'google', name: 'Google', icon: '🔍' },
    { id: 'bing', name: 'Bing', icon: '🔎' },
    { id: 'duckduckgo', name: 'DuckDuckGo', icon: '🦆' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'github', name: 'GitHub', icon: '💻' },
  ];

  const backgrounds = [
    { id: 'gradient', name: 'Gradient', icon: '🌈' },
    { id: 'solid', name: 'Solid', icon: '🎨' },
    { id: 'image', name: 'Gambar', icon: '🖼️' },
  ];

  const widgets = [
    { id: 'clock', name: 'Jam', icon: Clock },
    { id: 'weather', name: 'Cuaca', icon: Cloud },
    { id: 'todo', name: 'To-Do', icon: CheckSquare },
    { id: 'quote', name: 'Quote', icon: Quote },
    { id: 'links', name: 'Link Favorit', icon: Link },
  ];

  const handleThemeChange = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const handleSearchEngineChange = (engine) => {
    dispatch({ type: 'SET_SEARCH_ENGINE', payload: engine });
  };

  const handleBackgroundChange = (background) => {
    dispatch({ type: 'SET_BACKGROUND', payload: background });
  };

  const handleWidgetToggle = (widgetId) => {
    dispatch({ type: 'TOGGLE_WIDGET', payload: widgetId });
  };

  const handleAnimationToggle = () => {
    dispatch({ type: 'TOGGLE_ANIMATIONS' });
  };

  const handleWeatherLocationChange = (e) => {
    dispatch({ type: 'SET_WEATHER_LOCATION', payload: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white/10 backdrop-blur-md border-l border-white/20 z-50 overflow-y-auto scrollbar-hide"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-xl font-bold text-white">Pengaturan</h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Tema</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['light', 'dark'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => handleThemeChange(theme)}
                          className={`p-3 rounded-lg border transition-colors ${
                            state.theme === theme
                              ? 'bg-white/20 border-white text-white'
                              : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                          }`}
                        >
                          {theme === 'light' ? '☀️ Terang' : '🌙 Gelap'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">Animasi</h3>
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {state.animations ? (
                          <Eye className="w-5 h-5 text-white" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-white/60" />
                        )}
                        <span className="text-white">Aktifkan Animasi</span>
                      </div>
                      <button
                        onClick={handleAnimationToggle}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          state.animations ? 'bg-white' : 'bg-white/30'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-gray-800 rounded-full transition-transform ${
                            state.animations ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">Lokasi Cuaca</h3>
                    <input
                      type="text"
                      value={state.weatherLocation}
                      onChange={handleWeatherLocationChange}
                      placeholder="Masukkan nama kota..."
                      className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Background</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {backgrounds.map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => handleBackgroundChange(bg.id)}
                          className={`p-3 rounded-lg border transition-colors ${
                            state.background === bg.id
                              ? 'bg-white/20 border-white text-white'
                              : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                          }`}
                        >
                          <div className="text-2xl mb-1">{bg.icon}</div>
                          <div className="text-xs">{bg.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Search Tab */}
              {activeTab === 'search' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Search Engine Default</h3>
                    <div className="space-y-2">
                      {searchEngines.map((engine) => (
                        <button
                          key={engine.id}
                          onClick={() => handleSearchEngineChange(engine.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                            state.searchEngine === engine.id
                              ? 'bg-white/20 border-white text-white'
                              : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                          }`}
                        >
                          <span className="text-lg">{engine.icon}</span>
                          <span className="font-medium">{engine.name}</span>
                          {state.searchEngine === engine.id && (
                            <span className="ml-auto text-white">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Widgets Tab */}
              {activeTab === 'widgets' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Widget yang Ditampilkan</h3>
                    <div className="space-y-2">
                      {widgets.map((widget) => (
                        <div
                          key={widget.id}
                          className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <widget.icon className="w-5 h-5 text-white" />
                            <span className="text-white">{widget.name}</span>
                          </div>
                          <button
                            onClick={() => handleWidgetToggle(widget.id)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              state.widgets[widget.id] ? 'bg-white' : 'bg-white/30'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-gray-800 rounded-full transition-transform ${
                                state.widgets[widget.id] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel; 