document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("visible", window.scrollY > 450);
  });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  renderHomeNews();
  window.addEventListener("schoolDataUpdated", renderHomeNews);
  initReveal();
  initCounters();
});

function renderHomeNews() {
  const container = document.getElementById("homeNewsGrid");
  if (!container) return;

  try {
    const rawNews = (window.StorageEngine ? window.StorageEngine.getNews() : null) || window.SCHOOL_DATA?.news;
    const news = (rawNews || []).slice(0, 3);
    if (!news || !Array.isArray(news) || news.length === 0) {
      container.innerHTML = `
        <div class="news-empty" style="grid-column: 1 / -1; text-align: center; padding: 45px 20px; background: var(--color-bg-soft); border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
          <i class="fa-regular fa-newspaper" style="font-size: 32px; color: var(--color-muted); margin-bottom: 12px; display: inline-block;"></i>
          <h3 style="margin: 0 0 6px; font-size: 16px; color: var(--color-navy);">Belum Ada Berita Terbaru</h3>
          <p style="margin: 0; font-size: 13px; color: var(--color-muted);">Kabar dan artikel kegiatan madrasah akan ditampilkan di sini.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = news.map(item => {
      const dateFormatted = typeof SiteComponents !== 'undefined' && SiteComponents.formatDate ? SiteComponents.formatDate(item.date) : item.date;
      const excerpt = item.excerpt || (item.content ? item.content.slice(0, 110) + '...' : '');
      return `
      <article class="news-card reveal is-visible">
        <div class="news-card-image"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>
        <div class="news-card-body">
          <div class="news-meta"><span class="news-category">${item.category || 'Berita'}</span><span>${dateFormatted}</span></div>
          <h3>${item.title}</h3>
          <p>${excerpt}</p>
          <a class="text-link" href="pages/detail-berita.html?id=${item.id}">Baca selengkapnya <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </article>
      `;
    }).join("");
  } catch (error) {
    container.innerHTML = `
      <div class="news-error" style="grid-column: 1 / -1; text-align: center; padding: 30px 20px; color: var(--color-muted); font-size: 13px;">
        Gagal memuat berita terbaru. Silakan muat ulang halaman.
      </div>
    `;
  }
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!("IntersectionObserver" in window)) {
    counters.forEach(el => el.textContent = el.dataset.count);
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const start = performance.now();
      const duration = 1200;
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(target * progress).toLocaleString("id-ID") + "+";
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(el => observer.observe(el));
}
