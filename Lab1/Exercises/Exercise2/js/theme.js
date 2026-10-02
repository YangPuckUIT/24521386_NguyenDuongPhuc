const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;

  const isDark = theme === "dark";

  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";

applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = root.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});