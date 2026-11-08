document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim() || "-";
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();
    const phone = window.SITE_CONFIG?.whatsappNumber || "6281200000000";
    if (!/^\d{10,15}$/.test(phone)) {
      document.getElementById("contactFeedback").textContent = "Nomor WhatsApp sekolah belum dikonfigurasi.";
      return;
    }
    if (window.StorageEngine) {
      window.StorageEngine.addMessage({
        name,
        email,
        phone: "-",
        subject,
        message
      });
    }
    const text = `Assalamu'alaikum Sekolah Rahayu.%0A%0ASaya ingin menghubungi pihak sekolah.%0A%0ANama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ATopik: ${encodeURIComponent(subject)}%0APesan: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener");
    document.getElementById("contactFeedback").textContent = "WhatsApp dibuka. Silakan periksa dan kirim pesan di aplikasi WhatsApp.";
  });
});
