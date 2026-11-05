
/* =========================================================
   MA AZ-ZAHRA
   PPDB PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPPDBCountdown();

    initRequirementChecklist();

    initPPDBForm();

    initPPDBFAQ();

    initPPDBWhatsApp();

    initPPDBYear();

});


/* =========================================================
   1. KONFIGURASI
========================================================= */

const PPDB_CONFIG = {

    whatsappNumber:
        window.SITE_CONFIG?.whatsappNumber || "6281200000000",

    admissionDate:
        window.SITE_CONFIG?.admissionDate || "2027-06-01T00:00:00+07:00"

};


/* =========================================================
   2. COUNTDOWN PENDAFTARAN
========================================================= */

function initPPDBCountdown() {

    const daysElement = document.getElementById("countdownDays");

    if (!daysElement) return;


    const deadline = new Date(PPDB_CONFIG.admissionDate);


    if (Number.isNaN(deadline.getTime())) {

        daysElement.textContent = "--";

        return;

    }


    const hoursElement = document.getElementById("countdownHours");

    const minutesElement = document.getElementById("countdownMinutes");

    const secondsElement = document.getElementById("countdownSeconds");


    function updateCountdown() {

        const now = Date.now();

        const distance = deadline.getTime() - now;


        if (distance <= 0) {

            daysElement.textContent = "00";

            hoursElement.textContent = "00";

            minutesElement.textContent = "00";

            secondsElement.textContent = "00";


            const heading = document.querySelector(".countdown-info h3");

            if (heading) {

                heading.textContent = "Periode Pendaftaran Telah Berakhir";

            }

            return;

        }


        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (distance / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (distance / 1000) % 60
        );


        daysElement.textContent = String(days).padStart(2, "0");

        hoursElement.textContent = String(hours).padStart(2, "0");

        minutesElement.textContent = String(minutes).padStart(2, "0");

        secondsElement.textContent = String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);

}


/* =========================================================
   3. CHECKLIST PERSYARATAN
========================================================= */

function initRequirementChecklist() {

    const checkboxes = document.querySelectorAll(
        ".requirement-item input[type='checkbox']"
    );

    const progressBar = document.getElementById(
        "requirementProgressBar"
    );

    const progressText = document.getElementById(
        "requirementProgressText"
    );


    if (!checkboxes.length) return;


    function updateProgress() {

        const total = checkboxes.length;

        const checked = [...checkboxes].filter(
            checkbox => checkbox.checked
        ).length;


        const percentage = (checked / total) * 100;


        if (progressBar) {

            progressBar.style.width = `${percentage}%`;

        }


        if (progressText) {

            progressText.textContent = `${checked} / ${total}`;

        }

    }


    checkboxes.forEach(checkbox => {

        checkbox.addEventListener("change", updateProgress);

    });


    updateProgress();

}


/* =========================================================
   4. FORM PENDAFTARAN
========================================================= */

function initPPDBForm() {

    const form = document.getElementById("ppdbForm");

    if (!form) return;


    const preview = document.getElementById("ppdbPreview");

    const previewContent = document.getElementById(
        "ppdbPreviewContent"
    );

    const errorBox = document.getElementById("ppdbFormError");

    const sendButton = document.getElementById("sendPpdbData");

    const editButton = document.getElementById("editPpdbData");

    const closeButton = document.getElementById("closePreview");


    let registrationData = null;


    // AMBIL NILAI FORM
    function getFormData() {

        return {

            studentName: getValue("studentName"),

            nisn: getValue("studentNisn") || "-",

            gender: getValue("studentGender"),

            birthPlace: getValue("birthPlace"),

            birthDate: getValue("birthDate"),

            religion: getValue("religion"),

            originSchool: getValue("originSchool"),

            address: getValue("studentAddress"),

            parentName: getValue("parentName"),

            parentPhone: getValue("parentPhone"),

            parentEmail: getValue("parentEmail") || "-",

            registrationPath: getValue("registrationPath"),

            source: getValue("registrationSource") || "-"

        };

    }


    function getValue(id) {

        return document.getElementById(id)?.value.trim() || "";

    }


    // VALIDASI NOMOR TELEPON
    function validatePhone(phone) {

        const cleaned = phone.replace(/[\s\-+()]/g, "");

        return /^0?8[0-9]{8,12}$/.test(cleaned);

    }


    // FORMAT TANGGAL
    function formatDate(dateString) {

        if (!dateString) return "-";


        const date = new Date(`${dateString}T00:00:00`);

        if (Number.isNaN(date.getTime())) return dateString;


        return date.toLocaleDateString("id-ID", {

            day: "2-digit",

            month: "long",

            year: "numeric"

        });

    }


    // TAMPILKAN ERROR
    function showError(message) {

        errorBox.textContent = message;

        errorBox.hidden = false;

        errorBox.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    }


    function hideError() {

        errorBox.hidden = true;

        errorBox.textContent = "";

    }


    // VALIDASI FORM
    function validateForm() {

        hideError();


        if (!form.checkValidity()) {

            form.reportValidity();

            return false;

        }


        const data = getFormData();


        if (data.studentName.length < 3) {

            showError("Nama calon siswa minimal 3 karakter.");

            return false;

        }


        if (data.nisn !== "-" && !/^\d{10}$/.test(data.nisn)) {

            showError("NISN harus terdiri dari 10 angka.");

            document.getElementById("studentNisn").focus();

            return false;

        }


        if (!validatePhone(data.parentPhone)) {

            showError(
                "Nomor WhatsApp orang tua tidak valid. Contoh: 081234567890."
            );

            document.getElementById("parentPhone").focus();

            return false;

        }


        if (data.birthDate) {

            const birthDate = new Date(
                `${data.birthDate}T00:00:00`
            );

            if (birthDate >= new Date()) {

                showError(
                    "Tanggal lahir harus lebih awal dari hari ini."
                );

                document.getElementById("birthDate").focus();

                return false;

            }

        }


        const whatsappNumber = PPDB_CONFIG.whatsappNumber;


        if (!/^\d{10,15}$/.test(whatsappNumber)) {

            showError(
                "Nomor WhatsApp panitia belum dikonfigurasi dengan benar."
            );

            return false;

        }


        return true;

    }


    // MEMBUAT ELEMEN PREVIEW
    function createPreviewRow(label, value) {

        const row = document.createElement("div");

        row.className = "ppdb-preview-row";


        const labelElement = document.createElement("span");

        labelElement.textContent = label;


        const valueElement = document.createElement("strong");

        valueElement.textContent = value || "-";


        row.append(labelElement, valueElement);

        return row;

    }


    // RENDER RINGKASAN
    function renderPreview(data) {

        previewContent.replaceChildren();


        const sections = [

            {

                title: "Identitas Calon Siswa",

                items: [

                    ["Nama Lengkap", data.studentName],

                    ["NISN", data.nisn],

                    ["Jenis Kelamin", data.gender],

                    ["Tempat Lahir", data.birthPlace],

                    ["Tanggal Lahir", formatDate(data.birthDate)],

                    ["Agama", data.religion],

                    ["Asal Sekolah", data.originSchool],

                    ["Alamat", data.address]

                ]

            },

            {

                title: "Informasi Orang Tua / Wali",

                items: [

                    ["Nama Orang Tua", data.parentName],

                    ["Nomor WhatsApp", data.parentPhone],

                    ["Email", data.parentEmail]

                ]

            },

            {

                title: "Informasi Pendaftaran",

                items: [

                    ["Jalur Pendaftaran", data.registrationPath],

                    ["Sumber Informasi", data.source],

                    ["Tahun Ajaran", "2027/2028"]

                ]

            }

        ];


        sections.forEach(section => {

            const group = document.createElement("div");

            group.className = "ppdb-preview-group";


            const heading = document.createElement("h4");

            heading.textContent = section.title;

            group.appendChild(heading);


            section.items.forEach(([label, value]) => {

                group.appendChild(
                    createPreviewRow(label, value)
                );

            });


            previewContent.appendChild(group);

        });

    }


    // SUBMIT FORM: TAMPILKAN PREVIEW
    form.addEventListener("submit", event => {

        event.preventDefault();


        if (!validateForm()) return;


        registrationData = getFormData();


        renderPreview(registrationData);


        preview.hidden = false;


        preview.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    });


    // EDIT DATA
    function closePreview() {

        preview.hidden = true;

        registrationData = null;

        sendButton.disabled = false;

        sendButton.innerHTML =
            'Kirim via WhatsApp <i class="fa-brands fa-whatsapp"></i>';

    }


    editButton?.addEventListener("click", () => {

        closePreview();

        document.getElementById("studentName").focus();

    });


    closeButton?.addEventListener("click", closePreview);


    // KIRIM KE WHATSAPP
    sendButton?.addEventListener("click", () => {

        if (!registrationData || sendButton.disabled) return;


        const data = registrationData;


        const message =

`Assalamu'alaikum, Panitia PPDB MA Az-Zahra.

Saya ingin mengajukan pendaftaran peserta didik baru.

TAHUN AJARAN 2027/2028

=== IDENTITAS CALON SISWA ===

Nama Lengkap: ${data.studentName}
NISN: ${data.nisn}
Jenis Kelamin: ${data.gender}
Tempat Lahir: ${data.birthPlace}
Tanggal Lahir: ${formatDate(data.birthDate)}
Agama: ${data.religion}
Asal Sekolah: ${data.originSchool}
Alamat: ${data.address}

=== DATA ORANG TUA / WALI ===

Nama Orang Tua: ${data.parentName}
Nomor WhatsApp: ${data.parentPhone}
Email: ${data.parentEmail}

=== INFORMASI PENDAFTARAN ===

Jalur Pendaftaran: ${data.registrationPath}
Mengetahui Sekolah Dari: ${data.source}

Saya bersedia mengikuti proses pendaftaran
dan verifikasi sesuai ketentuan sekolah.

Mohon informasi mengenai tahapan selanjutnya.

Terima kasih.

Wassalamu'alaikum.`;


        const whatsappURL =

            `https://wa.me/${PPDB_CONFIG.whatsappNumber}` +

            `?text=${encodeURIComponent(message)}`;


        sendButton.disabled = true;

        sendButton.textContent = "Membuka WhatsApp...";


        const whatsappWindow = window.open(
            whatsappURL,
            "_blank"
        );


        if (whatsappWindow) {

            whatsappWindow.opener = null;

            sendButton.disabled = false;

            sendButton.innerHTML =
                'Kirim via WhatsApp <i class="fa-brands fa-whatsapp"></i>';

        } else {

            sendButton.disabled = false;

            sendButton.textContent = "Popup diblokir - Klik untuk mencoba lagi";


            showError(
                "Browser memblokir jendela baru. Izinkan pop-up atau klik kembali tombol WhatsApp."
            );

        }

    });

}


/* =========================================================
   5. FAQ ACCORDION
========================================================= */

function initPPDBFAQ() {

    const faqItems = document.querySelectorAll(
        ".ppdb-faq-item"
    );


    faqItems.forEach(item => {

        const button = item.querySelector(
            ".ppdb-faq-question"
        );


        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");


            // TUTUP SEMUA ITEM
            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                otherItem.querySelector(
                    ".ppdb-faq-question"
                ).setAttribute("aria-expanded", "false");

            });


            // BUKA ITEM YANG DIKLIK
            if (!isOpen) {

                item.classList.add("active");

                button.setAttribute("aria-expanded", "true");

            }

        });

    });

}


/* =========================================================
   6. LINK WHATSAPP
========================================================= */

function initPPDBWhatsApp() {

    const whatsappNumber = PPDB_CONFIG.whatsappNumber;


    if (!/^\d{10,15}$/.test(whatsappNumber)) return;


    const message = encodeURIComponent(

        "Assalamu'alaikum, saya ingin mendapatkan informasi PPDB MA Az-Zahra tahun ajaran 2027/2028."

    );


    const whatsappURL =

        `https://wa.me/${whatsappNumber}?text=${message}`;


    const links = [

        "ppdbHelpLink",

        "ppdbCtaWhatsapp",

        "floatingWhatsapp"

    ];


    links.forEach(id => {

        const element = document.getElementById(id);

        if (element) {

            element.href = whatsappURL;

        }

    });

}


/* =========================================================
   7. TAHUN COPYRIGHT
========================================================= */

function initPPDBYear() {

    const year = document.getElementById("currentYear");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

}
