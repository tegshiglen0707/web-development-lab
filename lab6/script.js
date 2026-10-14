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
  html: { title: "Вебийн үндэс", videoId: "ok-plXXHlWw", description: "HTML-ийн үндсэн бүтэц, semantic tag болон form-ийн богино хичээл." },
  css: { title: "CSS дизайн", videoId: "OEV8gMkCHXQ", description: "CSS-ийн үндсэн ойлголт, selector болон style дүрмийн товч танилцуулга." },
  layout: { title: "Flexbox ба Grid", videoId: "K74l26pE4YA", description: "Flexbox ашиглан уян хатан байрлал, responsive layout бүтээх богино жишээ." },
  javascript: { title: "JavaScript эхлэл", videoId: "DHjqpvDnNGE", description: "JavaScript-ийн хувьсагч, функц, event зэрэг суурь ойлголтуудын товч тайлбар." },
  ui: { title: "Интерфейс зохиомж", videoId: "rKfZ-OKgX_M", description: "Figma ашиглан интерфейсийн wireframe болон UI зохиомж эхлүүлэх богино жишээ." },
  project: { title: "Мини төсөл", videoId: "uuOXPWCh-6o", description: "Сурсан HTML, CSS-ээ нэгтгэн responsive веб хуудас бүтээх богино танилцуулга." }
};

const lessonTitle = document.querySelector("#video-title");
const lessonDescription = document.querySelector("#lesson-description");
const lessonLink = document.querySelector("#youtube-lesson-link");
const lessonEmbed = document.querySelector("#lesson-embed");
const lessonOptions = document.querySelectorAll("[data-lesson-option]");

function selectLesson(id) {
  const lesson = lessons[id];
  if (!lesson) return;

  lessonTitle.textContent = lesson.title;
  lessonDescription.textContent = lesson.description;
  lessonLink.href = `https://www.youtube.com/watch?v=${lesson.videoId}`;
  lessonLink.setAttribute("aria-label", `${lesson.title}: YouTube дээр нээх`);
  lessonEmbed.title = `${lesson.title} хичээлийн видео`;
  lessonEmbed.src = `https://www.youtube-nocookie.com/embed/${lesson.videoId}?autoplay=1&rel=0`;
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
