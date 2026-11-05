document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".gallery-card")];
  const filters = document.querySelectorAll(".gallery-filter");
  const count = document.getElementById("galleryCount");
  const lightbox = document.getElementById("galleryLightbox");
  const image = document.getElementById("lightboxImage");
  const caption = document.getElementById("lightboxCaption");
  let visibleCards = cards;
  let currentIndex = 0;

  function applyFilter(filter) {
    visibleCards = cards.filter(card => filter === "all" || card.dataset.category === filter);
    cards.forEach(card => card.hidden = !visibleCards.includes(card));
    if (count) count.textContent = visibleCards.length;
  }
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(item => item.classList.toggle("active", item === button));
    applyFilter(button.dataset.filter);
  }));

  function showImage(index) {
    if (!visibleCards.length) return;
    currentIndex = (index + visibleCards.length) % visibleCards.length;
    const card = visibleCards[currentIndex];
    image.src = card.dataset.image;
    image.alt = card.dataset.title;
    caption.textContent = card.dataset.title;
  }
  function openLightbox(card) {
    currentIndex = visibleCards.indexOf(card);
    showImage(currentIndex);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("lightboxClose").focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  cards.forEach(card => card.addEventListener("click", () => openLightbox(card)));
  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev")?.addEventListener("click", () => showImage(currentIndex - 1));
  document.getElementById("lightboxNext")?.addEventListener("click", () => showImage(currentIndex + 1));
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (!lightbox?.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
});
