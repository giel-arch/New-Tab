import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, Plus, Trash2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const TodoWidget = () => {
  const { state, dispatch } = useSettings();
  const [newTodo, setNewTodo] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({
        type: 'ADD_TODO_ITEM',
        payload: {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      });
      setNewTodo('');
      setShowAddForm(false);
    }
  };

  const handleToggleTodo = (index) => {
    dispatch({ type: 'TOGGLE_TODO_ITEM', payload: index });
  };

  const handleRemoveTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO_ITEM', payload: index });
  };

  const completedCount = state.todoItems.filter(item => item.completed).length;
  const totalCount = state.todoItems.length;

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
          <CheckSquare className="w-5 h-5 text-white/80" />
          <h3 className="text-white font-semibold">To-Do</h3>
        </div>
        <div className="text-white/60 text-sm">
          {completedCount}/{totalCount}
        </div>
      </div>

      {/* Add new todo form */}
      {showAddForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleAddTodo}
          className="mb-4"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Tambah tugas baru..."
              className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
              autoFocus
            />
            <motion.button
              type="submit"
              className="px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Todo list */}
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {state.todoItems.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <motion.button
                onClick={() => handleToggleTodo(index)}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {todo.completed ? (
                  <CheckSquare className="w-5 h-5 text-green-400" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </motion.button>
              
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? 'text-white/50 line-through'
                    : 'text-white'
                }`}
              >
                {todo.text}
              </span>
              
              <motion.button
                onClick={() => handleRemoveTodo(index)}
                className="text-white/60 hover:text-red-400 transition-colors"
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
          + Tambah Tugas
        </motion.button>
      )}

      {/* Empty state */}
      {state.todoItems.length === 0 && (
        <div className="text-center py-4">
          <div className="text-white/50 text-sm">
            Belum ada tugas. Tambahkan tugas baru!
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TodoWidget; 