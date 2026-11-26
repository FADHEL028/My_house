const themeToggle = document.querySelector("#theme-toggle");
const themeStorageKey = "villa-bc90-theme";

function getInitialTheme() {
    try {
        const savedTheme = window.localStorage.getItem(themeStorageKey);
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
    } catch (error) {
        console.error("Impossible de lire le thème enregistré.", error);
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme, save = false) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    themeToggle.textContent = isDark ? "Thème clair" : "Thème sombre";
    themeToggle.setAttribute("aria-pressed", String(isDark));

    if (save) {
        try {
            window.localStorage.setItem(themeStorageKey, theme);
        } catch (error) {
            console.error("Impossible d’enregistrer le thème choisi.", error);
        }
    }
}

applyTheme(getInitialTheme());

themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.12 });

    document.querySelectorAll(".feature, .facade .section-heading, .facade-gallery img").forEach((element) => {
        element.classList.add("reveal-on-scroll");
        revealObserver.observe(element);
    });
}