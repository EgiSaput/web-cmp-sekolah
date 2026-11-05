/* =========================================================
   MA AZ-ZAHRA - AUTO THEME BY LOCAL DEVICE TIME
   06:00 - 17:59 : Light
   18:00 - 05:59 : Dark
   No manual theme toggle is used.
========================================================= */
(() => {
    const LIGHT_START_HOUR = 6;
    const DARK_START_HOUR = 18;
    let timerId = null;

    function getThemeByLocalTime(date = new Date()) {
        const hour = date.getHours();
        return hour >= LIGHT_START_HOUR && hour < DARK_START_HOUR
            ? "light"
            : "dark";
    }

    function applyAutomaticTheme() {
        const theme = getThemeByLocalTime();
        const root = document.documentElement;

        root.setAttribute("data-theme", theme);
        root.style.colorScheme = theme;

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute(
                "content",
                theme === "dark" ? "#101b2a" : "#12345a"
            );
        }
    }

    function scheduleNextCheck() {
        if (timerId) window.clearTimeout(timerId);

        // Periksa lagi pada awal menit berikutnya agar perubahan jam perangkat
        // segera diterapkan tanpa perlu memuat ulang halaman.
        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        timerId = window.setTimeout(() => {
            applyAutomaticTheme();
            scheduleNextCheck();
        }, Math.max(delay, 250));
    }

    // Terapkan tema sedini mungkin untuk menghindari kilatan tema yang salah.
    applyAutomaticTheme();
    scheduleNextCheck();

    // Perbarui juga ketika tab kembali aktif atau pengguna mengubah jam perangkat.
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) applyAutomaticTheme();
    });

    window.addEventListener("focus", applyAutomaticTheme);
    window.addEventListener("pageshow", applyAutomaticTheme);
})();
