import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import ClockWidget from '../widgets/ClockWidget';
import WeatherWidget from '../widgets/WeatherWidget';
import TodoWidget from '../widgets/TodoWidget';
import QuoteWidget from '../widgets/QuoteWidget';
import LinksWidget from '../widgets/LinksWidget';

const WidgetGrid = () => {
  const { state } = useSettings();

  const widgetComponents = {
    clock: ClockWidget,
    weather: WeatherWidget,
    todo: TodoWidget,
    quote: QuoteWidget,
    links: LinksWidget,
  };

  const enabledWidgets = Object.entries(state.widgets)
    .filter(([_, enabled]) => enabled)
    .map(([widgetId, _]) => widgetId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (enabledWidgets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white/60"
      >
        <div className="text-lg mb-2">Tidak ada widget yang ditampilkan</div>
        <div className="text-sm">Buka pengaturan untuk mengaktifkan widget</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl mx-auto"
    >
      {enabledWidgets.map((widgetId) => {
        const WidgetComponent = widgetComponents[widgetId];
        if (!WidgetComponent) return null;

        return (
          <motion.div
            key={widgetId}
            variants={itemVariants}
            className="w-full"
          >
            <WidgetComponent />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default WidgetGrid; 