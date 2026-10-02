// =========================
// APPLICATION STATE
// =========================

const state = {
  theme: "light",
  formStatus: ""
};

// =========================
// THEME SWITCHER
// =========================

const themeToggle = document.querySelector(".theme-toggle");

const themeIcon = themeToggle.querySelector(".theme-icon");

themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "light" ? "dark" : "light";

  document.documentElement.dataset.theme = state.theme;
  document.documentElement.style.colorScheme = state.theme;

  themeToggle.setAttribute(
    "aria-pressed",
    state.theme === "dark"
  );

  themeIcon.innerHTML = state.theme === "dark"
  ? `
    <path d="M21 12.79A9 9 0 1 1 11.21 3
             7 7 0 0 0 21 12.79z"></path>
  `
  : `
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41
             M17.66 17.66l1.41 1.41M2 12h2M20 12h2
             M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
  `;
});

// =========================
// CONTACT FORM
// =========================

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  state.formStatus = "Message sent successfully!";
  formStatus.textContent = state.formStatus;

  contactForm.reset();
});