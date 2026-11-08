/**
 * Pengumuman Controller - Sekolah Rahayu
 * Renders dynamic announcements from StorageEngine
 */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("announcementsList");
  const searchInput = document.getElementById("announcementSearchInput");
  const filterBtns = document.querySelectorAll("#announcementFilters .gallery-filter");
  const emptyState = document.getElementById("announcementEmpty");
  const countEl = document.getElementById("announcementResultCount");

  // Modal elements
  const detailModal = document.getElementById("announcementModalDetail");
  const closeModalBtn = document.getElementById("closeDetailModalBtn");
  const closeActionBtn = document.getElementById("btnModalCloseAction");
  const modalBadge = document.getElementById("modalDetailBadge");
  const modalDocNum = document.getElementById("modalDetailDocNum");
  const modalTitle = document.getElementById("modalDetailTitle");
  const modalDate = document.getElementById("modalDetailDate");
  const modalContent = document.getElementById("modalDetailContent");

  let activeFilter = "all";

  function renderList() {
    if (!container || !window.StorageEngine) return;

    let items = window.StorageEngine.getAnnouncements();
    const keyword = (searchInput?.value || "").trim().toLowerCase();

    // Filter
    if (activeFilter !== "all") {
      items = items.filter(a => {
        if (activeFilter === "Penting") return a.priority === "Penting";
        return (a.category && a.category.toLowerCase() === activeFilter.toLowerCase());
      });
    }

    // Search
    if (keyword) {
      items = items.filter(a =>
        a.title.toLowerCase().includes(keyword) ||
        (a.documentNumber && a.documentNumber.toLowerCase().includes(keyword)) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(keyword))
      );
    }

    if (countEl) {
      countEl.textContent = `Menampilkan ${items.length} pengumuman resmi madrasah`;
    }

    if (items.length === 0) {
      container.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    container.innerHTML = items.map(item => `
      <article class="announcement-card-item">
        <div class="announcement-meta-row">
          <span class="${item.priority === 'Penting' ? 'badge-urgent' : 'badge-regular'}">
            <i class="fa-solid fa-bell"></i> ${item.priority}
          </span>
          <span class="announcement-doc-num">${item.documentNumber || 'Surat Edaran'}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.excerpt || ''}</p>
        <div class="announcement-footer-row">
          <span class="announcement-date-text">
            <i class="fa-regular fa-calendar"></i> ${item.date}
          </span>
          <button type="button" class="btn-read-announcement" data-id="${item.id}">
            Baca Selengkapnya <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </article>
    `).join("");

    // Attach click listener to detail buttons
    container.querySelectorAll(".btn-read-announcement").forEach(btn => {
      btn.addEventListener("click", () => openDetail(btn.dataset.id));
    });
  }

  function openDetail(id) {
    if (!detailModal || !window.StorageEngine) return;
    const item = window.StorageEngine.getAnnouncementById(id);
    if (!item) return;

    modalBadge.textContent = item.priority;
    modalBadge.className = item.priority === "Penting" ? "badge-urgent" : "badge-regular";
    modalDocNum.textContent = item.documentNumber ? `No. Surat: ${item.documentNumber}` : "Surat Pemberitahuan Resmi";
    modalTitle.textContent = item.title;
    modalDate.textContent = item.date;
    modalContent.innerHTML = `<p>${(item.content || item.excerpt).replace(/\n/g, '<br>')}</p>`;

    detailModal.style.display = "flex";
  }

  function closeDetail() {
    if (detailModal) detailModal.style.display = "none";
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeDetail);
  if (closeActionBtn) closeActionBtn.addEventListener("click", closeDetail);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailModal && detailModal.style.display === "flex") {
      closeDetail();
    }
  });

  // Filter clicks
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderList();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", renderList);
  }

  // Listen for storage changes from CMS
  window.addEventListener("schoolDataUpdated", () => {
    renderList();
  });

  // Initial render
  renderList();
});
