/**
 * Admin CMS Controller - Sekolah Rahayu
 * Full interactive frontend mockup powered by StorageEngine (localStorage)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Authentication Check
  if (!window.StorageEngine || !window.StorageEngine.isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  // 2. Element Selectors
  const navItems = document.querySelectorAll(".admin-nav-item[data-tab]");
  const tabPanes = document.querySelectorAll(".admin-tab-pane");
  const topbarTitle = document.getElementById("topbarTitle");
  const logoutBtn = document.getElementById("logoutBtn");
  const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
  const sidebar = document.getElementById("adminSidebar");
  const toast = document.getElementById("adminToast");

  // Tab Titles mapping
  const TAB_TITLES = {
    dashboard: { title: "Dashboard Utama", desc: "Ringkasan statistik konten dan aktivitas madrasah" },
    news: { title: "Kelola Berita & Artikel", desc: "Publikasi berita, prestasi, dan kegiatan madrasah" },
    announcements: { title: "Kelola Pengumuman", desc: "Media publikasi pengumuman dan informasi resmi" },
    ppdb: { title: "Data Pendaftar PPDB", desc: "Daftar formulir pendaftaran calon peserta didik baru" },
    messages: { title: "Pesan Masuk Kontak", desc: "Pesan dan pertanyaan dari formulir kontak website" },
    settings: { title: "Pengaturan Demo CMS", desc: "Kelola data dummy dan reset penyimpanan browser" }
  };

  // Toast Helper
  window.showToast = function(msg) {
    if (!toast) return;
    const textEl = toast.querySelector(".toast-text") || toast;
    textEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  };

  // 3. Tab Navigation
  function switchTab(tabId) {
    navItems.forEach(item => {
      item.classList.toggle("active", item.dataset.tab === tabId);
    });

    tabPanes.forEach(pane => {
      pane.classList.toggle("active", pane.id === `pane-${tabId}`);
    });

    if (topbarTitle && TAB_TITLES[tabId]) {
      topbarTitle.querySelector("h2").textContent = TAB_TITLES[tabId].title;
      topbarTitle.querySelector("p").textContent = TAB_TITLES[tabId].desc;
    }

    // Close mobile sidebar if open
    if (sidebar) sidebar.classList.remove("open");

    // Refresh data for active tab
    renderCurrentTab(tabId);
  }

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab(item.dataset.tab);
    });
  });

  // Mobile sidebar toggle
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin keluar dari CMS?")) {
        window.StorageEngine.logout();
        window.location.href = "login.html";
      }
    });
  }

  // 4. Data Rendering Functions
  function renderDashboard() {
    const news = window.StorageEngine.getNews();
    const announcements = window.StorageEngine.getAnnouncements();
    const ppdb = window.StorageEngine.getPPDB();
    const messages = window.StorageEngine.getMessages();

    document.getElementById("metricNewsCount").textContent = news.length;
    document.getElementById("metricAnnouncementCount").textContent = announcements.length;
    document.getElementById("metricPPDBCount").textContent = ppdb.length;
    document.getElementById("metricMessageCount").textContent = messages.length;

    // Recent activity table (mix of latest entries)
    const recentTableBody = document.getElementById("recentActivityTableBody");
    if (recentTableBody) {
      const activities = [
        ...news.slice(0, 3).map(n => ({ type: "Berita", title: n.title, date: n.date, badge: "badge-info" })),
        ...announcements.slice(0, 2).map(a => ({ type: "Pengumuman", title: a.title, date: a.date, badge: "badge-warning" })),
        ...ppdb.slice(0, 2).map(p => ({ type: "PPDB", title: `Pendaftar baru: ${p.studentName}`, date: p.submittedAt, badge: "badge-success" }))
      ];

      recentTableBody.innerHTML = activities.map(act => `
        <tr>
          <td><span class="badge ${act.badge}">${act.type}</span></td>
          <td><strong>${act.title}</strong></td>
          <td>${act.date}</td>
        </tr>
      `).join("");
    }
  }

  // --- NEWS CRUD ---
  function renderNewsTable(keyword = "") {
    const tbody = document.getElementById("newsTableBody");
    if (!tbody) return;

    let news = window.StorageEngine.getNews();
    if (keyword) {
      news = news.filter(n => n.title.toLowerCase().includes(keyword.toLowerCase()) || n.category.toLowerCase().includes(keyword.toLowerCase()));
    }

    if (news.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--admin-text-muted);">Tidak ada berita ditemukan.</td></tr>`;
      return;
    }

    tbody.innerHTML = news.map(item => `
      <tr>
        <td style="width: 70px;">
          <img src="${item.image}" alt="" style="width: 54px; height: 38px; object-fit: cover; border-radius: 6px;">
        </td>
        <td>
          <strong>${item.title}</strong>
          <small style="display: block; color: var(--admin-text-muted);">${item.excerpt ? item.excerpt.substring(0, 70) + '...' : ''}</small>
        </td>
        <td><span class="badge badge-info">${item.category}</span></td>
        <td>${item.date}</td>
        <td style="width: 100px;">
          <div class="btn-action-group">
            <button class="btn-icon edit-news-btn" data-id="${item.id}" title="Edit Berita"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn-icon delete delete-news-btn" data-id="${item.id}" title="Hapus Berita"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      </tr>
    `).join("");

    // Attach event listeners
    tbody.querySelectorAll(".edit-news-btn").forEach(b => {
      b.addEventListener("click", () => openNewsModal(b.dataset.id));
    });
    tbody.querySelectorAll(".delete-news-btn").forEach(b => {
      b.addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
          window.StorageEngine.deleteNews(b.dataset.id);
          renderNewsTable();
          renderDashboard();
          showToast("Berita berhasil dihapus.");
        }
      });
    });
  }

  // --- ANNOUNCEMENTS CRUD ---
  function renderAnnouncementsTable(keyword = "") {
    const tbody = document.getElementById("announcementTableBody");
    if (!tbody) return;

    let announcements = window.StorageEngine.getAnnouncements();
    if (keyword) {
      announcements = announcements.filter(a => a.title.toLowerCase().includes(keyword.toLowerCase()) || (a.documentNumber && a.documentNumber.toLowerCase().includes(keyword.toLowerCase())));
    }

    if (announcements.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--admin-text-muted);">Tidak ada pengumuman ditemukan.</td></tr>`;
      return;
    }

    tbody.innerHTML = announcements.map(item => `
      <tr>
        <td><code>${item.documentNumber || '-'}</code></td>
        <td>
          <strong>${item.title}</strong>
          <small style="display: block; color: var(--admin-text-muted);">${item.excerpt ? item.excerpt.substring(0, 80) + '...' : ''}</small>
        </td>
        <td>
          <span class="badge ${item.priority === 'Penting' ? 'badge-danger' : 'badge-warning'}">${item.priority}</span>
        </td>
        <td>${item.date}</td>
        <td style="width: 100px;">
          <div class="btn-action-group">
            <button class="btn-icon edit-announcement-btn" data-id="${item.id}" title="Edit Pengumuman"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn-icon delete delete-announcement-btn" data-id="${item.id}" title="Hapus Pengumuman"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll(".edit-announcement-btn").forEach(b => {
      b.addEventListener("click", () => openAnnouncementModal(b.dataset.id));
    });
    tbody.querySelectorAll(".delete-announcement-btn").forEach(b => {
      b.addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
          window.StorageEngine.deleteAnnouncement(b.dataset.id);
          renderAnnouncementsTable();
          renderDashboard();
          showToast("Pengumuman berhasil dihapus.");
        }
      });
    });
  }

  // --- PPDB TABLE ---
  function renderPPDBTable() {
    const tbody = document.getElementById("ppdbTableBody");
    if (!tbody) return;

    const list = window.StorageEngine.getPPDB();
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 30px; color: var(--admin-text-muted);">Belum ada formulir pendaftar masuk.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(item => {
      let badgeClass = "badge-warning";
      if (item.status === "Terverifikasi") badgeClass = "badge-info";
      if (item.status === "Diterima") badgeClass = "badge-success";

      return `
        <tr>
          <td><strong>${item.studentName}</strong><small style="display: block; color: var(--admin-text-muted);">NISN: ${item.nisn}</small></td>
          <td>${item.schoolOrigin || '-'}</td>
          <td>${item.programChoice || 'Reguler'}</td>
          <td><a href="https://wa.me/${item.parentPhone}" target="_blank" style="color: var(--admin-navy-primary); font-weight: 700; text-decoration: none;"><i class="fa-brands fa-whatsapp" style="color: #10b981;"></i> ${item.parentPhone}</a></td>
          <td><span class="badge ${badgeClass}">${item.status}</span></td>
          <td style="width: 140px;">
            <select class="ppdb-status-select" data-id="${item.id}" style="padding: 4px 8px; border-radius: 6px; font-size: 11px; border: 1px solid var(--admin-border);">
              <option value="Menunggu Verifikasi" ${item.status === 'Menunggu Verifikasi' ? 'selected' : ''}>Menunggu</option>
              <option value="Terverifikasi" ${item.status === 'Terverifikasi' ? 'selected' : ''}>Terverifikasi</option>
              <option value="Diterima" ${item.status === 'Diterima' ? 'selected' : ''}>Diterima</option>
            </select>
          </td>
        </tr>
      `;
    }).join("");

    tbody.querySelectorAll(".ppdb-status-select").forEach(sel => {
      sel.addEventListener("change", (e) => {
        window.StorageEngine.updatePPDBStatus(sel.dataset.id, e.target.value);
        showToast(`Status pendaftar diperbarui menjadi "${e.target.value}".`);
        renderPPDBTable();
      });
    });
  }

  // --- CONTACT MESSAGES TABLE ---
  function renderMessagesTable() {
    const tbody = document.getElementById("messagesTableBody");
    if (!tbody) return;

    const list = window.StorageEngine.getMessages();
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--admin-text-muted);">Belum ada pesan masuk.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(item => `
      <tr>
        <td><strong>${item.name}</strong><small style="display: block; color: var(--admin-text-muted);">${item.email}</small></td>
        <td><code>${item.phone || '-'}</code></td>
        <td>
          <strong>${item.subject || 'Pesan Umum'}</strong>
          <p style="margin: 4px 0 0; font-size: 12px; color: var(--admin-text-muted);">${item.message}</p>
        </td>
        <td>${item.submittedAt}</td>
        <td>
          <button class="btn-icon delete delete-msg-btn" data-id="${item.id}" title="Hapus Pesan"><i class="fa-regular fa-trash-can"></i></button>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll(".delete-msg-btn").forEach(b => {
      b.addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
          window.StorageEngine.deleteMessage(b.dataset.id);
          renderMessagesTable();
          renderDashboard();
          showToast("Pesan berhasil dihapus.");
        }
      });
    });
  }

  function renderCurrentTab(tabId) {
    if (tabId === "dashboard") renderDashboard();
    if (tabId === "news") renderNewsTable();
    if (tabId === "announcements") renderAnnouncementsTable();
    if (tabId === "ppdb") renderPPDBTable();
    if (tabId === "messages") renderMessagesTable();
  }

  // --- MODAL CONTROLLERS ---
  const newsModal = document.getElementById("newsModal");
  const newsForm = document.getElementById("newsForm");
  const announcementModal = document.getElementById("announcementModal");
  const announcementForm = document.getElementById("announcementForm");

  // Open News Modal (New or Edit)
  window.openNewsModal = function(id = null) {
    if (!newsModal) return;
    newsForm.reset();
    document.getElementById("newsId").value = "";

    if (id) {
      const item = window.StorageEngine.getNewsById(id);
      if (item) {
        document.getElementById("newsModalTitle").textContent = "Edit Berita / Artikel";
        document.getElementById("newsId").value = item.id;
        document.getElementById("newsTitle").value = item.title;
        document.getElementById("newsCategory").value = item.category;
        document.getElementById("newsDate").value = item.date;
        document.getElementById("newsImage").value = item.image;
        document.getElementById("newsExcerpt").value = item.excerpt || "";
        document.getElementById("newsContent").value = item.content || "";
      }
    } else {
      document.getElementById("newsModalTitle").textContent = "Tambah Berita Baru";
      document.getElementById("newsDate").value = new Date().toISOString().split("T")[0];
      document.getElementById("newsImage").value = "../images/gedung-madrasah.jpg";
    }

    newsModal.classList.add("is-open");
  };

  // Open Announcement Modal (New or Edit)
  window.openAnnouncementModal = function(id = null) {
    if (!announcementModal) return;
    announcementForm.reset();
    document.getElementById("announcementId").value = "";

    if (id) {
      const item = window.StorageEngine.getAnnouncementById(id);
      if (item) {
        document.getElementById("announcementModalTitle").textContent = "Edit Pengumuman";
        document.getElementById("announcementId").value = item.id;
        document.getElementById("announcementNumber").value = item.documentNumber || "";
        document.getElementById("announcementTitle").value = item.title;
        document.getElementById("announcementPriority").value = item.priority;
        document.getElementById("announcementDate").value = item.date;
        document.getElementById("announcementExcerpt").value = item.excerpt || "";
        document.getElementById("announcementContent").value = item.content || "";
      }
    } else {
      document.getElementById("announcementModalTitle").textContent = "Tambah Pengumuman Baru";
      document.getElementById("announcementDate").value = new Date().toISOString().split("T")[0];
      document.getElementById("announcementNumber").value = `0${Math.floor(Math.random() * 50) + 50}/RAHAYU/PENG/${new Date().getFullYear()}`;
    }

    announcementModal.classList.add("is-open");
  };

  // Close modals
  document.querySelectorAll(".close-modal-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-modal-backdrop").forEach(m => m.classList.remove("is-open"));
    });
  });

  // Save News
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("newsId").value;
      const data = {
        title: document.getElementById("newsTitle").value.trim(),
        category: document.getElementById("newsCategory").value,
        date: document.getElementById("newsDate").value,
        image: document.getElementById("newsImage").value.trim() || "../images/gedung-madrasah.jpg",
        excerpt: document.getElementById("newsExcerpt").value.trim(),
        content: document.getElementById("newsContent").value.trim()
      };
      if (id) data.id = Number(id);

      window.StorageEngine.saveNews(data);
      newsModal.classList.remove("is-open");
      renderNewsTable();
      renderDashboard();
      showToast(id ? "Berita berhasil diperbarui." : "Berita baru berhasil diterbitkan!");
    });
  }

  // Save Announcement
  if (announcementForm) {
    announcementForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("announcementId").value;
      const data = {
        documentNumber: document.getElementById("announcementNumber").value.trim(),
        title: document.getElementById("announcementTitle").value.trim(),
        priority: document.getElementById("announcementPriority").value,
        date: document.getElementById("announcementDate").value,
        excerpt: document.getElementById("announcementExcerpt").value.trim(),
        content: document.getElementById("announcementContent").value.trim()
      };
      if (id) data.id = Number(id);

      window.StorageEngine.saveAnnouncement(data);
      announcementModal.classList.remove("is-open");
      renderAnnouncementsTable();
      renderDashboard();
      showToast(id ? "Pengumuman berhasil diperbarui." : "Pengumuman resmi berhasil diterbitkan!");
    });
  }

  // Quick Action Buttons
  document.getElementById("btnQuickAddNews")?.addEventListener("click", () => {
    switchTab("news");
    openNewsModal();
  });
  document.getElementById("btnQuickAddAnnouncement")?.addEventListener("click", () => {
    switchTab("announcements");
    openAnnouncementModal();
  });
  document.getElementById("btnAddNewNews")?.addEventListener("click", () => openNewsModal());
  document.getElementById("btnAddNewAnnouncement")?.addEventListener("click", () => openAnnouncementModal());

  // Search listeners
  document.getElementById("searchNewsInput")?.addEventListener("input", (e) => {
    renderNewsTable(e.target.value);
  });
  document.getElementById("searchAnnouncementInput")?.addEventListener("input", (e) => {
    renderAnnouncementsTable(e.target.value);
  });

  // Reset to Defaults
  document.getElementById("btnResetDefaults")?.addEventListener("click", () => {
    if (confirm("Perhatian: Tindakan ini akan mengembalikan seluruh Berita, Pengumuman, dan Data PPDB ke data default pabrikan. Lanjutkan?")) {
      window.StorageEngine.resetToDefaults();
      showToast("Data demo berhasil di-reset ke pengaturan awal.");
      renderDashboard();
    }
  });

  // Initial load
  renderDashboard();
});
