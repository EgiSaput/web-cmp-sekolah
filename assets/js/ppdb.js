document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG || {};
  const phone = cfg.whatsappNumber || "6281200000000";
  const deadline = new Date(cfg.admissionDate || "2027-06-01T00:00:00+07:00");
  const $ = id => document.getElementById(id);

  // Countdown
  function countdown() {
    const distance = deadline.getTime() - Date.now();
    const values = distance > 0 ? [
      Math.floor(distance / 86400000),
      Math.floor(distance / 3600000) % 24,
      Math.floor(distance / 60000) % 60,
      Math.floor(distance / 1000) % 60
    ] : [0,0,0,0];
    ["countdownDays","countdownHours","countdownMinutes","countdownSeconds"].forEach((id,i) => {
      if ($(id)) $(id).textContent = String(values[i]).padStart(2,"0");
    });
    const heading = document.querySelector(".countdown-heading strong");
    if (heading && distance <= 0) heading.textContent = "Periode pembukaan telah tiba";
  }
  countdown(); setInterval(countdown, 1000);

  // Checklist progress
  const checks = [...document.querySelectorAll(".requirement-item input")];
  function updateProgress() {
    const done = checks.filter(input => input.checked).length;
    if ($("requirementProgressText")) $("requirementProgressText").textContent = `${done} / ${checks.length}`;
    if ($("requirementProgressBar")) $("requirementProgressBar").style.width = `${checks.length ? done/checks.length*100 : 0}%`;
  }
  checks.forEach(input => input.addEventListener("change", updateProgress));
  updateProgress();

  const form = $("ppdbForm"), preview = $("ppdbPreview"), previewContent = $("ppdbPreviewContent");
  if (!form) return;
  let formData = null;
  const get = id => $(id)?.value.trim() || "";
  const dateText = value => value ? new Date(`${value}T00:00:00`).toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"}) : "-";

  function row(label,value) {
    const el = document.createElement("div"); el.className = "ppdb-preview-row";
    const a = document.createElement("span"); a.textContent = label;
    const b = document.createElement("strong"); b.textContent = value || "-";
    el.append(a,b); return el;
  }
  function renderPreview(data) {
    previewContent.replaceChildren();
    const groups = [
      ["Identitas Calon Siswa", [["Nama Lengkap",data.name],["NISN",data.nisn],["Jenis Kelamin",data.gender],["Tempat Lahir",data.birthPlace],["Tanggal Lahir",dateText(data.birthDate)],["Agama",data.religion],["Asal Sekolah",data.school],["Alamat",data.address]]],
      ["Orang Tua / Wali", [["Nama Orang Tua",data.parent],["Nomor WhatsApp",data.phone],["Email",data.email]]],
      ["Informasi Pendaftaran", [["Jalur",data.path],["Sumber Informasi",data.source],["Tahun Ajaran","2027/2028"]]]
    ];
    groups.forEach(([title,items]) => {
      const section = document.createElement("section"); section.className = "ppdb-preview-group";
      const h = document.createElement("h4"); h.textContent = title; section.append(h);
      items.forEach(([label,value]) => section.append(row(label,value)));
      previewContent.append(section);
    });
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    $("ppdbFormError").hidden = true;
    if (!form.reportValidity()) return;
    const rawPhone = get("parentPhone").replace(/[\s\-+()]/g,"");
    if (!/^0?8[0-9]{8,12}$/.test(rawPhone)) {
      $("ppdbFormError").textContent = "Nomor WhatsApp orang tua tidak valid. Contoh: 081234567890.";
      $("ppdbFormError").hidden = false; $("parentPhone").focus(); return;
    }
    if (get("studentNisn") && !/^\d{10}$/.test(get("studentNisn"))) {
      $("ppdbFormError").textContent = "NISN harus terdiri dari 10 angka.";
      $("ppdbFormError").hidden = false; $("studentNisn").focus(); return;
    }
    if (new Date(`${get("birthDate")}T00:00:00`) >= new Date()) {
      $("ppdbFormError").textContent = "Tanggal lahir harus lebih awal dari hari ini.";
      $("ppdbFormError").hidden = false; return;
    }
    formData = {
      name:get("studentName"), nisn:get("studentNisn") || "-", gender:get("studentGender"),
      birthPlace:get("birthPlace"), birthDate:get("birthDate"), religion:get("religion"),
      school:get("originSchool"), address:get("studentAddress"), parent:get("parentName"),
      phone:get("parentPhone"), email:get("parentEmail") || "-", path:get("registrationPath"),
      source:get("registrationSource") || "-"
    };
    renderPreview(formData); preview.hidden = false;
    preview.scrollIntoView({behavior:"smooth",block:"nearest"});
  });

  function hidePreview() { preview.hidden = true; formData = null; }
  $("editPpdbData")?.addEventListener("click", () => { hidePreview(); $("studentName").focus(); });
  $("closePreview")?.addEventListener("click", hidePreview);
  $("sendPpdbData")?.addEventListener("click", () => {
    if (!formData) return;
    if (!/^\d{10,15}$/.test(phone)) {
      $("ppdbFormError").textContent = "Nomor WhatsApp panitia belum benar. Periksa assets/js/config.js.";
      $("ppdbFormError").hidden = false; return;
    }
    const d = formData;
    const message = `Assalamu'alaikum, Panitia PPDB MA Az-Zahra.%0A%0ASaya ingin mendaftar Tahun Ajaran 2027/2028.%0A%0AIDENTITAS CALON SISWA%0ANama: ${encodeURIComponent(d.name)}%0ANISN: ${encodeURIComponent(d.nisn)}%0AJenis Kelamin: ${encodeURIComponent(d.gender)}%0ATempat/Tanggal Lahir: ${encodeURIComponent(d.birthPlace + ", " + dateText(d.birthDate))}%0AAgama: ${encodeURIComponent(d.religion)}%0AAsal Sekolah: ${encodeURIComponent(d.school)}%0AAlamat: ${encodeURIComponent(d.address)}%0A%0ADATA ORANG TUA/WALI%0ANama: ${encodeURIComponent(d.parent)}%0AWhatsApp: ${encodeURIComponent(d.phone)}%0AEmail: ${encodeURIComponent(d.email)}%0A%0AJalur: ${encodeURIComponent(d.path)}%0ASumber informasi: ${encodeURIComponent(d.source)}%0A%0AMohon informasi tahapan selanjutnya. Terima kasih.`;
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener");
  });

  const help = $("ppdbHelpLink");
  if (help && /^\d{10,15}$/.test(phone)) help.href = `https://wa.me/${phone}?text=${encodeURIComponent("Assalamu'alaikum, saya ingin bertanya tentang PPDB MA Az-Zahra.")}`;
});
