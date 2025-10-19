// app.js

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.setAttribute('aria-expanded', String(!expanded));
  });
}

// Formulaire (alerte + reset)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Votre message est prêt à être envoyé sur WhatsApp. Cliquez sur OK pour continuer.");
    form.reset();
  });
}

function sendToWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showToast("Veuillez remplir tous les champs avant d’envoyer.");
    return;
  }

  const fullMessage = `Nouveau message depuis le site LA MAISON DG :\n\nNom : ${name}\nEmail : ${email}\nMessage : ${message}`;
  const encodedMessage = encodeURIComponent(fullMessage);
  const whatsappNumber = "22595119193";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  showToast("✅ Message prêt à être envoyé sur WhatsApp…");

  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 1200);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("visible");

  setTimeout(() => {
    toast.classList.remove("visible");
    toast.classList.add("hidden");
  }, 4000);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".project-card").forEach(card => {
  observer.observe(card);
});