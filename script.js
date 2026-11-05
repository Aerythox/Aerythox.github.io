document.documentElement.classList.add("js");

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function setMenuOpen(isOpen) {
    siteNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
}

menuToggle.addEventListener("click", () => {
    setMenuOpen(!siteNav.classList.contains("is-open"));
});

siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

// Request trace: both cases live in the HTML, and this only switches between them.
const traceOptions = document.querySelectorAll(".trace-option");
const traceCases = document.querySelectorAll(".trace-case");

function showTrace(name) {
    traceOptions.forEach((option) => {
        option.setAttribute("aria-pressed", String(option.dataset.trace === name));
    });
    traceCases.forEach((traceCase) => {
        traceCase.hidden = traceCase.dataset.traceCase !== name;
    });
}

traceOptions.forEach((option) => {
    option.addEventListener("click", () => showTrace(option.dataset.trace));
});

showTrace("changed");

// Highlight the nav link for the section currently on screen.
const navLinks = [...siteNav.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            if (link.hash === `#${entry.target.id}`) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    });
}, { rootMargin: "-30% 0px -60% 0px" });

document.querySelectorAll("main > section").forEach((section) => sectionObserver.observe(section));
