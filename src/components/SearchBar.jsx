import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Camera, Settings } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const SearchBar = () => {
  const { state, dispatch } = useSettings();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSearchEngines, setShowSearchEngines] = useState(false);
  const searchRef = useRef(null);

  const searchEngines = {
    google: {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      icon: '🔍',
    },
    bing: {
      name: 'Bing',
      url: 'https://www.bing.com/search?q=',
      icon: '🔎',
    },
    duckduckgo: {
      name: 'DuckDuckGo',
      url: 'https://duckduckgo.com/?q=',
      icon: '🦆',
    },
    youtube: {
      name: 'YouTube',
      url: 'https://www.youtube.com/results?search_query=',
      icon: '📺',
    },
    github: {
      name: 'GitHub',
      url: 'https://github.com/search?q=',
      icon: '💻',
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const searchEngine = searchEngines[state.searchEngine];
      const searchUrl = searchEngine.url + encodeURIComponent(query.trim());
      window.open(searchUrl, '_blank');
      setQuery('');
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'id-ID';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognition.start();
    } else {
      alert('Voice search tidak didukung di browser ini');
    }
  };

  const handleImageSearch = () => {
    if (query.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query.trim())}&tbm=isch`;
      window.open(searchUrl, '_blank');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchEngines(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInputClass = () => {
    const baseClass = "w-full px-6 py-4 text-lg text-white placeholder-white/70 focus:outline-none transition-all duration-300 rounded-2xl";
    const themeClass = state.theme === 'dark' ? 'search-input-dark' : 'search-input';
    return `${baseClass} ${themeClass}`;
  };

  return (
    <motion.div
      ref={searchRef}
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Cari di web..."
            className={getInputClass()}
          />
          
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <Search className="w-5 h-5 text-white/70" />
            {state.searchEngine && (
              <span className="text-white/70 text-sm">
                {searchEngines[state.searchEngine].icon}
              </span>
            )}
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <motion.button
              type="button"
              onClick={handleVoiceSearch}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mic className="w-4 h-4 text-white/70" />
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleImageSearch}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="w-4 h-4 text-white/70" />
            </motion.button>
            
            <motion.button
              type="button"
              onClick={() => setShowSearchEngines(!showSearchEngines)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-4 h-4 text-white/70" />
            </motion.button>
          </div>
        </div>

        {/* Search Engine Dropdown */}
        {showSearchEngines && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 z-50"
          >
            {Object.entries(searchEngines).map(([key, engine]) => (
              <button
                key={key}
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH_ENGINE', payload: key });
                  setShowSearchEngines(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  state.searchEngine === key
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{engine.icon}</span>
                <span className="font-medium">{engine.name}</span>
                {state.searchEngine === key && (
                  <span className="ml-auto text-white">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </form>

      {/* Search suggestions */}
      {isFocused && query.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 z-40"
        >
          <div className="text-white/70 text-sm px-4 py-2">
            Tekan Enter untuk mencari "{query}"
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar; 