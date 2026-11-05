
document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       NEWS FILTER & SEARCH
    ===================================================== */

    const newsGrid = document.getElementById("newsGrid");
    const newsSearch = document.getElementById("newsSearch");
    const clearSearch = document.getElementById("clearNewsSearch");
    const filterButtons = document.querySelectorAll(".news-filter-btn");
    const resultCount = document.getElementById("newsResultCount");
    const emptyState = document.getElementById("newsEmpty");
    const resetButton = document.getElementById("resetNewsFilter");

    let activeCategory = "all";

    function filterNews() {
        if (!newsGrid) return;

        const cards = [...newsGrid.querySelectorAll(".news-card")];
        const keyword = (newsSearch?.value || "").trim().toLowerCase();

        let visibleCount = 0;

        cards.forEach((card) => {
            const category = card.dataset.category || "";
            const searchText = card.dataset.search || card.textContent;
            const title = searchText.toLowerCase();

            const matchCategory =
                activeCategory === "all" || category === activeCategory;

            const matchKeyword = title.includes(keyword);
            const isVisible = matchCategory && matchKeyword;

            card.classList.toggle("is-hidden", !isVisible);

            if (isVisible) visibleCount++;
        });

        if (resultCount) {
            resultCount.textContent = `Menampilkan ${visibleCount} informasi`;
        }

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }

        if (clearSearch) {
            clearSearch.classList.toggle("is-visible", keyword.length > 0);
        }
    }

    if (newsSearch) {
        newsSearch.addEventListener("input", filterNews);
    }

    if (clearSearch) {
        clearSearch.addEventListener("click", () => {
            newsSearch.value = "";
            filterNews();
            newsSearch.focus();
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((item) => item.classList.remove("active"));

            button.classList.add("active");
            activeCategory = button.dataset.category || "all";

            filterNews();
        });
    });

    function resetNews() {
        activeCategory = "all";

        if (newsSearch) newsSearch.value = "";

        filterButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.category === "all"
            );
        });

        filterNews();
    }

    if (resetButton) {
        resetButton.addEventListener("click", resetNews);
    }

    /* =====================================================
       NEWS DATA FOR DETAIL PAGE
    ===================================================== */

    const newsData = {
        1: {
            category: "Kegiatan",
            date: "05 November 2026",
            title: "Membangun Semangat Belajar dan Kebersamaan di Lingkungan Madrasah",
            image: "../images/1.jpeg",
            paragraphs: [
                "Lingkungan pendidikan yang positif menjadi bagian penting dalam membentuk peserta didik yang aktif, berkarakter, dan siap menghadapi masa depan. Madrasah bukan hanya tempat untuk memperoleh pengetahuan, tetapi juga ruang untuk membangun nilai, sikap, dan kebersamaan.",
                "Melalui kegiatan pembelajaran dan aktivitas sekolah, peserta didik didorong untuk saling bekerja sama, menghargai perbedaan, serta mengembangkan potensi yang dimiliki.",
                "MA Az-Zahra berkomitmen menghadirkan lingkungan pendidikan yang mendukung perkembangan akademik dan pembentukan karakter. Dengan dukungan pendidik dan seluruh warga madrasah, diharapkan peserta didik dapat tumbuh menjadi generasi yang berilmu dan berakhlak."
            ]
        },
        2: {
            category: "Akademik",
            date: "03 November 2026",
            title: "Menciptakan Pembelajaran Kreatif dan Menyenangkan",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85",
            paragraphs: [
                "Pembelajaran yang efektif tidak hanya berfokus pada penyampaian materi, tetapi juga bagaimana peserta didik dapat terlibat aktif dalam proses belajar.",
                "Pendekatan kreatif dan interaktif dapat membantu peserta didik memahami materi, menyampaikan pendapat, serta mengembangkan kemampuan berpikir kritis.",
                "Melalui suasana belajar yang positif, madrasah berupaya mendorong peserta didik agar lebih percaya diri, mandiri, dan memiliki semangat untuk terus belajar."
            ]
        },
        3: {
            category: "Kegiatan",
            date: "30 Oktober 2026",
            title: "Mempererat Kebersamaan Melalui Kegiatan Madrasah",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=85",
            paragraphs: [
                "Kebersamaan merupakan salah satu nilai penting dalam kehidupan madrasah. Hubungan yang baik antara peserta didik, guru, dan seluruh warga sekolah dapat menciptakan lingkungan yang nyaman dan mendukung.",
                "Berbagai aktivitas bersama dapat menjadi sarana untuk melatih kerja sama, tanggung jawab, kepedulian, dan rasa saling menghargai.",
                "Nilai-nilai tersebut diharapkan dapat diterapkan tidak hanya di lingkungan sekolah, tetapi juga dalam kehidupan sehari-hari."
            ]
        },
        4: {
            category: "Prestasi",
            date: "25 Oktober 2026",
            title: "Mengapresiasi Semangat dan Potensi Peserta Didik",
            image: "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1400&q=85",
            paragraphs: [
                "Setiap peserta didik memiliki potensi dan kemampuan yang dapat dikembangkan melalui proses belajar, latihan, serta pengalaman.",
                "Apresiasi terhadap usaha dan pencapaian peserta didik merupakan salah satu bentuk dukungan untuk membangun motivasi dan kepercayaan diri.",
                "Madrasah terus mendorong peserta didik untuk berani mencoba, mengembangkan kemampuan, dan memberikan kontribusi positif sesuai minat masing-masing."
            ]
        },
        5: {
            category: "Pengumuman",
            date: "20 Oktober 2026",
            title: "Informasi Agenda Kegiatan Madrasah",
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=85",
            paragraphs: [
                "Informasi agenda kegiatan menjadi salah satu hal penting bagi seluruh warga madrasah agar setiap aktivitas dapat dipersiapkan dengan baik.",
                "Peserta didik dan orang tua diharapkan memperhatikan informasi resmi yang disampaikan oleh pihak madrasah melalui saluran komunikasi yang tersedia.",
                "Untuk memperoleh informasi lebih lanjut mengenai agenda dan kegiatan, silakan menghubungi pihak MA Az-Zahra melalui halaman kontak."
            ]
        },
        6: {
            category: "Akademik",
            date: "15 Oktober 2026",
            title: "Menumbuhkan Budaya Literasi di Lingkungan Sekolah",
            image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=85",
            paragraphs: [
                "Literasi memiliki peran penting dalam memperluas wawasan dan meningkatkan kemampuan berpikir peserta didik.",
                "Kebiasaan membaca, memahami informasi, dan menyampaikan gagasan dapat membantu peserta didik menjadi pembelajar yang lebih mandiri.",
                "Budaya literasi perlu dibangun melalui dukungan lingkungan sekolah, keluarga, dan kebiasaan positif yang dilakukan secara konsisten."
            ]
        }
    };

    /* =====================================================
       ARTICLE DETAIL
    ===================================================== */

    const articleTitle = document.getElementById("articleTitle");

    if (articleTitle) {
        const params = new URLSearchParams(window.location.search);
        const articleId = params.get("id");
        const article = newsData[articleId];

        if (article) {
            document.title = `${article.title} | MA Az-Zahra`;

            document.getElementById("articleCategory").textContent = article.category;
            articleTitle.textContent = article.title;
            document.getElementById("articleDate").textContent = article.date;

            const image = document.getElementById("articleImage");
            image.src = article.image;
            image.alt = article.title;

            const body = document.getElementById("articleBody");
            body.replaceChildren();

            article.paragraphs.forEach((paragraph) => {
                const p = document.createElement("p");
                p.textContent = paragraph;
                body.appendChild(p);
            });

            const shareWhatsApp = document.getElementById("shareWhatsApp");
            const copyLink = document.getElementById("copyArticleLink");

            if (shareWhatsApp) {
                shareWhatsApp.addEventListener("click", () => {
                    const shareText = `${article.title} - ${window.location.href}`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
                    window.open(whatsappUrl, "_blank", "noopener");
                });
            }

            if (copyLink) {
                copyLink.addEventListener("click", async () => {
                    try {
                        await navigator.clipboard.writeText(window.location.href);
                        copyLink.innerHTML = '<i class="fa-solid fa-check"></i>';

                        setTimeout(() => {
                            copyLink.innerHTML = '<i class="fa-solid fa-link"></i>';
                        }, 1800);
                    } catch (error) {
                        window.prompt("Salin tautan berita ini:", window.location.href);
                    }
                });
            }
        } else {
            document.title = "Informasi Tidak Ditemukan | MA Az-Zahra";
            articleTitle.textContent = "Informasi Tidak Ditemukan";

            document.getElementById("articleCategory").textContent = "Informasi";
            document.getElementById("articleDate").textContent = "-";
            document.getElementById("articleBody").textContent =
                "Maaf, informasi yang Anda cari tidak tersedia. Silakan kembali ke halaman informasi untuk melihat berita lainnya.";

            document.getElementById("articleImage").style.display = "none";
        }
    }

    filterNews();
});
