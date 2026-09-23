const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
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

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const duration = 1300;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = target === 100 ? `${value}%` : value;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(element);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => countObserver.observe(counter));

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
