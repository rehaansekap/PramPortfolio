# **Documentation & Specifications**

**Project Name:** PramPortfolio (Portfolio & CMS System)

**Tech Stack:** Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS, Supabase (PostgreSQL), Three.js, Framer Motion, next-intl

**Repository:** `PramPortfolio`

---

## **1. Project Overview**

**PramPortfolio** adalah platform portfolio pengembang perangkat lunak (*software engineer*) modern dan CMS terintegrasi yang dirancang khusus untuk **Raihan Syeka Pramukastie** (Backend Developer & Full-Stack Engineer).

Platform ini menggabungkan estetika rekayasa perangkat lunak teknikal tingkat tinggi dengan antarmuka interaktif:
* **Visual Dinamis:** Animasi 3D interaktif (*Three.js*), transisi *Framer Motion*, dan *smooth scroll* (*Lenis*).
* **Multi-Bahasa (i18n):** Dukungan penuh dwi-bahasa (Bahasa Indonesia & Bahasa Inggris) menggunakan `next-intl`.
* **Media & Dokumentasi Interaktif:** Penampil gambar & video layar penuh (*Lightbox Overlay*) dan *Carousel Media* interaktif untuk proyek.
* **Desain Responsif Penuh:** Tampilan optimal untuk Desktop, Tablet, dan Mobile (dilengkapi menu *Hamburger Drawer* animasi).
* **Admin CMS Dashboard:** Manajemen konten dinamis berbasis cloud database (*Supabase*).

---

## **2. Database Architecture (Supabase / PostgreSQL)**

Database menggunakan Supabase (PostgreSQL) dengan skema relasional terstruktur:

### **Table: profile**
| No | Column Name | Data Type | Constraints / Remarks |
| :--- | :--- | :--- | :--- |
| 1 | id | Text | Primary Key |
| 2 | name | Text | Required |
| 3 | title_id / title_en | Text | Role / Jabatan dwi-bahasa |
| 4 | bio_short_id / bio_short_en | Text | Ringkasan bio |
| 5 | bio_long_id / bio_long_en | Text | Narasi biografi lengkap |
| 6 | email / phone / location | Text | Informasi kontak & domisili |
| 7 | linkedin_url / linktree_url | Text | Tautan media sosial |
| 8 | cv_file_url | Text | File dokumen CV yang dapat diunduh |

### **Table: projects**
| No | Column Name | Data Type | Constraints / Remarks |
| :--- | :--- | :--- | :--- |
| 1 | id | Text | Primary Key |
| 2 | slug | Text | Unique, URL identifier |
| 3 | title | Text | Judul proyek |
| 4 | category | Text | Enum: "fullstack", "backend", "ui-ux", "mobile" |
| 5 | cover_image_url | Text | URL gambar sampul |
| 6 | video_url | Text | URL video demonstrasi interaktif |
| 7 | gallery_images | Text[] | Array URL foto galeri & video showcase |
| 8 | problem_id / outcome_id | Text | Studi kasus masalah dan dampak hasil |
| 9 | tech_stack | Text[] | Array teknologi yang digunakan |
| 10 | is_featured | Boolean | Status tampil di halaman utama |

### **Table: experiences & educations**
| No | Column Name | Data Type | Constraints / Remarks |
| :--- | :--- | :--- | :--- |
| 1 | id | Text | Primary Key |
| 2 | type | Text | Enum: "work", "teaching", "organization" |
| 3 | title / institution | Text | Posisi jabatan atau nama instansi |
| 4 | start_date / end_date | Text | Periode waktu |
| 5 | media_urls | Text[] | Dokumentasi foto kegiatan (bisa > 1) |
| 6 | attachments | JSONB | Lampiran file dokumen PDF resmi (bisa > 1) |

---

## **3. Core Features**

### **3.1. Public Portfolio**
* **Hero Section:** Dilengkapi bingkai foto teknikal blueprint, badge status HUD, dan pengarah scroll dinamis.
* **Bola 3D Wireframe (Three.js):** Kanvas 3D interaktif yang dapat diputar 360° di Desktop, dan otomatis dinonaktifkan di Tablet & Mobile untuk efisiensi performa dan baterai.
* **Interactive Media Lightbox:** Membuka gambar dan video ke modal overlay gelap tanpa membuka tab baru, lengkap dengan tombol `X` di sudut gambar, tombol panah navigasi merapat, dan dukungan tombol `Esc`.
* **Project Media Carousel:** Pratinjau media utama 16:9 dengan strip thumbnail interaktif dan animasi luncuran slide (*directional spring physics*).
* **Lampiran Multi-PDF & Foto:** Dukungan pengunduhan lampiran PDF resmi dan pratinjau foto dokumentasi pada setiap riwayat kerja, organisasi, dan pendidikan.
* **Dual Theme:** Tema Gelap (*Dark Mode*) dan Terang (*Light Mode*) dengan kontras warna yang presisi.

### **3.2. Responsive Navigation & Mobile Drawer**
* **Desktop:** Navigasi horizontal ringkas dengan indikator halaman aktif.
* **Mobile & Tablet:** Menu *Hamburger* interaktif dengan animasi rotasi halus ikon `Menu` dan `X`. Membuka drawer geser (*slide-down*) berisi link navigasi, preferensi bahasa, dan status sistem.

### **3.3. Admin CMS Dashboard (`/admin`)**
* Autentikasi aman terintegrasi Supabase Auth.
* Manajemen Proyek (Tambah, Edit, Hapus, Reorder).
* Manajemen Pengalaman, Pendidikan, Keterampilan, dan Profil.
* Pengunggah media galeri dan lampiran PDF terintegrasi Supabase Storage.

---

## **4. Application Routes**

| No | URL Route | Type | Description |
| :--- | :--- | :--- | :--- |
| 1 | `/[locale]` | Public | Halaman Beranda (Hero, Skills, Experience, Projects) |
| 2 | `/[locale]/about` | Public | Halaman Tentang Saya (Bio, Edukasi, Pengalaman, Organisasi, Sertifikasi) |
| 3 | `/[locale]/projects` | Public | Arsip Proyek dengan filter kategori interaktif |
| 4 | `/[locale]/projects/[slug]` | Public | Halaman Detail Proyek & Studi Kasus mendalam |
| 5 | `/admin/login` | Admin | Halaman masuk CMS pengelola portfolio |
| 6 | `/admin` | Admin | Dashboard ringkasan analitik dan konten |
| 7 | `/admin/projects` | Admin | Manajemen data dan galeri proyek |
| 8 | `/admin/experiences` | Admin | Manajemen data riwayat kerja, organisasi & dokumen |
| 9 | `/admin/skills` | Admin | Manajemen kategori dan tag keterampilan |

---

## **5. Getting Started (Local Development)**

### **Prasyarat**
* Node.js versi 18.18+ atau 20+
* NPM atau PNPM

### **Langkah Instalasi**

1. **Clone Repositori & Masuk Direktori:**
   ```bash
   git clone https://github.com/rehaansekap/PramPortfolio.git
   cd PramPortfolio
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment (`.env.local`):**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ADMIN_PASSWORD=your-admin-password
   ```

4. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000`.

5. **Build Produksi:**
   ```bash
   npm run build
   npm run start
   ```

