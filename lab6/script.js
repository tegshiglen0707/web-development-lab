const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Гэрэлтэй горим асаах" : "Харанхуй горим асаах");
  try {
    localStorage.setItem("code-campus-theme", theme);
  } catch {
    // Theme still works when storage is unavailable.
  }
}

try {
  const savedTheme = localStorage.getItem("code-campus-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (systemDark ? "dark" : "light"));
} catch {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll("[data-flip]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".photo-card");
    const flipped = card.classList.toggle("is-flipped");
    const front = card.querySelector(".card-front");
    const back = card.querySelector(".card-back");
    front.toggleAttribute("inert", flipped);
    front.setAttribute("aria-hidden", String(flipped));
    back.toggleAttribute("inert", !flipped);
    back.setAttribute("aria-hidden", String(!flipped));
    card.querySelectorAll("[data-flip]").forEach((control) => {
      control.setAttribute("aria-pressed", String(flipped));
    });
    if (flipped) card.querySelector(".back-button").focus();
  });
});
