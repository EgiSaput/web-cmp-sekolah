// Komponen bersama dan fungsi utilitas Sekolah Rahayu
window.SiteComponents = {
  formatDate(dateString) {
    if (!dateString) return "-";
    if (/[a-zA-Z]/.test(dateString)) return dateString;
    try {
      const parsed = new Date(dateString.includes("T") ? dateString : dateString + "T00:00:00");
      if (isNaN(parsed.getTime())) return dateString;
      return parsed.toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric"
      });
    } catch {
      return dateString;
    }
  },

  resolveImageUrl(url) {
    const isSub = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/admin/");
    if (!url) return isSub ? "../images/gedung-madrasah.jpg" : "images/gedung-madrasah.jpg";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//") || url.startsWith("data:")) {
      return url;
    }
    const clean = url.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
    return isSub ? `../${clean}` : clean;
  }
};
