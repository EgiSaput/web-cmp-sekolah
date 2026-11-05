// Tahap berikutnya: komponen bersama dan template halaman akan dikembangkan di sini.
window.SiteComponents = {
  formatDate(dateString) {
    return new Date(dateString + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric"
    });
  }
};
