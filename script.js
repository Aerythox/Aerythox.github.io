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
        const isActive = traceCase.dataset.traceCase === name;
        traceCase.classList.remove("is-active");
        if (isActive) {
            // Reading layout between removing and adding the class restarts the row sequence.
            void traceCase.offsetWidth;
            traceCase.classList.add("is-active");
        }
    });
}

// Header: show its bottom line once the page has scrolled.
const siteHeader = document.querySelector(".site-header");
let headerTicking = false;

function updateHeader() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
    headerTicking = false;
}

window.addEventListener("scroll", () => {
    if (!headerTicking) {
        headerTicking = true;
        requestAnimationFrame(updateHeader);
    }
}, { passive: true });

updateHeader();

// Reveal content below the hero as it scrolls into view, once per element.
const revealTargets = document.querySelectorAll("main > .section .section-title, main > .section .section-body > *");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    // Threshold 0 means any part showing counts, so very tall blocks on small screens still reveal.
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

    revealTargets.forEach((target) => {
        target.classList.add("reveal");
        revealObserver.observe(target);
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
