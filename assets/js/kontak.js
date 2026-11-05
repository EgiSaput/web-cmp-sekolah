
/* =========================================================
   MA AZ-ZAHRA
   CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initContactForm();
    initContactWhatsApp();

});


/* =========================================================
   1. FORM KONTAK
========================================================= */

function initContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;


    const feedback = document.getElementById("contactFeedback");

    const submitButton = form.querySelector('button[type="submit"]');


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // VALIDASI HTML
        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        // AMBIL DATA FORM
        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const phone = document.getElementById("contactPhone").value.trim();

        const subject = document.getElementById("contactSubject").value;

        const message = document.getElementById("contactMessage").value.trim();


        // VALIDASI TAMBAHAN
        if (name.length < 3 || message.length < 10) {

            showContactFeedback(
                "error",
                "Pastikan nama minimal 3 karakter dan pesan minimal 10 karakter."
            );

            return;

        }


        // NOMOR WHATSAPP DARI CONFIG.JS
        const whatsappNumber =
            window.SITE_CONFIG?.whatsappNumber || "6281200000000";


        if (!/^\d{10,15}$/.test(whatsappNumber)) {

            showContactFeedback(
                "error",
                "Nomor WhatsApp sekolah belum dikonfigurasi dengan benar."
            );

            return;

        }


        // FORMAT PESAN
        const whatsappMessage =

`Halo MA Az-Zahra,

Saya ingin menghubungi pihak sekolah.

Nama: ${name}
Email: ${email}
Nomor WhatsApp: ${phone || "-"}
Subjek: ${subject}

Pesan:
${message}

Terima kasih.`;


        // BUAT LINK WHATSAPP
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


        // BUKA WHATSAPP
        const whatsappWindow = window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        if (whatsappWindow) {

            showContactFeedback(
                "success",
                "Pesan sudah disiapkan. Silakan periksa WhatsApp dan tekan tombol Kirim untuk mengirimkannya ke pihak sekolah."
            );

            form.reset();

        } else {

            showContactFeedback(
                "error",
                "Browser memblokir jendela WhatsApp. Silakan gunakan tautan berikut untuk melanjutkan."
            );


            // LINK ALTERNATIF
            const link = document.createElement("a");

            link.href = whatsappURL;

            link.target = "_blank";

            link.rel = "noopener";

            link.textContent = "Buka WhatsApp";


            feedback.appendChild(document.createElement("br"));

            feedback.appendChild(link);

        }


    });

}


/* =========================================================
   2. NOTIFIKASI FORM
========================================================= */

function showContactFeedback(type, message) {

    const feedback = document.getElementById("contactFeedback");

    if (!feedback) return;


    feedback.className = `contact-form-feedback ${type}`;

    feedback.textContent = message;

    feedback.hidden = false;


    feedback.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* =========================================================
   3. FLOATING WHATSAPP
========================================================= */

function initContactWhatsApp() {

    const button = document.getElementById("floatingWhatsapp");

    if (!button) return;


    const whatsappNumber =
        window.SITE_CONFIG?.whatsappNumber || "6281200000000";


    const message = encodeURIComponent(
        "Halo MA Az-Zahra, saya ingin mendapatkan informasi mengenai sekolah."
    );


    button.href = `https://wa.me/${whatsappNumber}?text=${message}`;

}
