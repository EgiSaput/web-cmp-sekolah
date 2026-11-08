/**
 * StorageEngine - Central LocalStorage Repository for Sekolah Rahayu
 * Supports complete frontend mock persistence for the CMS & public pages.
 */
(() => {
  const STORAGE_KEYS = {
    NEWS: "sekolah_rahayu_news",
    ANNOUNCEMENTS: "sekolah_rahayu_announcements",
    PPDB: "sekolah_rahayu_ppdb",
    MESSAGES: "sekolah_rahayu_messages",
    AUTH: "rahayu_admin_auth"
  };

  const DEFAULT_SEED_DATA = {
    news: [
      {
        id: 1,
        title: "Membangun Semangat Belajar dan Kebersamaan di Lingkungan Madrasah",
        category: "Kegiatan",
        date: "05 November 2026",
        excerpt: "Lingkungan pendidikan yang positif menjadi bagian penting dalam membentuk peserta didik yang aktif, berkarakter, dan siap menghadapi masa depan.",
        content: "Lingkungan pendidikan yang positif menjadi bagian penting dalam membentuk peserta didik yang aktif, berkarakter, dan siap menghadapi masa depan. Madrasah bukan hanya tempat untuk memperoleh pengetahuan, tetapi juga ruang untuk membangun nilai, sikap, dan kebersamaan.\n\nMelalui kegiatan pembelajaran dan aktivitas sekolah, peserta didik didorong untuk saling bekerja sama, menghargai perbedaan, serta mengembangkan potensi yang dimiliki.\n\nSekolah Rahayu berkomitmen menghadirkan lingkungan pendidikan yang mendukung perkembangan akademik dan pembentukan karakter. Dengan dukungan pendidik dan seluruh warga madrasah, diharapkan peserta didik dapat tumbuh menjadi generasi yang berilmu dan berakhlak.",
        image: "images/hero-indonesia.jpg",
        author: "Humas Madrasah"
      },
      {
        id: 2,
        title: "Menciptakan Pembelajaran Kreatif dan Menyenangkan",
        category: "Akademik",
        date: "03 November 2026",
        excerpt: "Mendorong suasana belajar yang aktif melalui pendekatan pembelajaran yang kreatif, terarah, dan interaktif.",
        content: "Pembelajaran yang efektif tidak hanya berfokus pada penyampaian materi, tetapi juga bagaimana peserta didik dapat terlibat aktif dalam proses belajar.\n\nPendekatan kreatif dan interaktif dapat membantu peserta didik memahami materi, menyampaikan pendapat, serta mengembangkan kemampuan berpikir kritis.\n\nMelalui suasana belajar yang positif, madrasah berupaya mendorong peserta didik agar lebih percaya diri, mandiri, dan memiliki semangat untuk terus belajar.",
        image: "images/fasilitas-lab.jpg",
        author: "Tim Akademik"
      },
      {
        id: 3,
        title: "Mempererat Kebersamaan Melalui Kegiatan Madrasah",
        category: "Kegiatan",
        date: "30 Oktober 2026",
        excerpt: "Berbagai aktivitas bersama menjadi sarana membangun kepedulian, kerja sama, dan rasa kekeluargaan.",
        content: "Kebersamaan merupakan salah satu nilai penting dalam kehidupan madrasah. Hubungan yang baik antara peserta didik, guru, dan seluruh warga sekolah dapat menciptakan lingkungan yang nyaman dan mendukung.\n\nBerbagai aktivitas bersama dapat menjadi sarana untuk melatih kerja sama, tanggung jawab, kepedulian, dan rasa saling menghargai.\n\nNilai-nilai tersebut diharapkan dapat diterapkan tidak hanya di lingkungan sekolah, tetapi juga dalam kehidupan sehari-hari.",
        image: "images/kegiatan-pramuka.jpg",
        author: "Kesiswaan"
      },
      {
        id: 4,
        title: "Mengapresiasi Semangat dan Potensi Peserta Didik",
        category: "Prestasi",
        date: "25 Oktober 2026",
        excerpt: "Apresiasi terhadap usaha dan pencapaian peserta didik dalam mengasah bakat dan kemampuan terbaiknya.",
        content: "Setiap peserta didik memiliki potensi dan kemampuan yang dapat dikembangkan melalui proses belajar, latihan, serta pengalaman.\n\nApresiasi terhadap usaha dan pencapaian peserta didik merupakan salah satu bentuk dukungan untuk membangun motivasi dan kepercayaan diri.\n\nMadrasah terus mendorong peserta didik untuk berani mencoba, mengembangkan kemampuan, dan memberikan kontribusi positif sesuai minat masing-masing.",
        image: "images/kegiatan-prestasi.jpg",
        author: "Humas & Prestasi"
      },
      {
        id: 5,
        title: "Informasi Agenda Kegiatan Madrasah",
        category: "Pengumuman",
        date: "20 Oktober 2026",
        excerpt: "Rangkuman agenda akademik dan non-akademik madrasah menyambut pertengahan semester.",
        content: "Informasi agenda kegiatan menjadi salah satu hal penting bagi seluruh warga madrasah agar setiap aktivitas dapat dipersiapkan dengan baik.\n\nPeserta didik dan orang tua diharapkan memperhatikan informasi resmi yang disampaikan oleh pihak madrasah melalui saluran komunikasi yang tersedia.\n\nUntuk memperoleh informasi lebih lanjut mengenai agenda dan kegiatan, silakan menghubungi pihak Sekolah Rahayu melalui halaman kontak.",
        image: "images/gedung-madrasah.jpg",
        author: "Tata Usaha"
      },
      {
        id: 6,
        title: "Menumbuhkan Budaya Literasi di Lingkungan Sekolah",
        category: "Akademik",
        date: "15 Oktober 2026",
        excerpt: "Literasi memiliki peran penting dalam memperluas wawasan dan meningkatkan kemampuan berpikir kritis peserta didik.",
        content: "Literasi memiliki peran penting dalam memperluas wawasan dan meningkatkan kemampuan berpikir peserta didik.\n\nKebiasaan membaca, memahami informasi, dan menyampaikan gagasan dapat membantu peserta didik menjadi pembelajar yang lebih mandiri.\n\nBudaya literasi perlu dibangun melalui dukungan lingkungan sekolah, keluarga, dan kebiasaan positif yang dilakukan secara konsisten.",
        image: "images/fasilitas-perpus.jpg",
        author: "Perpustakaan Madrasah"
      }
    ],

    announcements: [
      {
        id: 1,
        title: "Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2027/2028 Telah Dibuka",
        documentNumber: "045/RAHAYU/PPDB/X/2026",
        date: "2026-10-25",
        priority: "Penting",
        category: "PPDB",
        excerpt: "Informasi resmi mengenai jalur penerimaan, jadwal seleksi, dan persyaratan berkas calon peserta didik baru.",
        content: "Diberitahukan kepada seluruh calon wali murid bahwa pendaftaran PPDB Sekolah Rahayu tahun ajaran 2027/2028 telah dibuka secara daring melalui laman resmi madrasah atau langsung ke sekretariat panitia pada hari kerja (08.00 - 14.00 WIB)."
      },
      {
        id: 2,
        title: "Jadwal Asesmen Sumatif Akhir Semester Ganjil Tahun Ajaran 2026/2027",
        documentNumber: "048/RAHAYU/AKAD/XI/2026",
        date: "2026-11-01",
        priority: "Penting",
        category: "Akademik",
        excerpt: "Pelaksanaan Asesmen Sumatif Akhir Semester akan berlangsung mulai 28 November hingga 09 Desember 2026.",
        content: "Seluruh peserta didik kelas X, XI, dan XII diharapkan mempersiapkan diri sebaik mungkin dan menyelesaikan seluruh tugas terstruktur sebelum tanggal pelaksanaan asesmen."
      },
      {
        id: 3,
        title: "Edaran Pelaksanaan Upacara Peringatan Hari Guru Nasional",
        documentNumber: "052/RAHAYU/KESIS/XI/2026",
        date: "2026-11-05",
        priority: "Biasa",
        category: "Kegiatan",
        excerpt: "Pemberitahuan pakaian seragam dan tata tertib upacara peringatan Hari Guru Nasional di lapangan utama madrasah.",
        content: "Upacara akan diselenggarakan pada hari Senin pukul 07.00 WIB. Siswa mengenakan seragam madrasah lengkap berpeci/berkerudung putih. Dilanjutkan dengan unjuk apresiasi santri untuk bapak/ibu guru."
      },
      {
        id: 4,
        title: "Sosialisasi Program Bimbingan Masuk Perguruan Tinggi Negeri (PTN) & Beasiswa Timur Tengah",
        documentNumber: "039/RAHAYU/BK/IX/2026",
        date: "2026-09-20",
        priority: "Biasa",
        category: "Akademik",
        excerpt: "Khusus wali murid kelas XII mengenai program peminatan SNBP, UTBK-SNBT, dan seleksi Universitas Al-Azhar Kairo.",
        content: "Madrasah mengundang bapak/ibu wali murid kelas XII untuk hadir pada pertemuan virtual dan tatap muka guna menyelaraskan rencana studi lanjut putra-putri madrasah."
      }
    ],

    ppdb: [
      {
        id: 1,
        studentName: "Muhammad Farhan Pratama",
        nisn: "0087654321",
        schoolOrigin: "MTs Negeri 1 Kota",
        parentName: "Budi Pratama",
        parentPhone: "081234567891",
        programChoice: "IPA / Riset & Sains",
        submittedAt: "2026-11-02 10:15",
        status: "Terverifikasi"
      },
      {
        id: 2,
        studentName: "Aisyah Zahira Putri",
        nisn: "0091234567",
        schoolOrigin: "SMP Islam Terpadu Al-Falah",
        parentName: "Hendra Wijaya",
        parentPhone: "085678901234",
        programChoice: "Keagamaan & Tahfidz",
        submittedAt: "2026-11-04 14:30",
        status: "Menunggu Verifikasi"
      },
      {
        id: 3,
        studentName: "Zaidan Al-Ghifari",
        nisn: "0089988776",
        schoolOrigin: "MTs Swasta Darul Hikmah",
        parentName: "Ahmad Subagio",
        parentPhone: "081398765432",
        programChoice: "IPS / Bahasa & Diplomasi",
        submittedAt: "2026-11-06 09:00",
        status: "Diterima"
      }
    ],

    messages: [
      {
        id: 1,
        name: "Ibu Rahmawati",
        email: "rahmawati.parent@gmail.com",
        phone: "081299887766",
        subject: "Pertanyaan Asrama / Pondok Pesantren",
        message: "Assalamu'alaikum, apakah untuk siswa luar kota diwajibkan tinggal di asrama madrasah? Mohon info biaya asramanya.",
        submittedAt: "2026-11-03 11:20"
      },
      {
        id: 2,
        name: "Bapak Surya Darmawan",
        email: "surya.d@yahoo.com",
        phone: "085712344321",
        subject: "Konsultasi Beasiswa Prestasi Tahfidz",
        message: "Anak saya memiliki hafalan 10 juz dari MTs asal, apakah ada program beasiswa prestasi potongan SPP di Sekolah Rahayu?",
        submittedAt: "2026-11-05 16:45"
      }
    ]
  };

  function readFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data);
    } catch (e) {
      console.warn("StorageEngine read error:", e);
      return fallback;
    }
  }

  function writeToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("schoolDataUpdated", { detail: { key } }));
    } catch (e) {
      console.error("StorageEngine write error:", e);
    }
  }

  // Seed default data if storage is empty
  function initDefaults() {
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
      writeToStorage(STORAGE_KEYS.NEWS, DEFAULT_SEED_DATA.news);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
      writeToStorage(STORAGE_KEYS.ANNOUNCEMENTS, DEFAULT_SEED_DATA.announcements);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PPDB)) {
      writeToStorage(STORAGE_KEYS.PPDB, DEFAULT_SEED_DATA.ppdb);
    }
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
      writeToStorage(STORAGE_KEYS.MESSAGES, DEFAULT_SEED_DATA.messages);
    }
  }

  initDefaults();

  window.StorageEngine = {
    // --- NEWS ---
    getNews() {
      return readFromStorage(STORAGE_KEYS.NEWS, DEFAULT_SEED_DATA.news);
    },
    getNewsById(id) {
      return this.getNews().find(item => Number(item.id) === Number(id)) || null;
    },
    saveNews(item) {
      const news = this.getNews();
      if (item.id) {
        const index = news.findIndex(n => Number(n.id) === Number(item.id));
        if (index !== -1) {
          news[index] = { ...news[index], ...item };
        } else {
          news.unshift(item);
        }
      } else {
        const newId = news.length > 0 ? Math.max(...news.map(n => Number(n.id) || 0)) + 1 : 1;
        news.unshift({
          id: newId,
          date: new Date().toISOString().split("T")[0],
          author: "Admin Madrasah",
          ...item
        });
      }
      writeToStorage(STORAGE_KEYS.NEWS, news);
      return news;
    },
    deleteNews(id) {
      const news = this.getNews().filter(n => Number(n.id) !== Number(id));
      writeToStorage(STORAGE_KEYS.NEWS, news);
      return news;
    },

    // --- ANNOUNCEMENTS ---
    getAnnouncements() {
      return readFromStorage(STORAGE_KEYS.ANNOUNCEMENTS, DEFAULT_SEED_DATA.announcements);
    },
    getAnnouncementById(id) {
      return this.getAnnouncements().find(item => Number(item.id) === Number(id)) || null;
    },
    saveAnnouncement(item) {
      const list = this.getAnnouncements();
      if (item.id) {
        const index = list.findIndex(a => Number(a.id) === Number(item.id));
        if (index !== -1) {
          list[index] = { ...list[index], ...item };
        } else {
          list.unshift(item);
        }
      } else {
        const newId = list.length > 0 ? Math.max(...list.map(a => Number(a.id) || 0)) + 1 : 1;
        list.unshift({
          id: newId,
          date: new Date().toISOString().split("T")[0],
          ...item
        });
      }
      writeToStorage(STORAGE_KEYS.ANNOUNCEMENTS, list);
      return list;
    },
    deleteAnnouncement(id) {
      const list = this.getAnnouncements().filter(a => Number(a.id) !== Number(id));
      writeToStorage(STORAGE_KEYS.ANNOUNCEMENTS, list);
      return list;
    },

    // --- PPDB SUBMISSIONS ---
    getPPDB() {
      return readFromStorage(STORAGE_KEYS.PPDB, DEFAULT_SEED_DATA.ppdb);
    },
    addPPDB(submission) {
      const list = this.getPPDB();
      const newId = list.length > 0 ? Math.max(...list.map(p => Number(p.id) || 0)) + 1 : 1;
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0] + " " + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
      const record = {
        id: newId,
        submittedAt: dateStr,
        status: "Menunggu Verifikasi",
        ...submission
      };
      list.unshift(record);
      writeToStorage(STORAGE_KEYS.PPDB, list);
      return record;
    },
    updatePPDBStatus(id, newStatus) {
      const list = this.getPPDB();
      const index = list.findIndex(p => Number(p.id) === Number(id));
      if (index !== -1) {
        list[index].status = newStatus;
        writeToStorage(STORAGE_KEYS.PPDB, list);
      }
      return list;
    },
    deletePPDB(id) {
      const list = this.getPPDB().filter(p => Number(p.id) !== Number(id));
      writeToStorage(STORAGE_KEYS.PPDB, list);
      return list;
    },

    // --- CONTACT MESSAGES ---
    getMessages() {
      return readFromStorage(STORAGE_KEYS.MESSAGES, DEFAULT_SEED_DATA.messages);
    },
    addMessage(msg) {
      const list = this.getMessages();
      const newId = list.length > 0 ? Math.max(...list.map(m => Number(m.id) || 0)) + 1 : 1;
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0] + " " + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
      const record = {
        id: newId,
        submittedAt: dateStr,
        ...msg
      };
      list.unshift(record);
      writeToStorage(STORAGE_KEYS.MESSAGES, list);
      return record;
    },
    deleteMessage(id) {
      const list = this.getMessages().filter(m => Number(m.id) !== Number(id));
      writeToStorage(STORAGE_KEYS.MESSAGES, list);
      return list;
    },

    // --- AUTHENTICATION MOCK ---
    isLoggedIn() {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === "true";
    },
    login(username, password) {
      // Demo credentials
      if (
        (username === "admin@sekolahrahayu.sch.id" || username === "admin") &&
        password === "admin123"
      ) {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, "true");
        return { success: true };
      }
      return { success: false, message: "Email atau kata sandi salah. Gunakan admin@sekolahrahayu.sch.id dan password admin123." };
    },
    logout() {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    },

    // --- RESET ---
    resetToDefaults() {
      writeToStorage(STORAGE_KEYS.NEWS, DEFAULT_SEED_DATA.news);
      writeToStorage(STORAGE_KEYS.ANNOUNCEMENTS, DEFAULT_SEED_DATA.announcements);
      writeToStorage(STORAGE_KEYS.PPDB, DEFAULT_SEED_DATA.ppdb);
      writeToStorage(STORAGE_KEYS.MESSAGES, DEFAULT_SEED_DATA.messages);
      return true;
    }
  };

  // Keep window.SCHOOL_DATA in sync for backward compatibility
  window.SCHOOL_DATA = window.SCHOOL_DATA || {};
  window.SCHOOL_DATA.news = window.StorageEngine.getNews();
  window.addEventListener("schoolDataUpdated", () => {
    window.SCHOOL_DATA.news = window.StorageEngine.getNews();
  });
})();
