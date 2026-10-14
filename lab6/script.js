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

const lessons = {
  html: { title: "Вебийн үндэс", query: "HTML semantic form basics short tutorial", description: "HTML-ийн үндсэн бүтэц, semantic tag болон form-ийн богино хичээл." },
  css: { title: "CSS дизайн", query: "CSS selectors colors typography short tutorial", description: "CSS selector, өнгө, typography ашиглах богино хичээл." },
  layout: { title: "Flexbox ба Grid", query: "CSS flexbox grid responsive layout short tutorial", description: "Flexbox, CSS Grid ашиглан responsive layout хийх жишээ." },
  javascript: { title: "JavaScript эхлэл", query: "JavaScript DOM events beginner short tutorial", description: "JavaScript DOM болон event-ийн анхан шатны жишээ." },
  ui: { title: "Интерфейс зохиомж", query: "UI UX wireframe design basics short tutorial", description: "Wireframe болон UI/UX зохиомжийн богино тайлбар." },
  project: { title: "Мини төсөл", query: "HTML CSS JavaScript portfolio beginner project tutorial", description: "HTML, CSS, JavaScript-ээр мини portfolio хийх жишээ." }
};

const lessonDescription = document.querySelector("#lesson-description");
const lessonLink = document.querySelector("#youtube-lesson-link");
const lessonOptions = document.querySelectorAll("[data-lesson-option]");

function selectLesson(id) {
  const lesson = lessons[id];
  if (!lesson) return;

  lessonDescription.textContent = lesson.description;
  lessonLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.query)}`;
  lessonLink.setAttribute("aria-label", `${lesson.title}: YouTube дээр богино хичээл үзэх`);
  lessonOptions.forEach((option) => {
    const selected = option.dataset.lessonOption === id;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
}

document.querySelectorAll("[data-lesson]").forEach((link) => {
  link.addEventListener("click", () => selectLesson(link.dataset.lesson));
});

lessonOptions.forEach((option) => {
  option.addEventListener("click", () => selectLesson(option.dataset.lessonOption));
});
