# 🌟 New Tab Page - Halaman Tab Baru yang Penuh Animasi

Sebuah halaman tab baru yang indah, penuh animasi, dan sangat dapat dikustomisasi untuk browser Anda. Dibuat dengan React, TailwindCSS, dan Framer Motion.

## ✨ Fitur Utama

### 🔍 Search Engine yang Canggih
- **Multi-search engine**: Google, Bing, DuckDuckGo, YouTube, GitHub
- **Voice search**: Pencarian suara dengan Web Speech API
- **Image search**: Pencarian gambar langsung
- **Keyboard shortcuts**: Ctrl+K untuk fokus pencarian

### 🎨 Animasi yang Menakjubkan
- **Particle system**: Partikel bergerak dengan koneksi dinamis
- **Floating elements**: Elemen mengambang dengan animasi halus
- **Gradient backgrounds**: Background gradient yang bergerak
- **Smooth transitions**: Transisi halus antar komponen
- **Hover effects**: Efek hover yang responsif

### 📱 Widget yang Interaktif
- **🕐 Jam Digital/Analog**: Tampilan jam yang dapat beralih antara digital dan analog
- **🌤️ Widget Cuaca**: Informasi cuaca real-time dengan API
- **✅ To-Do List**: Manajemen tugas dengan animasi
- **💬 Quote Harian**: Quote inspiratif yang dapat di-refresh
- **🔗 Link Favorit**: Manajemen link favorit dengan ikon otomatis

### ⚙️ Pengaturan Lengkap
- **Tema**: Light/Dark mode
- **Animasi**: Aktif/nonaktif animasi
- **Search engine**: Pilih search engine default
- **Widget**: Aktif/nonaktif widget individual
- **Background**: Pilih jenis background
- **Lokasi cuaca**: Set lokasi untuk widget cuaca

### 🎯 Fitur Tambahan
- **Responsive design**: Tampilan optimal di semua perangkat
- **Keyboard shortcuts**: Navigasi cepat dengan keyboard
- **Local storage**: Semua pengaturan tersimpan
- **Glass morphism**: Efek kaca modern
- **Performance optimized**: Performa yang optimal

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd new-tab-page
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan development server**
```bash
npm run dev
```

4. **Build untuk production**
```bash
npm run build
```

## 🛠️ Teknologi yang Digunakan

- **React 18**: Framework utama
- **Vite**: Build tool yang cepat
- **TailwindCSS**: Styling utility-first
- **Framer Motion**: Animasi yang smooth
- **Lucide React**: Icon library
- **Headless UI**: Komponen UI yang accessible

## 📁 Struktur Project

```
src/
├── components/          # Komponen utama
│   ├── AnimatedBackground.jsx
│   ├── SearchBar.jsx
│   ├── SettingsPanel.jsx
│   └── WidgetGrid.jsx
├── widgets/            # Widget individual
│   ├── ClockWidget.jsx
│   ├── WeatherWidget.jsx
│   ├── TodoWidget.jsx
│   ├── QuoteWidget.jsx
│   └── LinksWidget.jsx
├── contexts/           # State management
│   └── SettingsContext.jsx
├── hooks/             # Custom hooks
│   └── useKeyboardShortcuts.js
└── App.jsx            # Komponen utama
```

## 🎮 Keyboard Shortcuts

- `Ctrl + K`: Fokus ke search bar
- `Ctrl + ,`: Buka pengaturan
- `Escape`: Tutup modal/panel

## 🔧 Konfigurasi

### API Keys (Opsional)
Untuk widget cuaca yang berfungsi penuh, Anda dapat menambahkan API key OpenWeatherMap:

1. Daftar di [OpenWeatherMap](https://openweathermap.org/api)
2. Dapatkan API key gratis
3. Ganti `YOUR_API_KEY` di `WeatherWidget.jsx`

### Customization
Semua pengaturan dapat diubah melalui panel pengaturan yang dapat diakses dengan:
- Klik tombol settings di header
- Klik floating action button
- Tekan `Ctrl + ,`

## 🎨 Customization

### Menambah Widget Baru
1. Buat komponen widget di `src/widgets/`
2. Import di `WidgetGrid.jsx`
3. Tambahkan ke `widgetComponents` object
4. Tambahkan toggle di `SettingsContext.jsx`

### Mengubah Tema
- Edit `tailwind.config.js` untuk custom colors
- Modifikasi CSS variables di `src/index.css`
- Tambahkan tema baru di `SettingsContext.jsx`

### Menambah Search Engine
1. Tambahkan ke `searchEngines` object di `SearchBar.jsx`
2. Pastikan URL format sesuai dengan API search engine

## 📱 Responsive Design

Project ini fully responsive dengan breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🚀 Performance

- **Lazy loading**: Widget dimuat sesuai kebutuhan
- **Optimized animations**: Animasi yang smooth tanpa lag
- **Efficient re-renders**: Minimal re-render dengan React.memo
- **Bundle optimization**: Tree shaking dan code splitting

## 🤝 Contributing

1. Fork project
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- **Framer Motion**: Untuk animasi yang luar biasa
- **TailwindCSS**: Untuk styling yang cepat
- **Lucide**: Untuk icon yang indah
- **OpenWeatherMap**: Untuk API cuaca
- **Quotable**: Untuk API quote

## 📞 Support

Jika Anda memiliki pertanyaan atau masalah:
- Buat issue di GitHub
- Email: [your-email@example.com]
- Discord: [your-discord]

---

**Dibuat dengan ❤️ untuk produktivitas yang lebih baik** 