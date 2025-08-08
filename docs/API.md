# API Documentation

## Settings Context API

### State Structure
```javascript
{
  theme: 'light' | 'dark',
  searchEngine: 'google' | 'bing' | 'duckduckgo' | 'youtube' | 'github',
  animations: boolean,
  background: 'gradient' | 'solid' | 'image',
  widgets: {
    clock: boolean,
    weather: boolean,
    todo: boolean,
    quote: boolean,
    links: boolean,
  },
  customLinks: Array<{
    name: string,
    url: string,
    icon: string,
  }>,
  weatherLocation: string,
  todoItems: Array<{
    id: number,
    text: string,
    completed: boolean,
    createdAt: string,
  }>,
}
```

### Actions
- `SET_THEME`: Mengubah tema aplikasi
- `SET_SEARCH_ENGINE`: Mengubah search engine default
- `TOGGLE_ANIMATIONS`: Mengaktifkan/menonaktifkan animasi
- `SET_BACKGROUND`: Mengubah jenis background
- `TOGGLE_WIDGET`: Mengaktifkan/menonaktifkan widget
- `ADD_CUSTOM_LINK`: Menambah link favorit
- `REMOVE_CUSTOM_LINK`: Menghapus link favorit
- `SET_WEATHER_LOCATION`: Mengubah lokasi cuaca
- `ADD_TODO_ITEM`: Menambah item todo
- `REMOVE_TODO_ITEM`: Menghapus item todo
- `TOGGLE_TODO_ITEM`: Mengubah status todo item

## Widget API

### ClockWidget
**Props:** Tidak ada
**Features:**
- Tampilan jam digital dan analog
- Auto-update setiap detik
- Animasi smooth saat pergantian

### WeatherWidget
**Props:** Tidak ada
**Features:**
- Fetch data cuaca dari API
- Fallback data jika API gagal
- Loading state
- Error handling

### TodoWidget
**Props:** Tidak ada
**Features:**
- CRUD operations untuk todo items
- Animasi saat add/remove
- Progress tracking
- Local storage persistence

### QuoteWidget
**Props:** Tidak ada
**Features:**
- Fetch quote dari API
- Fallback quotes lokal
- Refresh functionality
- Animasi smooth

### LinksWidget
**Props:** Tidak ada
**Features:**
- CRUD operations untuk custom links
- Auto icon detection
- External link handling
- Hover effects

## Search Engine API

### Supported Engines
- **Google**: `https://www.google.com/search?q=`
- **Bing**: `https://www.bing.com/search?q=`
- **DuckDuckGo**: `https://duckduckgo.com/?q=`
- **YouTube**: `https://www.youtube.com/results?search_query=`
- **GitHub**: `https://github.com/search?q=`

### Voice Search
Menggunakan Web Speech API:
```javascript
const recognition = new window.webkitSpeechRecognition();
recognition.lang = 'id-ID';
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // Handle transcript
};
```

## Keyboard Shortcuts

### Global Shortcuts
- `Ctrl + K`: Fokus ke search bar
- `Ctrl + ,`: Buka pengaturan
- `Escape`: Tutup modal/panel

### Widget Shortcuts
- `Enter`: Submit form
- `Tab`: Navigasi antar elemen
- `Space`: Toggle checkboxes

## Local Storage

### Key: `newTabSettings`
Menyimpan semua pengaturan dalam format JSON:
```javascript
{
  theme: string,
  searchEngine: string,
  animations: boolean,
  background: string,
  widgets: object,
  customLinks: array,
  weatherLocation: string,
  todoItems: array,
}
```

## External APIs

### Weather API (OpenWeatherMap)
**Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
**Parameters:**
- `q`: City name
- `appid`: API key
- `units`: metric
- `lang`: id

### Quote API (Quotable)
**Endpoint:** `https://api.quotable.io/random`
**Parameters:**
- `maxLength`: 150

## Error Handling

### Network Errors
- Fallback ke data lokal
- User-friendly error messages
- Retry mechanisms

### Storage Errors
- Graceful degradation
- Default values
- Error logging

## Performance Considerations

### Lazy Loading
- Widgets dimuat sesuai kebutuhan
- Conditional rendering
- Code splitting

### Animation Optimization
- Hardware acceleration
- Reduced motion support
- Performance monitoring

### Memory Management
- Cleanup event listeners
- Unmount cleanup
- Garbage collection friendly 