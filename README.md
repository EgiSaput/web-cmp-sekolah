# Website Company Profile Sekolah Rahayu — Tahap 1

Prototype frontend menggunakan HTML, CSS, dan JavaScript murni. Belum menggunakan backend maupun database.

## Cara menjalankan
1. Ekstrak folder project.
2. Buka folder proyek di Visual Studio Code.
3. Jalankan `index.html` menggunakan ekstensi Live Server.
4. Pastikan koneksi internet tersedia untuk Google Fonts, Font Awesome, dan gambar dummy Unsplash.

Alternatif: buka `index.html` langsung di browser. Live Server lebih disarankan.

## Isi Tahap 1
- Homepage awal.
- Navbar responsive dan mobile menu.
- Footer.
- Design system navy, putih, dan emas (Light Mode konsisten).
- Toggle bahasa Indonesia/Inggris untuk elemen utama homepage.
- Statistik animasi.
- Kartu berita dari data dummy.
- Reveal animation.
- Floating WhatsApp dengan nomor dummy.
- Tombol kembali ke atas.

## Catatan
- Seluruh konten dan angka adalah data dummy.
- Gambar berasal dari URL Unsplash dan memerlukan koneksi internet.
- Ganti nomor WhatsApp, alamat, email, tanggal PPDB, dan seluruh konten dummy sebelum website dipublikasikan.
- Halaman lanjutan akan dibuat pada tahap berikutnya.

## Cakupan Komponen Sesuai Ruang Lingkup

1. **Halaman Profil Sekolah (`pages/profil.html`)**: Identitas sekolah, sejarah, visi misi, fasilitas, dan sambutan.
2. **Program dan Kegiatan Sekolah (`pages/akademik.html`)**: Kurikulum akademik, ekstrakurikuler, dan kegiatan santri/siswa.
3. **Berita dan Artikel (`pages/berita.html` & `pages/detail-berita.html`)**: Publikasi berita, artikel, prestasi, dan dokumentasi yang terhubung dinamis dengan CMS.
4. **Pengumuman Sekolah (`pages/pengumuman.html`)**: Media publikasi pengumuman dan surat edaran resmi yang dapat diperbarui secara berkala, dilengkapi filter kategori/prioritas dan modal baca.
5. **Content Management System (CMS Mock Frontend) (`admin/login.html` & `admin/index.html`)**: Dashboard administrasi mandiri berbasis `localStorage` tanpa perlu backend server:
   - **Kredensial Demo Petugas**: Email: `admin@sekolahrahayu.sch.id` | Kata Sandi: `admin123`.
   - Fitur CMS: Tambah, edit, dan hapus Berita; Tambah, edit, dan hapus Pengumuman; Pantau pendaftar PPDB online dan update status seleksi; Baca pesan kontak masuk; Reset ke data default dummy.
   - Sinkronisasi reaktif langsung ke halaman publik (Homepage, Berita, Pengumuman).
6. **Informasi PPDB Terpusat (`pages/ppdb.html`)**: Halaman informasi resmi penerimaan santri baru terintegrasi sistem pusat (tanpa formulir internal), memuat:
   - Pemberitahuan & tombol tautan langsung ke **Portal Resmi PPDB Pusat**.
   - Rincian 4 Jalur Masuk (Reguler, Prestasi, Tahfidz Al-Qur'an, Afirmasi/Zonasi).
   - Agenda & Jadwal Tahapan Seleksi Terpadu 2027/2028.
   - Panduan 5 Langkah Alur Pendaftaran di Sistem Pusat.
   - Checklist Interaktif Persiapan Berkas Dokumen dengan indikator progress.
   - Layanan Posko Bantuan Offline di Sekolah & Helpdesk WhatsApp Panitia.
   - FAQ (Tanya Jawab Seputar PPDB).
7. **Tampilan Responsif**: Navigasi sticky, ukuran tap target ramah sentuhan (min 44px), dan optimal di desktop, tablet, maupun smartphone.

## File Pendukung Baru
- `assets/js/storage.js`: Engine penyimpanan persistent (`localStorage`) dan sinkronisasi event antar halaman.
- `assets/css/admin.css` & `assets/js/admin.js`: Style dan controller dashboard CMS.
- `pages/pengumuman.html` & `assets/js/pengumuman.js`: Halaman publik pengumuman sekolah dinamis.
