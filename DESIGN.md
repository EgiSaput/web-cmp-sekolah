# Panduan Desain & Karakter Brand (DESIGN.md)

Dokumen ini mendefinisikan identitas visual, kepribadian, palet warna, tipografi, dan dial desain untuk website resmi **Sekolah Rahayu**.

---

## 1. Identitas & Kepribadian Brand

- **Institusi**: Sekolah Rahayu (Madrasah Aliyah)
- **Visi**: Membangun Generasi Berilmu dan Berakhlak Mulia
- **Karakter Visual**: 
  - **Berwibawa & Terpercaya**: Didominasi warna biru tua (*navy*) yang mencerminkan institusi pendidikan formal berintegritas.
  - **Hangat & Bernilai Islami**: Aksen emas lembut (*warm gold*) melambangkan kemuliaan akhlak, prestasi, dan mutu pendidikan.
  - **Bersih & Mudah Diakses**: Latar belakang putih dan abu-abu lembut (*soft slate*) memberikan keterbacaan tinggi bagi siswa, orang tua, dan masyarakat.

---

## 2. Palet Warna (Color System)

| Token | Nilai Hex | Peran & Alasan Penggunaan |
|---|---|---|
| `--color-navy` | `#12345a` | Warna brand utama, header, dan judul section. |
| `--color-navy-dark` | `#0b2340` | Warna navy dalam untuk teks tebal dan kontras tinggi. |
| `--color-navy-deep` | `#081a30` | Latar belakang hero banner dan footer madrasah. |
| `--color-gold` | `#d5ad62` | Aksen visual, ikon, garis dekoratif, dan highlight. |
| `--color-gold-dark` | `#98702e` | Aksen teks emas di atas latar putih (lolos rasio kontras WCAG AA 4.7:1). |
| `--color-bg` | `#ffffff` | Latar kartu konten dan bidang baca utama. |
| `--color-bg-soft` | `#f5f8fc` | Latar pemisah antar section agar ritme halaman berimbang. |
| `--color-text` | `#263548` | Warna teks utama (kontras tinggi dan tajam). |
| `--color-muted` | `#546477` | Warna teks sekunder/keterangan (lolos rasio kontras WCAG AA 6.0:1). |
| `--color-border` | `#e5ebf1` | Garis batas komponen tipis yang rapi. |

---

## 3. Tipografi

- **Font Utama**: `"Plus Jakarta Sans", sans-serif`
- **Alasan Pemilihan**: Font humanist sans-serif geometris kontemporer buatan desainer Indonesia yang sangat jelas dibaca di layar digital, ramah, dan profesional.
- **Hierarki & Tracking**:
  - Judul Utama (H1/H2): `letter-spacing: -1.2px` (halus dan proporsional, tanpa kompresi ekstrem).
  - Label Kicker (`.section-kicker`): `font-weight: 800; letter-spacing: 1px;` (terbaca jelas tanpa spasi huruf AI yang berlebihan).

---

## 4. Tiga Dial Antislop (Design Dials)

1. **ENERGY: 2 (Tenang & Edukatif)**
   - Tidak mencolok dengan efek neon atau gradasi mencolok.
   - Mengutamakan kenyamanan membaca informasi jadwal, kurikulum, dan pendaftaran.
2. **RHYTHM: 2 (Berimbang)**
   - Variasi antar seksi: kombinasi kartu ringkas berita, tata letak dua kolom (sambutan kepala madrasah), dan grid foto galeri.
   - Menghindari pengulangan pola 3 kartu identik secara terus-menerus.
3. **MOTION: 1 (Fungsional & Halus)**
   - Transisi cepat dan lembut (`0.25s - 0.45s`).
   - Wajib mematuhi preferensi sistem pengunjung (`prefers-reduced-motion: reduce`).

---

## 5. Standar Keahlian (Craftsmanship Standard)

- **Aksesibilitas Target Sentuh**: Seluruh tombol, kontrol dropdown, dan tombol mobile menu memiliki target sentuh minimal **44px × 44px**.
- **Kontrol Nyata**: Tidak ada tautan mati (`href="#"`) atau tombol hiasan semu.
- **Indikator Fokus**: Navigasi keyboard memiliki cincin fokus (*focus ring*) yang jelas dan menu mobile dapat ditutup dengan tombol `Escape`.
