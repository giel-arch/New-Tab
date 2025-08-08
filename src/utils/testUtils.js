// Test utilities for New Tab Page

export const mockSettings = {
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
  ],
  weatherLocation: 'Jakarta',
  todoItems: [
    { id: 1, text: 'Test todo', completed: false, createdAt: new Date().toISOString() },
  ],
};

export const mockWeatherData = {
  main: {
    temp: 28,
    humidity: 65,
    feels_like: 30,
  },
  weather: [{ icon: '01d', description: 'Cerah' }],
  wind: { speed: 5 },
  name: 'Jakarta',
};

export const mockQuoteData = {
  content: 'Test quote content',
  author: 'Test Author',
};

export const createMockElement = (tag = 'div', props = {}) => {
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  return element;
};

export const waitForElement = (selector, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
};

export const fireEvent = (element, eventType, options = {}) => {
  const event = new Event(eventType, { bubbles: true, ...options });
  element.dispatchEvent(event);
  return event;
};

export const mockLocalStorage = () => {
  const store = {};
  
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
};

export const mockSpeechRecognition = () => {
  const mockRecognition = {
    continuous: false,
    interimResults: false,
    lang: 'id-ID',
    start: jest.fn(),
    stop: jest.fn(),
    abort: jest.fn(),
    onresult: null,
    onerror: null,
    onend: null,
  };

  global.webkitSpeechRecognition = jest.fn(() => mockRecognition);
  return mockRecognition;
};

export const mockFetch = (response, ok = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
    })
  );
};

export const cleanup = () => {
  // Clean up DOM
  document.body.innerHTML = '';
  
  // Clean up localStorage
  localStorage.clear();
  
  // Clean up fetch mock
  if (global.fetch) {
    global.fetch.mockClear();
  }
  
  // Clean up speech recognition mock
  if (global.webkitSpeechRecognition) {
    global.webkitSpeechRecognition.mockClear();
  }
}; 