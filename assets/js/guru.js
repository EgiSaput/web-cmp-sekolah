/* =========================================================
   SEKOLAH RAHAYU
   GURU DIRECTORY - SEARCH & FILTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("teacherSearch");
    const categorySelect = document.getElementById("teacherCategory");
    const teacherCards = document.querySelectorAll(".teacher-profile-card");
    const teacherCount = document.getElementById("teacherCount");
    const emptyState = document.getElementById("teacherEmpty");
    const clearButton = document.getElementById("clearTeacherSearch");
    const resetButton = document.getElementById("resetTeacherFilter");

    if (
        !searchInput ||
        !categorySelect ||
        !teacherCount ||
        !emptyState
    ) {
        return;
    }

    function filterTeachers() {

        const keyword = searchInput.value
            .toLowerCase()
            .trim();

        const selectedCategory = categorySelect.value;

        let visibleCount = 0;

        teacherCards.forEach(function (card) {

            const cardName = card.dataset.search || "";
            const cardCategory = card.dataset.category || "";

            const nameMatches = cardName
                .toLowerCase()
                .includes(keyword);

            const categoryMatches =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;

            const isVisible = nameMatches && categoryMatches;

            card.classList.toggle("is-hidden", !isVisible);

            if (isVisible) {
                visibleCount++;
            }

        });

        teacherCount.textContent = visibleCount;

        emptyState.hidden = visibleCount !== 0;

        clearButton.classList.toggle(
            "visible",
            searchInput.value.length > 0
        );
    }

    // PENCARIAN NAMA DAN MAPEL
    searchInput.addEventListener("input", filterTeachers);

    // FILTER KATEGORI
    categorySelect.addEventListener("change", filterTeachers);

    // HAPUS KATA PENCARIAN
    clearButton.addEventListener("click", function () {

        searchInput.value = "";

        filterTeachers();

        searchInput.focus();
    });

    // RESET SEMUA FILTER
    resetButton.addEventListener("click", function () {

        searchInput.value = "";
        categorySelect.value = "all";

        filterTeachers();
    });

    // FILTER AWAL
    filterTeachers();

});