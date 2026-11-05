document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("maaz-theme") || window.SITE_CONFIG.defaultTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);

  button?.addEventListener("click", () => {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("maaz-theme", nextTheme);
    updateIcon(nextTheme);
  });

  function updateIcon(theme) {
    if (!button) return;
    button.innerHTML = theme === "dark"
      ? '<i class="fa-regular fa-sun"></i>'
      : '<i class="fa-regular fa-moon"></i>';
    button.setAttribute("aria-label", theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap");
  }
});
