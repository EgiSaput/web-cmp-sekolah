
/* =========================================================
   MA AZ-ZAHRA
   GALERI SEKOLAH
========================================================= */


/* =========================================================
   1. DATA DUMMY GALERI
========================================================= */

const galleryData = [

    {
        id: 1,
        title: "Kegiatan Belajar Mengajar",
        category: "akademik",
        categoryLabel: "Akademik",
        description: "Suasana pembelajaran yang aktif dan menyenangkan di kelas.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1100&q=85",
        layout: "large"
    },

    {
        id: 2,
        title: "Kebersamaan Siswa",
        category: "kegiatan",
        categoryLabel: "Kegiatan",
        description: "Momen kebersamaan siswa dalam berbagai aktivitas sekolah.",
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85",
        layout: ""
    },

    {
        id: 3,
        title: "Kegiatan Perpustakaan",
        category: "akademik",
        categoryLabel: "Akademik",
        description: "Meningkatkan minat baca dan budaya literasi siswa.",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85",
        layout: ""
    },

    {
        id: 4,
        title: "Prestasi Peserta Didik",
        category: "prestasi",
        categoryLabel: "Prestasi",
        description: "Semangat dan pencapaian siswa dalam berbagai kompetisi.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85",
        layout: "wide"
    },

    {
        id: 5,
        title: "Kegiatan Ekstrakurikuler",
        category: "ekstrakurikuler",
        categoryLabel: "Ekstrakurikuler",
        description: "Pengembangan minat, bakat, dan kreativitas peserta didik.",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=85",
        layout: ""
    },

    {
        id: 6,
        title: "Lingkungan Madrasah",
        category: "lingkungan",
        categoryLabel: "Lingkungan",
        description: "Suasana lingkungan sekolah yang nyaman dan asri.",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=85",
        layout: ""
    },

    {
        id: 7,
        title: "Diskusi dan Kolaborasi",
        category: "akademik",
        categoryLabel: "Akademik",
        description: "Belajar bersama untuk meningkatkan kemampuan berpikir kritis.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85",
        layout: "large"
    },

    {
        id: 8,
        title: "Kegiatan Upacara",
        category: "kegiatan",
        categoryLabel: "Kegiatan",
        description: "Menanamkan kedisiplinan dan rasa cinta tanah air.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
        layout: ""
    },

    {
        id: 9,
        title: "Kegiatan Olahraga",
        category: "ekstrakurikuler",
        categoryLabel: "Ekstrakurikuler",
        description: "Membangun kesehatan, sportivitas, dan kerja sama tim.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
        layout: ""
    },

    {
        id: 10,
        title: "Kegiatan Sosial",
        category: "kegiatan",
        categoryLabel: "Kegiatan",
        description: "Menumbuhkan kepedulian dan semangat berbagi.",
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=85",
        layout: ""
    },

    {
        id: 11,
        title: "Penghargaan Siswa",
        category: "prestasi",
        categoryLabel: "Prestasi",
        description: "Apresiasi atas kerja keras dan pencapaian peserta didik.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85",
        layout: "wide"
    },

    {
        id: 12,
        title: "Suasana Sekolah",
        category: "lingkungan",
        categoryLabel: "Lingkungan",
        description: "Lingkungan belajar yang mendukung perkembangan siswa.",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=85",
        layout: ""
    }

];


/* =========================================================
   2. INISIALISASI GALERI
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galleryGrid = document.getElementById("galleryGrid");

    if (!galleryGrid) return;

    initGallery();

});


/* =========================================================
   3. VARIABEL GALERI
========================================================= */

let filteredGallery = [...galleryData];

let activeCategory = "all";

let searchKeyword = "";

let currentLightboxIndex = 0;

let previousFocusElement = null;


/* =========================================================
   4. FUNGSI UTAMA
========================================================= */

function initGallery() {

    const filters = document.querySelectorAll(".gallery-filter");

    const searchInput = document.getElementById("gallerySearch");

    const resetButton = document.getElementById("resetGallery");


    // Render awal
    renderGallery();

    updateGalleryStats();


    // FILTER KATEGORI
    filters.forEach(button => {

        button.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory = button.dataset.filter;

            renderGallery();

        });

    });


    // PENCARIAN
    searchInput?.addEventListener("input", event => {

        searchKeyword = event.target.value
            .toLowerCase()
            .trim();

        renderGallery();

    });


    // RESET FILTER
    resetButton?.addEventListener("click", resetGallery);


    // LIGHTBOX
    initLightbox();

}


/* =========================================================
   5. RENDER FOTO
========================================================= */

function renderGallery() {

    const galleryGrid = document.getElementById("galleryGrid");

    const galleryEmpty = document.getElementById("galleryEmpty");

    const galleryResult = document.getElementById("galleryResult");


    if (!galleryGrid) return;


    // FILTER DATA
    filteredGallery = galleryData.filter(item => {

        const matchCategory =
            activeCategory === "all" ||
            item.category === activeCategory;

        const searchableText = [
            item.title,
            item.description,
            item.categoryLabel
        ].join(" ").toLowerCase();

        const matchSearch =
            searchableText.includes(searchKeyword);

        return matchCategory && matchSearch;

    });


    // UPDATE INFO
    galleryResult.textContent =
        `Menampilkan ${filteredGallery.length} dari ${galleryData.length} foto`;


    // EMPTY STATE
    if (filteredGallery.length === 0) {

        galleryGrid.innerHTML = "";

        galleryEmpty.hidden = false;

        return;

    }

    galleryEmpty.hidden = true;


    // RENDER HTML
    galleryGrid.innerHTML = filteredGallery.map((item, index) => {

        const layoutClass = item.layout
            ? `gallery-${item.layout}`
            : "";

        return `

            <article
                class="gallery-card ${layoutClass}"
                tabindex="0"
                role="button"
                aria-label="Lihat foto ${escapeGalleryHTML(item.title)}"
                data-index="${index}"
            >

                <img
                    src="${item.image}"
                    alt="${escapeGalleryHTML(item.title)}"
                    loading="lazy"
                >

                <div class="gallery-card-zoom">
                    <i class="fa-solid fa-expand"></i>
                </div>

                <div class="gallery-card-content">

                    <span class="gallery-card-category">
                        ${escapeGalleryHTML(item.categoryLabel)}
                    </span>

                    <h3>
                        ${escapeGalleryHTML(item.title)}
                    </h3>

                    <p>
                        ${escapeGalleryHTML(item.description)}
                    </p>

                </div>

            </article>

        `;

    }).join("");


    // EVENT KLIK FOTO
    galleryGrid.querySelectorAll(".gallery-card").forEach(card => {

        card.addEventListener("click", () => {

            const index = Number(card.dataset.index);

            openLightbox(index);

        });


        // AKSESIBILITAS KEYBOARD
        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                openLightbox(Number(card.dataset.index));

            }

        });

    });

}


/* =========================================================
   6. STATISTIK
========================================================= */

function updateGalleryStats() {

    const totalPhotos = document.getElementById("totalPhotos");

    const totalCategories = document.getElementById("totalCategories");


    if (totalPhotos) {

        totalPhotos.textContent = galleryData.length;

    }


    if (totalCategories) {

        const categories = new Set(
            galleryData.map(item => item.category)
        );

        totalCategories.textContent = categories.size;

    }

}


/* =========================================================
   7. RESET FILTER
========================================================= */

function resetGallery() {

    activeCategory = "all";

    searchKeyword = "";


    const searchInput = document.getElementById("gallerySearch");

    if (searchInput) {
        searchInput.value = "";
    }


    document.querySelectorAll(".gallery-filter").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === "all"
        );

    });


    renderGallery();

}


/* =========================================================
   8. LIGHTBOX
========================================================= */

function initLightbox() {

    const lightbox = document.getElementById("galleryLightbox");

    const closeButton = document.getElementById("lightboxClose");

    const prevButton = document.getElementById("lightboxPrev");

    const nextButton = document.getElementById("lightboxNext");


    closeButton?.addEventListener("click", closeLightbox);

    prevButton?.addEventListener("click", showPreviousImage);

    nextButton?.addEventListener("click", showNextImage);


    // KLIK BACKGROUND UNTUK MENUTUP
    lightbox?.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // KEYBOARD CONTROL
    document.addEventListener("keydown", event => {

        if (lightbox.hidden) return;


        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            showNextImage();

        }

        if (event.key === "ArrowLeft") {

            showPreviousImage();

        }

    });

}


/* =========================================================
   9. BUKA LIGHTBOX
========================================================= */

function openLightbox(index) {

    const lightbox = document.getElementById("galleryLightbox");

    if (!lightbox || !filteredGallery[index]) return;


    previousFocusElement = document.activeElement;

    currentLightboxIndex = index;


    renderLightbox();


    lightbox.hidden = false;

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";


    document.getElementById("lightboxClose")?.focus();

}


/* =========================================================
   10. TAMPILKAN FOTO LIGHTBOX
========================================================= */

function renderLightbox() {

    const item = filteredGallery[currentLightboxIndex];

    if (!item) return;


    const image = document.getElementById("lightboxImage");

    const title = document.getElementById("lightboxTitle");

    const description = document.getElementById("lightboxDescription");

    const category = document.getElementById("lightboxCategory");

    const counter = document.getElementById("lightboxCounter");


    image.src = item.image;

    image.alt = item.title;

    title.textContent = item.title;

    description.textContent = item.description;

    category.textContent = item.categoryLabel;


    counter.textContent =

        `${String(currentLightboxIndex + 1).padStart(2, "0")}` +

        ` / ${String(filteredGallery.length).padStart(2, "0")}`;


    // NAVIGASI FOTO
    const prevButton = document.getElementById("lightboxPrev");

    const nextButton = document.getElementById("lightboxNext");


    const hasMultiple = filteredGallery.length > 1;

    prevButton.disabled = !hasMultiple;

    nextButton.disabled = !hasMultiple;

}


/* =========================================================
   11. FOTO BERIKUTNYA
========================================================= */

function showNextImage() {

    if (filteredGallery.length <= 1) return;


    currentLightboxIndex++;

    if (currentLightboxIndex >= filteredGallery.length) {

        currentLightboxIndex = 0;

    }


    renderLightbox();

}


/* =========================================================
   12. FOTO SEBELUMNYA
========================================================= */

function showPreviousImage() {

    if (filteredGallery.length <= 1) return;


    currentLightboxIndex--;

    if (currentLightboxIndex < 0) {

        currentLightboxIndex = filteredGallery.length - 1;

    }


    renderLightbox();

}


/* =========================================================
   13. TUTUP LIGHTBOX
========================================================= */

function closeLightbox() {

    const lightbox = document.getElementById("galleryLightbox");

    if (!lightbox) return;


    lightbox.hidden = true;

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";


    if (previousFocusElement?.isConnected) {

        previousFocusElement.focus();

    }

}


/* =========================================================
   14. ESCAPE HTML
========================================================= */

function escapeGalleryHTML(value) {

    return String(value).replace(/[&<>"']/g, char => {

        const entities = {

            "&": "&amp;",

            "<": "&lt;",

            ">": "&gt;",

            '"': "&quot;",

            "'": "&#039;"

        };

        return entities[char];

    });

}
