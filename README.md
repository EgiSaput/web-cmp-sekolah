# Website Company Profile MA Az-Zahra — Tahap 1

Prototype frontend menggunakan HTML, CSS, dan JavaScript murni. Belum menggunakan backend maupun database.

## Cara menjalankan
1. Ekstrak folder project.
2. Buka folder `ma-azzahra` di Visual Studio Code.
3. Jalankan `index.html` menggunakan ekstensi Live Server.
4. Pastikan koneksi internet tersedia untuk Google Fonts, Font Awesome, dan gambar dummy Unsplash.

Alternatif: buka `index.html` langsung di browser. Live Server lebih disarankan.

## Isi Tahap 1
- Homepage awal.
- Navbar responsive dan mobile menu.
- Footer.
- Design system navy, putih, dan emas.
- Tema otomatis berdasarkan jam lokal perangkat pengunjung: Light Mode pukul 06.00–17.59 dan Dark Mode pukul 18.00–05.59.
- Tidak ada tombol penggantian tema manual; seluruh halaman menggunakan `assets/js/theme.js` dan `assets/css/theme-auto.css`.
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


## Pengaturan tema otomatis
- `assets/js/theme.js` membaca jam lokal perangkat pengunjung.
- Pukul 06.00 sampai sebelum 18.00 menggunakan Light Mode.
- Pukul 18.00 sampai sebelum 06.00 menggunakan Dark Mode.
- Tema diperiksa ulang setiap menit, serta saat tab/browser aktif kembali.
- Zona waktu mengikuti pengaturan waktu perangkat pengunjung.
