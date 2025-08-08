import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, RefreshCw } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const QuoteWidget = () => {
  const { state } = useSettings();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackQuotes = [
    {
      text: "Keberhasilan bukanlah akhir, kegagalan bukanlah fatal: yang penting adalah keberanian untuk melanjutkan.",
      author: "Winston Churchill"
    },
    {
      text: "Hidup adalah 10% apa yang terjadi padamu dan 90% bagaimana kamu meresponsnya.",
      author: "Charles R. Swindoll"
    },
    {
      text: "Masa depan milik mereka yang percaya pada keindahan mimpi mereka.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "Jangan menunggu. Waktu tidak akan pernah tepat.",
      author: "Napoleon Hill"
    },
    {
      text: "Kesuksesan adalah kemampuan untuk beralih dari satu kegagalan ke kegagalan lain tanpa kehilangan antusiasme.",
      author: "Winston Churchill"
    },
    {
      text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan.",
      author: "Steve Jobs"
    },
    {
      text: "Pertanyaan bukanlah apakah mereka akan menembakmu, tapi apakah kamu akan bangkit setiap kali kamu jatuh.",
      author: "Vince Lombardi"
    },
    {
      text: "Kamu tidak bisa mengontrol segalanya. Kadang-kadang kamu hanya perlu bersantai dan percaya bahwa semuanya akan baik-baik saja.",
      author: "Anonymous"
    }
  ];

  const fetchQuote = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API
      const response = await fetch('https://api.quotable.io/random?maxLength=150');
      
      if (response.ok) {
        const data = await response.json();
        setQuote({
          text: data.content,
          author: data.author
        });
      } else {
        // Fallback to local quotes
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(randomQuote);
      }
    } catch (error) {
      // Fallback to local quotes
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRefresh = () => {
    fetchQuote();
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
          <Quote className="w-5 h-5 text-white/80" />
          <h3 className="text-white font-semibold">Quote Hari Ini</h3>
        </div>
        <motion.button
          onClick={handleRefresh}
          className="text-white/60 hover:text-white transition-colors"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-pulse text-white/60">Memuat quote...</div>
        </div>
      ) : (
        <div className="text-center">
          <motion.div
            key={quote?.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="text-white text-sm leading-relaxed mb-4">
              "{quote?.text}"
            </div>
            <div className="text-white/70 text-xs">
              — {quote?.author}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default QuoteWidget; 