const revealItems = document.querySelectorAll(".reveal");
const leadForm = document.querySelector("#leadForm");
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

document.querySelector(".menu-toggle")?.addEventListener("click", () => {
  document.querySelector("#clinica")?.scrollIntoView({ behavior: "smooth" });
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
