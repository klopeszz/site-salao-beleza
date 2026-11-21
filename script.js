// Quando houver um número autorizado, use código do país e DDD, só com dígitos.
// Deixe vazio enquanto o projeto estiver em demonstração.
const whatsappNumber = "";

const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
const header = document.querySelector(".header");
const mobile = window.matchMedia("(max-width: 46rem)");

function setMenu(open) {
  menu.hidden = mobile.matches && !open;
  menuButton.setAttribute("aria-expanded", String(mobile.matches && open));
}

function resetMenu() {
  menuButton.hidden = !mobile.matches;
  setMenu(false);
}

resetMenu();
mobile.addEventListener("change", resetMenu);

menuButton.addEventListener("click", () => {
  setMenu(menu.hidden);
});

menu.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !mobile.matches) return;

  const heading = document.querySelector(`${link.hash} h2`);
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }

  setMenu(false);
});

header.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !mobile.matches || menu.hidden) return;

  setMenu(false);
  menuButton.focus();
});

const booking = document.querySelector("#booking");
const bookingButton = document.querySelector("#booking-button");
const bookingNote = document.querySelector("#booking-note");
const service = document.querySelector("#service");
const preview = document.querySelector("#message-preview");
const messageField = document.querySelector("#message");
const hasWhatsApp = /^[1-9]\d{7,14}$/.test(whatsappNumber);

bookingButton.disabled = false;

if (hasWhatsApp) {
  bookingNote.textContent =
    "O WhatsApp abrirá com a mensagem pronta para você revisar e enviar.";
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    service.value = link.dataset.service;
    preview.hidden = true;
    service.focus({ preventScroll: true });
  });
});

service.addEventListener("change", () => {
  preview.hidden = true;
});

booking.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedService = service.selectedOptions[0].textContent.toLowerCase();
  const message =
    `Olá, Aurora Beauty Studio! Gostaria de consultar um horário para ${selectedService}. ` +
    "Quais horários estão disponíveis?";

  if (hasWhatsApp) {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.location.assign(url);
    return;
  }

  messageField.value = message;
  preview.hidden = false;
  messageField.focus();
});