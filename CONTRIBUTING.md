# Contributing to New Tab Page

Terima kasih atas minat Anda untuk berkontribusi pada New Tab Page! 🎉

## 🚀 Cara Berkontribusi

### Melaporkan Bug

1. **Cari issue yang sudah ada** - Pastikan bug belum dilaporkan
2. **Buat issue baru** dengan template yang disediakan
3. **Berikan detail lengkap**:
   - Langkah reproduksi
   - Perilaku yang diharapkan
   - Perilaku yang terjadi
   - Screenshot/video jika relevan
   - Informasi sistem (OS, browser, versi)

### Menyarankan Fitur

1. **Cari proposal yang sudah ada** - Pastikan fitur belum disarankan
2. **Buat issue baru** dengan label "enhancement"
3. **Jelaskan dengan detail**:
   - Masalah yang diselesaikan
   - Solusi yang diusulkan
   - Manfaat untuk pengguna
   - Mockup/wireframe jika ada

### Mengirim Pull Request

1. **Fork repository**
2. **Buat branch baru**:
   ```bash
   git checkout -b feature/nama-fitur
   ```
3. **Lakukan perubahan** dengan mengikuti standar kode
4. **Test perubahan** Anda
5. **Commit dengan pesan yang jelas**:
   ```bash
   git commit -m "feat: tambah fitur widget baru"
   ```
6. **Push ke fork Anda**
7. **Buat Pull Request** dengan template yang disediakan

## 📋 Standar Kode

### JavaScript/React

- **ESLint**: Ikuti konfigurasi ESLint yang ada
- **Prettier**: Gunakan Prettier untuk formatting
- **Hooks**: Gunakan React hooks dengan benar
- **Performance**: Optimalkan re-render dan memory usage
- **Accessibility**: Pastikan aksesibilitas untuk semua pengguna

### CSS/TailwindCSS

- **Utility-first**: Gunakan TailwindCSS utility classes
- **Custom CSS**: Minimal custom CSS, gunakan TailwindCSS
- **Responsive**: Pastikan responsive di semua ukuran layar
- **Dark mode**: Support untuk light/dark theme

### Komponen

- **Functional components**: Gunakan functional components dengan hooks
- **Props validation**: Validasi props dengan PropTypes atau TypeScript
- **Error boundaries**: Handle error dengan graceful degradation
- **Loading states**: Sediakan loading state untuk async operations

## 🧪 Testing

### Unit Tests

- **Coverage**: Minimal 80% test coverage
- **Components**: Test semua komponen utama
- **Hooks**: Test custom hooks
- **Utils**: Test utility functions

### Integration Tests

- **User flows**: Test alur pengguna utama
- **API integration**: Test integrasi dengan external APIs
- **Local storage**: Test persistence data

### Manual Testing

- **Cross-browser**: Test di Chrome, Firefox, Safari, Edge
- **Mobile**: Test di mobile devices
- **Accessibility**: Test dengan screen readers

## 📝 Commit Messages

Gunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(widget): tambah widget cuaca baru
fix(search): perbaiki voice search di Safari
docs(readme): update dokumentasi API
style(ui): perbaiki spacing di settings panel
refactor(context): optimalkan settings context
test(widget): tambah test untuk weather widget
chore(deps): update dependencies
```

### Types

- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Dokumentasi
- `style`: Formatting, missing semi colons, etc
- `refactor`: Refactoring code
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🏗️ Struktur Project

```
src/
├── components/          # Komponen utama
├── widgets/            # Widget individual
├── contexts/           # State management
├── hooks/             # Custom hooks
├── utils/             # Utility functions
└── App.jsx            # Komponen utama
```

## 🔧 Development Setup

1. **Clone repository**:
   ```bash
   git clone https://github.com/yourusername/new-tab-page.git
   cd new-tab-page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

5. **Lint code**:
   ```bash
   npm run lint
   ```

## 📋 Checklist PR

Sebelum submit PR, pastikan:

- [ ] Kode mengikuti standar yang ditentukan
- [ ] Semua test pass
- [ ] Tidak ada linting errors
- [ ] Dokumentasi diupdate jika perlu
- [ ] Screenshot/video untuk perubahan UI
- [ ] Test di multiple browsers
- [ ] Responsive design masih baik
- [ ] Performance tidak menurun
- [ ] Accessibility masih baik

## 🎯 Areas for Contribution

### High Priority

- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile experience enhancement
- [ ] New widget types
- [ ] Additional search engines
- [ ] Theme customization
- [ ] Animation improvements

### Medium Priority

- [ ] Documentation improvements
- [ ] Test coverage
- [ ] Code refactoring
- [ ] Bug fixes
- [ ] UI/UX improvements

### Low Priority

- [ ] Additional features
- [ ] Experimental features
- [ ] Nice-to-have improvements

## 🤝 Code of Conduct

- **Respect**: Hormati semua kontributor
- **Inclusive**: Terima semua jenis kontribusi
- **Constructive**: Berikan feedback yang konstruktif
- **Professional**: Jaga profesionalisme dalam diskusi

## 📞 Getting Help

- **Issues**: Gunakan GitHub Issues untuk bug reports dan feature requests
- **Discussions**: Gunakan GitHub Discussions untuk pertanyaan umum
- **Email**: Hubungi maintainer untuk pertanyaan pribadi

## 🙏 Recognition

Kontributor akan diakui di:
- README.md
- Release notes
- GitHub contributors page
- Project documentation

---

**Terima kasih untuk berkontribusi pada New Tab Page! 🌟** 