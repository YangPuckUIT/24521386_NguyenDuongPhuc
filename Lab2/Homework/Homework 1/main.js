const status = document.querySelector("#app-status");
const container = document.querySelector("#data-grid-container");

function initializeApp() {
  status.textContent = "Application initialized successfully.";

  const message = document.createElement("p");
  message.textContent = "Data Grid component will be implemented in M1.";

  container.appendChild(message);
}

initializeApp();