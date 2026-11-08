const TRANSLATIONS = {
  id: {
    "nav.home": "Beranda", "nav.profile": "Profil", "nav.academic": "Akademik",
    "nav.teachers": "Guru", "nav.news": "Berita", "nav.announcements": "Pengumuman", "nav.gallery": "Galeri",
    "nav.admission": "PPDB", "nav.contact": "Kontak",
    "hero.title": "Membangun Generasi<br><em>Berilmu & Berakhlak</em>",
    "hero.description": "Tempat tumbuhnya generasi unggul yang berwawasan luas, berkarakter Islami, dan siap menghadapi masa depan.",
    "hero.ctaPrimary": "Jelajahi Sekolah", "hero.ctaSecondary": "Informasi PPDB"
  },
  en: {
    "nav.home": "Home", "nav.profile": "About", "nav.academic": "Academics",
    "nav.teachers": "Teachers", "nav.news": "News", "nav.announcements": "Announcements", "nav.gallery": "Gallery",
    "nav.admission": "Admission", "nav.contact": "Contact",
    "hero.title": "Building a Generation<br><em>of Knowledge & Character</em>",
    "hero.description": "A place for outstanding generations to grow with broad knowledge, strong values, and readiness for the future.",
    "hero.ctaPrimary": "Explore Our School", "hero.ctaSecondary": "Admission Information"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("languageToggle");
  let current = localStorage.getItem("maaz-language") || window.SITE_CONFIG.defaultLanguage;

  function applyLanguage(language) {
    current = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (TRANSLATIONS[language][key]) element.innerHTML = TRANSLATIONS[language][key];
    });
    if (button) button.innerHTML = language.toUpperCase() === "ID" ? "ID <span>/</span> EN" : "EN <span>/</span> ID";
    localStorage.setItem("maaz-language", language);
  }

  button?.addEventListener("click", () => applyLanguage(current === "id" ? "en" : "id"));
  applyLanguage(current);
});
