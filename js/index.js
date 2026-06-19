 // Mobile menu
 document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mobile-menu').classList.add('hidden'));
  });

  // Form submission
  document.getElementById('apply-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        document.getElementById('form-success').classList.remove('hidden');
  
        form.querySelectorAll('input, textarea, button[type=submit]')
          .forEach(el => el.disabled = true);
  
        setTimeout(() => {
          document.getElementById('application-modal').classList.add('hidden');
          document.getElementById('form-success').classList.add('hidden');
  
          form.querySelectorAll('input, textarea, button[type=submit]')
            .forEach(el => { el.disabled = false; el.value = ''; });
  
          document.getElementById('apply-message').value = '';
        }, 2500);
      } else {
        alert("Form error: " + data.message);
      }
  
    } catch (err) {
      console.error(err);
      alert("Something went wrong sending the form.");
    }
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Lucide
  lucide.createIcons();

  // Element SDK
  const defaultConfig = {
    hero_headline: 'Build a Brand They Can\'t Ignore.',
    hero_subheadline: 'I help serious businesses dominate their market with premium branding, elite lead generation systems, and high-converting growth strategy.',
    cta_primary: 'Apply for Private Consultation',
    cta_secondary: 'View Results',
    services_heading: 'Signature Services',
    final_cta_heading: 'Ready to Become the Obvious Choice in Your Market?',
    background_color: '#0a0a0a',
    gold_color: '#d4af37',
    text_color: '#f5f5f5',
    accent_color: '#10b981',
    surface_color: '#111111',
    font_family: 'Sora',
    font_size: 16
  };

  function applyConfig(config) {
    const c = { ...defaultConfig, ...config };
    const font = c.font_family || defaultConfig.font_family;
    const baseStack = 'Manrope, sans-serif';

    // Text content
    const headlineEl = document.getElementById('hero-headline');
    if (headlineEl) headlineEl.innerHTML = c.hero_headline.replace(/Can't Ignore/i, '<span class="gold-shimmer">Can\'t Ignore.</span>').replace(/\.$/, '');
    const subEl = document.getElementById('hero-sub');
    if (subEl) subEl.textContent = c.hero_subheadline;
    const btnP = document.getElementById('btn-primary');
    if (btnP) btnP.textContent = c.cta_primary;
    const btnS = document.getElementById('btn-secondary');
    if (btnS) btnS.textContent = c.cta_secondary;
    const servH = document.getElementById('services-heading');
    if (servH) servH.textContent = c.services_heading;
    const ctaH = document.getElementById('final-cta-heading');
    if (ctaH) ctaH.innerHTML = c.final_cta_heading.replace(/Obvious Choice/i, '<span class="gold-shimmer">Obvious Choice</span>');

    // Colors
    document.body.style.backgroundColor = c.background_color;
    document.body.style.color = c.text_color;

    // Font
    document.querySelectorAll('.font-sora').forEach(el => {
      el.style.fontFamily = `${font}, ${baseStack}`;
    });

    // Font size
    const base = c.font_size || defaultConfig.font_size;
    document.body.style.fontSize = base + 'px';
  }

  document.querySelectorAll(".read-more").forEach(button => {

    button.addEventListener("click", () => {

        const description =
            button.previousElementSibling;

        description.classList.toggle("expanded");

        button.textContent =
            description.classList.contains("expanded")
            ? "Show less"
            : "Read more";

    });

});

let gaLoaded = false;

// =====================
// COOKIE CONSENT
// =====================
function setCookieConsent(value) {
  localStorage.setItem("cookie-consent", value);
}

function getCookieConsent() {
  return localStorage.getItem("cookie-consent");
}

// =====================
// GOOGLE ANALYTICS
// =====================
function enableGA() {
  if (gaLoaded) return;
  gaLoaded = true;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-MLYFYZ2912";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-MLYFYZ2912");
}

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {

  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("cookie-accept");
  const reject = document.getElementById("cookie-reject");

  if (!banner) return;

  if (!getCookieConsent()) {
    banner.classList.add("show");
  }

  if (getCookieConsent() === "accepted") {
    enableGA();
}

  accept?.addEventListener("click", () => {

    setCookieConsent("accepted");

    banner.classList.remove("show");

    enableGA();

  });

  reject?.addEventListener("click", () => {

    setCookieConsent("rejected");

    banner.classList.remove("show");

  });

});