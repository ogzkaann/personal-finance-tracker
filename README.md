# Personal Finance Tracker

Modern ve kullanıcı dostu bir kişisel finans takip uygulaması.

## Özellikler

- 💰 Gelir ve gider işlemlerini kolayca ekleyip yönetme
- 📊 Detaylı analitik ve grafikler
- 🏷️ Özelleştirilebilir kategoriler
- 📱 Responsive tasarım
- 💾 LocalStorage ile veri kalıcılığı
- 📈 Aylık trend analizi
- 💹 Tasarruf oranı hesaplama

## Teknolojiler

- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia
- Vue Router
- TailwindCSS
- Chart.js
- Vitest

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Uygulamayı derle
npm run build

# Testleri çalıştır
npm run test
```

## Proje Yapısı

```
src/
├── assets/        # Statik dosyalar
├── components/    # Vue bileşenleri
├── composables/   # Composable fonksiyonlar
├── router/        # Vue Router yapılandırması
├── stores/        # Pinia store'ları
├── types/         # TypeScript tipleri
├── utils/         # Yardımcı fonksiyonlar
└── views/         # Sayfa bileşenleri
```

## Geliştirme Kılavuzu

### Bileşen Yapısı

- Tüm bileşenler TypeScript ve Composition API kullanır
- Props ve emit tanımları için TypeScript type/interface kullanılır
- Bileşenler mümkün olduğunca küçük ve tek sorumlu olmalıdır

### State Yönetimi

- Global state için Pinia store'ları kullanılır
- LocalStorage senkronizasyonu store'larda yapılır
- Computed property'ler için TypeScript tip tanımları yapılır

### Stil Kılavuzu

- TailwindCSS utility-first yaklaşımı
- Özel CSS sadece gerektiğinde kullanılır
- Tutarlı renk paleti ve aralıklar
- Responsive tasarım için TailwindCSS breakpoint'leri

### Test Stratejisi

- Vitest ile birim testleri
- Kritik iş mantığı için kapsamlı testler
- Bileşen testleri için Vue Test Utils
- Store ve utils için izole testler

## Lisans

MIT
