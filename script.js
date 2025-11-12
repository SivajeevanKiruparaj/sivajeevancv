const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const backToTop = document.querySelector(".back-to-top");
const yearElement = document.querySelector("#current-year");
const navToggle = document.querySelector(".site-nav__toggle");
const navList = document.querySelector(".site-nav__list");

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (theme) => {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle?.setAttribute("aria-pressed", "true");
  } else {
    root.removeAttribute("data-theme");
    themeToggle?.setAttribute("aria-pressed", "false");
  }
};

const savedTheme = localStorage.getItem("ks-theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
  applyTheme("dark");
}

themeToggle?.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";
  applyTheme(nextTheme);
  if (nextTheme === "dark") {
    localStorage.setItem("ks-theme", "dark");
  } else {
    localStorage.removeItem("ks-theme");
  }
});

prefersDarkScheme.addEventListener("change", (event) => {
  if (!localStorage.getItem("ks-theme")) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

window.addEventListener("scroll", () => {
  const threshold = 320;
  if (window.scrollY > threshold) {
    backToTop?.classList.add("is-visible");
  } else {
    backToTop?.classList.remove("is-visible");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

navToggle?.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  navList?.classList.toggle("is-open", !isExpanded);
});

navList?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.tagName === "A") {
    navToggle?.setAttribute("aria-expanded", "false");
    navList.classList.remove("is-open");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (targetId && targetId.length > 1) {
      const section = document.querySelector(targetId);
      if (section) {
        event.preventDefault();
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});


