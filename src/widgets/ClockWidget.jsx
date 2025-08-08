import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const ClockWidget = () => {
  const { state } = useSettings();
  const [time, setTime] = useState(new Date());
  const [showAnalog, setShowAnalog] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAnalogTime = () => {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourDegrees = (hours * 30) + (minutes * 0.5);
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;

    return { hourDegrees, minuteDegrees, secondDegrees };
  };

  const { hourDegrees, minuteDegrees, secondDegrees } = getAnalogTime();

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
          <Clock className="w-5 h-5 text-white/80" />
          <h3 className="text-white font-semibold">Jam</h3>
        </div>
        <motion.button
          onClick={() => setShowAnalog(!showAnalog)}
          className="text-white/60 hover:text-white transition-colors text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAnalog ? 'Digital' : 'Analog'}
        </motion.button>
      </div>

      {showAnalog ? (
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            {/* Clock face */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 bg-white/5"></div>
            
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x = 60 + 50 * Math.cos(angle - Math.PI / 2);
              const y = 60 + 50 * Math.sin(angle - Math.PI / 2);
              return (
                <div
                  key={i}
                  className="absolute w-1 h-3 bg-white/60 rounded-full"
                  style={{
                    left: x - 0.5,
                    top: y - 1.5,
                    transform: `rotate(${i * 30}deg)`,
                    transformOrigin: 'center',
                  }}
                />
              );
            })}

            {/* Hour hand */}
            <motion.div
              className="absolute w-1 h-8 bg-white rounded-full origin-bottom"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
              }}
              animate={{ rotate: hourDegrees }}
              transition={{ duration: 0.5 }}
            />

            {/* Minute hand */}
            <motion.div
              className="absolute w-0.5 h-12 bg-white/80 rounded-full origin-bottom"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
              }}
              animate={{ rotate: minuteDegrees }}
              transition={{ duration: 0.5 }}
            />

            {/* Second hand */}
            <motion.div
              className="absolute w-0.5 h-14 bg-red-400 rounded-full origin-bottom"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
              }}
              animate={{ rotate: secondDegrees }}
              transition={{ duration: 0.1 }}
            />

            {/* Center dot */}
            <div className="absolute w-3 h-3 bg-white rounded-full" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold text-white mb-2"
            key={time.getTime()}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(time)}
          </motion.div>
          <div className="text-white/70 text-sm">
            {formatDate(time)}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ClockWidget; 