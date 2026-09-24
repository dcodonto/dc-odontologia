const revealItems = document.querySelectorAll(".reveal");
const leadForm = document.querySelector("#leadForm");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const desktopNav = document.querySelector(".desktop-nav");
const backToTop = document.querySelector(".back-to-top");
const clinicWhatsApp = "5521998485107";

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

menuToggle?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

desktopNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

desktopNav?.querySelector(".nav-dropdown button")?.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 980px)").matches) {
    document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" });
    siteHeader?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  }
});

document.addEventListener("click", (event) => {
  if (!siteHeader?.classList.contains("is-open")) return;
  if (siteHeader.contains(event.target)) return;

  siteHeader.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) menuToggle.textContent = "☰";
});

const toggleBackToTop = () => {
  const showAfter = window.innerHeight * 0.5;
  backToTop?.classList.toggle("is-visible", window.scrollY > showAfter);
};

window.addEventListener("scroll", toggleBackToTop, { passive: true });
window.addEventListener("resize", toggleBackToTop);
toggleBackToTop();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  backToTop.classList.remove("is-visible");
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leadForm);
  const lead = {
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    interest: String(formData.get("interest") || "").trim(),
    period: String(formData.get("period") || "").trim(),
    source: "Site DC Odontologia",
  };

  const message = [
    "Olá, vim pelo site da DC Odontologia e gostaria de agendar uma avaliação.",
    `Nome: ${lead.name}`,
    `WhatsApp: ${lead.phone}`,
    `Interesse: ${lead.interest}`,
    `Melhor horário: ${lead.period}`,
    `Origem: ${lead.source}`,
  ].join("\n");

  window.open(`https://wa.me/${clinicWhatsApp}?text=${encodeURIComponent(message)}`, "_blank");
  leadForm.reset();
});
