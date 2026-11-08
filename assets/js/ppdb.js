document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG || {};
  const phone = cfg.whatsappNumber || "6281200000000";
  const deadline = new Date(cfg.admissionDate || "2027-06-01T00:00:00+07:00");
  const centralUrl = cfg.centralPpdbUrl || "https://ppdb.kemenag.go.id";
  const $ = id => document.getElementById(id);

  // 1. Countdown timer
  function countdown() {
    const distance = deadline.getTime() - Date.now();
    const values = distance > 0 ? [
      Math.floor(distance / 86400000),
      Math.floor(distance / 3600000) % 24,
      Math.floor(distance / 60000) % 60,
      Math.floor(distance / 1000) % 60
    ] : [0, 0, 0, 0];

    ["countdownDays", "countdownHours", "countdownMinutes", "countdownSeconds"].forEach((id, i) => {
      if ($(id)) $(id).textContent = String(values[i]).padStart(2, "0");
    });

    const heading = document.querySelector(".countdown-heading strong");
    if (heading && distance <= 0) {
      heading.textContent = "Periode pembukaan pendaftaran telah dibuka di sistem pusat";
    }
  }
  countdown();
  setInterval(countdown, 1000);

  // 2. Interactive Document Checklist Progress
  const checks = [...document.querySelectorAll(".requirement-item input")];
  function updateProgress() {
    const done = checks.filter(input => input.checked).length;
    if ($("requirementProgressText")) {
      $("requirementProgressText").textContent = `${done} / ${checks.length}`;
    }
    if ($("requirementProgressBar")) {
      $("requirementProgressBar").style.width = `${checks.length ? (done / checks.length * 100) : 0}%`;
    }
  }
  checks.forEach(input => input.addEventListener("change", updateProgress));
  updateProgress();

  // 3. Central PPDB Portal Links
  document.querySelectorAll("[data-central-portal]").forEach(btn => {
    btn.setAttribute("href", centralUrl);
  });

  // 4. Helpdesk Consultation Links
  document.querySelectorAll("[data-ppdb-helpdesk]").forEach(btn => {
    if (/^\d{10,15}$/.test(phone)) {
      btn.setAttribute(
        "href",
        `https://wa.me/${phone}?text=${encodeURIComponent(
          "Assalamu'alaikum, saya ingin bertanya dan berkonsultasi mengenai informasi PPDB terpusat Sekolah Rahayu."
        )}`
      );
    }
  });

  // 5. FAQ Accordion Interaction
  document.querySelectorAll(".ppdb-faq-item").forEach(item => {
    const btn = item.querySelector(".faq-question");
    if (btn) {
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".ppdb-faq-item").forEach(i => i.classList.remove("is-open"));
        if (!isOpen) {
          item.classList.add("is-open");
        }
      });
    }
  });
});
