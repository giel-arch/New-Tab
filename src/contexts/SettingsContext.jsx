import { createContext, useContext, useReducer, useEffect } from 'react';

const SettingsContext = createContext();

const initialState = {
  theme: 'light',
  searchEngine: 'google',
  animations: true,
  background: 'gradient',
  widgets: {
    clock: true,
    weather: true,
    todo: true,
    quote: true,
    links: true,
  },
  customLinks: [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
    { name: 'Reddit', url: 'https://reddit.com', icon: 'reddit' },
  ],
  weatherLocation: 'Jakarta',
  todoItems: [],
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_SEARCH_ENGINE':
      return { ...state, searchEngine: action.payload };
    case 'TOGGLE_ANIMATIONS':
      return { ...state, animations: !state.animations };
    case 'SET_BACKGROUND':
      return { ...state, background: action.payload };
    case 'TOGGLE_WIDGET':
      return {
        ...state,
        widgets: {
          ...state.widgets,
          [action.payload]: !state.widgets[action.payload],
        },
      };
    case 'ADD_CUSTOM_LINK':
      return {
        ...state,
        customLinks: [...state.customLinks, action.payload],
      };
    case 'REMOVE_CUSTOM_LINK':
      return {
        ...state,
        customLinks: state.customLinks.filter((_, index) => index !== action.payload),
      };
    case 'SET_WEATHER_LOCATION':
      return { ...state, weatherLocation: action.payload };
    case 'ADD_TODO_ITEM':
      return {
        ...state,
        todoItems: [...state.todoItems, action.payload],
      };
    case 'REMOVE_TODO_ITEM':
      return {
        ...state,
        todoItems: state.todoItems.filter((_, index) => index !== action.payload),
      };
    case 'TOGGLE_TODO_ITEM':
      return {
        ...state,
        todoItems: state.todoItems.map((item, index) =>
          index === action.payload ? { ...item, completed: !item.completed } : item
        ),
      };
    case 'LOAD_SETTINGS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('newTabSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        dispatch({ type: 'LOAD_SETTINGS', payload: parsedSettings });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('newTabSettings', JSON.stringify(state));
  }, [state]);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 