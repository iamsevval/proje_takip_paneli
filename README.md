# 🚀 React Proje Takip & Yönetim Paneli

> **Web Geliştirme Eğitimi** kapsamında ReactJS, Tailwind CSS ve Modern JavaScript teknikleri kullanılarak geliştirilmiş kapsamlı bir CRUD uygulamasıdır.

![Proje Ekran Görüntüsü](./public/ornek1.png)

## 🔗 Canlı Demo
Uygulamayı buradan test edebilirsiniz: [https://dancing-mermaid-e3f22e.netlify.app/](https://dancing-mermaid-e3f22e.netlify.app/)

---

## 🌟 Proje Hakkında

Bu uygulama, kullanıcıların proje fikirlerini kayıt altına alabileceği, düzenleyebileceği ve takip edebileceği bir **Dashboard (Yönetim Paneli)** arayüzüdür. Standart bir "Todo App"ten farklı olarak; **API entegrasyonu**, **gelişmiş filtreleme**, **istatistikler** ve **kalıcı veri yönetimi** içerir.

## 🔥 Öne Çıkan Özellikler

### 1. Gelişmiş CRUD İşlemleri
- **Ekleme:** Yeni projeler başlık, kategori, açıklama ve önem derecesi ile eklenebilir.
- **Listeleme:** Projeler kartlar halinde listelenir.
- **Güncelleme (Edit Mode):** `prompt` yerine **form üzerinden** profesyonel düzenleme yapılır. Düzenle butonuna basıldığında form ilgili verilerle dolar.
- **Silme:** Onay mekanizması ile güvenli silme işlemi yapılır.

### 2. Akıllı Sıralama ve Filtreleme
- **Anlık Arama:** Arama çubuğuna yazılan kelimeye göre liste anlık olarak filtrelenir.
- **Öncelik Sıralaması:** Projeler önem derecesine göre otomatik sıralanır (**Yüksek > Orta > Düşük**).

![Proje Ekran Görüntüsü](./public/ornek2.png)

### 3. API Entegrasyonu & Veri Yönetimi
- **JSONPlaceholder API:** Başlangıç verileri API'den çekilir.
- **Homojen Veri Dağıtımı:** API'den gelen ham verilere, uygulamanın yapısına uygun olarak stabil ve sıralı (homojen) kategori ve önem dereceleri atanır.
- **LocalStorage:** Sayfa yenilense bile eklenen veriler kaybolmaz (State Persistence).

### 4. Kullanıcı Deneyimi (UX)
- **Karanlık/Aydınlık Tema (Dark Mode):** Kullanıcı tercihine göre tek tıkla değişen ve son durumu tarayıcı hafızasında (LocalStorage) tutarak modern bir tema deneyimi sunar.
- **Dashboard İstatistikleri:** Toplam, API ve Lokal veri sayılarını gösteren dinamik sayaçlar.
- **Loading State:** Veriler yüklenirken kullanıcıya "Yükleniyor" animasyonu gösterilir.
- **Toast Bildirimler:** İşlem başarı/hata durumlarında sağ üstte bilgilendirme mesajları çıkar.

![Proje Ekran Görüntüsü](./public/ornek3.png)

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **ReactJS** | Vite altyapısı ile Component bazlı mimari |
| **Tailwind CSS** | Modern ve responsive tasarım |
| **JavaScript (ES6+)** | Async/Await, Map/Filter/Reduce, Destructuring |
| **LocalStorage API** | Tarayıcı tabanlı veri saklama |
| **Fetch API** | Dış servislerden veri çekme |

---

## 📂 Klasör Yapısı 

Proje, modüler ve ölçeklenebilir bir dosya yapısına sahiptir:

```text
src/
├── Components/              # Yeniden kullanılabilir bileşenler
│   ├── ProjectForm.jsx       # Proje ekleme / güncelleme formu
│   ├── ProjectList.jsx       # Proje listesini render eden component
│   ├── ProjectCard.jsx       # Her proje kartını gösterir
│   ├── Stats.jsx             # Toplam, API ve Lokal istatistikler
│   ├── Notification.jsx      # Bildirim gösterimi
│   └── Footer.jsx            # Sayfa alt bilgisi
│
├── Pages/                   # Sayfa bileşenleri ve ana mantık
│   └── HomePage.jsx          # Dashboard, state yönetimi ve CRUD logic
│
├── Interfaces/              # Veri model ve tip tanımlamaları
│   └── IProject.js           # JSDoc formatında proje veri yapısı
│
├── styles/                  # Stil dosyaları (Tailwind / CSS)
│   └── index.css             # Global stil tanımlamaları ve Tailwind direktifleri
│
├── assets/                  # Görseller ve statik dosyalar
│   └── (örn: logo.png, icon.svg)  
│
├── App.jsx                   # Ana uygulama sarmalayıcısı (Router vs.)
└── main.jsx                  # Uygulama giriş noktası