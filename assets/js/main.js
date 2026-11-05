document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("visible", window.scrollY > 450);
  });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  renderHomeNews();
  initReveal();
  initCounters();
});

function renderHomeNews() {
  const container = document.getElementById("homeNewsGrid");
  if (!container || !window.SCHOOL_DATA) return;

  container.innerHTML = window.SCHOOL_DATA.news.map(item => `
    <article class="news-card reveal is-visible">
      <div class="news-card-image"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>
      <div class="news-card-body">
        <div class="news-meta"><span class="news-category">${item.category}</span><span>${SiteComponents.formatDate(item.date)}</span></div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <a class="text-link" href="pages/detail-berita.html?id=${item.id}">Baca selengkapnya <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </article>
  `).join("");
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
