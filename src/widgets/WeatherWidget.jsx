import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudLightning, Wind } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const WeatherWidget = () => {
  const { state } = useSettings();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const weatherIcons = {
    '01d': Sun,
    '01n': Sun,
    '02d': Cloud,
    '02n': Cloud,
    '03d': Cloud,
    '03n': Cloud,
    '04d': Cloud,
    '04n': Cloud,
    '09d': CloudRain,
    '09n': CloudRain,
    '10d': CloudRain,
    '10n': CloudRain,
    '11d': CloudLightning,
    '11n': CloudLightning,
    '13d': Cloud,
    '13n': Cloud,
    '50d': Wind,
    '50n': Wind,
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using OpenWeatherMap API (free tier)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${state.weatherLocation}&appid=YOUR_API_KEY&units=metric&lang=id`
        );
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data cuaca');
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        // Fallback data for demo
        setWeather({
          main: {
            temp: 28,
            humidity: 65,
            feels_like: 30,
          },
          weather: [{ icon: '01d', description: 'Cerah' }],
          wind: { speed: 5 },
          name: state.weatherLocation,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [state.weatherLocation]);

  const getWeatherIcon = (iconCode) => {
    const IconComponent = weatherIcons[iconCode] || Sun;
    return <IconComponent className="w-8 h-8 text-white" />;
  };

  if (loading) {
    return (
      <motion.div
        className={state.theme === 'dark' ? 'widget-card-dark' : 'widget-card'}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Cloud className="w-5 h-5 text-white/80" />
          <h3 className="text-white font-semibold">Cuaca</h3>
        </div>
        <div className="text-center">
          <div className="animate-pulse text-white/60">Memuat cuaca...</div>
        </div>
      </motion.div>
    );
  }

  if (error && !weather) {
    return (
      <motion.div
        className={state.theme === 'dark' ? 'widget-card-dark' : 'widget-card'}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Cloud className="w-5 h-5 text-white/80" />
          <h3 className="text-white font-semibold">Cuaca</h3>
        </div>
        <div className="text-center text-red-300 text-sm">
          {error}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={state.theme === 'dark' ? 'widget-card-dark' : 'widget-card'}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Cloud className="w-5 h-5 text-white/80" />
        <h3 className="text-white font-semibold">Cuaca</h3>
      </div>

      <div className="text-center">
        <div className="flex justify-center mb-3">
          {getWeatherIcon(weather.weather[0].icon)}
        </div>
        
        <motion.div
          className="text-3xl font-bold text-white mb-1"
          key={weather.main.temp}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {Math.round(weather.main.temp)}°C
        </motion.div>
        
        <div className="text-white/70 text-sm mb-3">
          {weather.weather[0].description}
        </div>
        
        <div className="text-white/60 text-xs space-y-1">
          <div>Terasa seperti: {Math.round(weather.main.feels_like)}°C</div>
          <div>Kelembaban: {weather.main.humidity}%</div>
          <div>Angin: {weather.wind.speed} m/s</div>
          <div className="text-white/50">{weather.name}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget; 