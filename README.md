# 🩺 Pediatri App — Tatalaksana & Kalkulator Dosis

> Platform klinis anak untuk dokter Indonesia. Mobile-first PWA dengan 12 poin klinis per penyakit.

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-blue)](https://dokrifqi.github.io/pediatri-app)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green)]()
[![Penyakit](https://img.shields.io/badge/Penyakit-10%2F40%2B-orange)]()

---

## ✨ Fitur Utama

- **12 Poin Klinis Lengkap** per penyakit: Definisi, Etiologi, Patofisiologi, Diagnosis, Pemeriksaan, Klasifikasi, Tatalaksana, Monitoring, Komplikasi, Edukasi, Prognosis & Referensi
- **Kalkulator Dosis** berbasis berat badan dan usia pasien
- **4 Tab Navigasi**: Beranda, Sistem Organ, Kalkulator, Profil
- **Progressive Web App (PWA)** — dapat digunakan luring di fasilitas kesehatan
- **Mobile-First Design** dioptimalkan untuk smartphone dokter

---

## 📊 Database Penyakit (10 / 40+)

| # | Penyakit | Sistem Organ | Status |
|---|----------|-------------|--------|
| 1 | Sepsis Neonatorum | Neonatologi | ✅ Lengkap |
| 2 | Hiperbilirubinemia Neonatal | Neonatologi | ✅ Lengkap |
| 3 | Asma Anak — Serangan Akut | Respirasi | ✅ Lengkap |
| 4 | Pneumonia Komunitas Anak | Respirasi | ✅ Lengkap |
| 5 | Diare Akut Anak | Pencernaan | ✅ Lengkap |
| 6 | Kejang Demam | Neurologi | ✅ Lengkap |
| 7 | Demam Berdarah Dengue | Infeksi Tropis | ✅ Lengkap |
| 8 | Demam Tifoid Anak | Infeksi Tropis | ✅ Lengkap |
| 9 | Tuberkulosis Paru Anak | Infeksi Tropis | ✅ Lengkap |
| 10 | Sindrom Nefrotik Anak | Nefrologi | ✅ Lengkap |

---

## 📁 Struktur Folder

```
pediatri-app/
├── index.html              ← Aplikasi utama PWA
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline)
├── data/
│   ├── index.js            ← Database registry & helper functions
│   ├── neonatologi/
│   │   ├── sepsis-neonatorum.json
│   │   └── hiperbilirubinemia.json
│   ├── respirasi/
│   │   ├── asma-anak.json
│   │   └── pneumonia-komunitas.json
│   ├── pencernaan/
│   │   └── diare-akut.json
│   ├── saraf/
│   │   └── kejang-demam.json
│   ├── infeksi/
│   │   ├── demam-berdarah-dengue.json
│   │   ├── demam-tifoid.json
│   │   └── tb-paru-anak.json
│   └── nefrologi/
│       └── sindrom-nefrotik.json
└── README.md
```

---

## 🚀 Deploy ke GitHub Pages

### Langkah 1: Upload ke GitHub
1. Buat repository baru di GitHub (contoh: `pediatri-app`)
2. Upload **semua file** dari folder `github-upload/`
3. Pastikan struktur folder persis seperti di atas

### Langkah 2: Aktifkan GitHub Pages
1. Buka repository → **Settings**
2. Scroll ke **Pages** (di sidebar kiri)
3. Source: **Deploy from a branch**
4. Branch: **main** / root: **/ (root)**
5. Klik **Save**
6. Tunggu 2–5 menit → URL akan muncul: `https://[username].github.io/[repo-name]`

### Langkah 3: Test
- Buka URL GitHub Pages di browser
- Coba klik penyakit untuk melihat 12 poin klinis
- Coba kalkulator dosis

---

## ➕ Menambah Penyakit Baru

### 1. Dapatkan Data dari Gemini
Gunakan file `MASTER_PROMPT_v2_LENGKAP.txt` — copy prompt ke [Gemini](https://gemini.google.com)

### 2. Buat File JSON
```
data/[kategori]/[nama-penyakit].json
```

### 3. Daftarkan di `data/index.js`
```javascript
"nama-penyakit": {
  path: "data/kategori/nama-penyakit.json",
  name: "Nama Penyakit",
  category: "kategori",
  icon: "emoji"
},
```

### 4. Update `index.html`
Tambahkan di daftar penyakit Beranda dan Sistem Organ.

### 5. Update `sw.js`
Tambahkan path JSON baru ke array `STATIC_ASSETS`.

---

## 📚 Referensi Klinis

- **IDAI** — Pedoman Pelayanan Medis & Formularium Anak
- **WHO IMCI** — Integrated Management of Childhood Illness
- **Nelson Textbook of Pediatrics**, 21st Edition
- **GINA 2023** — Global Strategy for Asthma
- **KDIGO 2021** — Glomerular Diseases Guidelines

---

## ⚠️ Disclaimer

Aplikasi ini bersifat **alat bantu klinis** untuk edukasi dokter, bukan pengganti penilaian klinis menyeluruh. Selalu gunakan pertimbangan klinis dan konsultasi spesialis untuk kasus kritis.

---

## 👨‍⚕️ Pengembang

**Pediatri App** — Dikembangkan oleh **@dokrifqi**  
dr. Mochamad Rifqie N K · Dokter Anak Indonesia  
© 2025 · Hak Cipta Dilindungi
