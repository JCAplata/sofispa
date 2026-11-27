/*
  FUNCIONALIDADES DE SOFISPA
  IMPORTANTE: reemplaza el número de WhatsApp y los enlaces sociales de abajo.
  WhatsApp debe escribirse con código de país, sin +, espacios ni guiones.
  Ejemplo de Colombia: 573001234567 (número ficticio).
*/

const SOFISPA_CONFIG = {
  whatsappNumber: "+573115449052", // REEMPLAZAR por el número real de Sofi
  instagramUrl: "https://www.instagram.com/sofispa.pigment?jplx=MWZrZHQwdTBvcDBrcg==",                // Ejemplo: https://www.instagram.com/usuario/
  facebookUrl: "https://www.facebook.com/share/1CuxUQvgVi/",                 // URL de la página de Facebook
  tiktokUrl: "https://www.tiktok.com/@laurasuaza785?_r=1&_t=ZS-9BkFu8ssEZo",                   // Ejemplo: https://www.tiktok.com/@usuario
  siteUrl: "",                     // URL pública del sitio, necesaria para enlaces de imágenes en WhatsApp
  businessHours: "Lunes a sábado · 9:00 a. m. a 6:00 p. m.", // EDITAR horario real
  businessAddress: "Dirección exacta por confirmar",       // EDITAR dirección real
  mapsUrl: "https://maps.app.goo.gl/hF1tgFeUK7aa3SBN8",                     // Pega aquí el enlace de ubicación de Google Maps
  currency: "COP",
  locale: "es-CO"
};

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    selectedServices: loadCart(),
    serviceOptions: loadOptions(),
    activeCategory: "todos",
    activeGalleryFilter: "todos"
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const formatMoney = (value) => new Intl.NumberFormat(SOFISPA_CONFIG.locale, {
    style: "currency",
    currency: SOFISPA_CONFIG.currency,
    maximumFractionDigits: 0
  }).format(value);

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem("sofispа-cart") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem("sofispа-cart", JSON.stringify(state.selectedServices));
    localStorage.setItem("sofispa-options", JSON.stringify(state.serviceOptions));
  }

  function loadOptions() {
    try {
      const saved = JSON.parse(localStorage.getItem("sofispa-options") || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch { return {}; }
  }

  function getOptions(id) {
    if (!state.serviceOptions[id]) state.serviceOptions[id] = { colors: [], design: "" };
    return state.serviceOptions[id];
  }

  function getService(id) {
    return SOFISPA_SERVICES.find(service => service.id === id);
  }

  function renderServiceCustomization(service) {
    const palette = SOFISPA_PALETTES[service.category] || [];
    const options = getOptions(service.id);
    const colorOptions = palette.map(color => `
      <label class="color-choice" title="${escapeHTML(color.name)}">
        <input type="checkbox" data-color-service="${service.id}" value="${escapeHTML(color.name)}" ${options.colors.includes(color.name) ? "checked" : ""}>
        <span class="color-swatch" style="--swatch:${color.hex}"></span>
        <span class="color-name">${escapeHTML(color.name)}</span>
      </label>`).join("");
    return `
      <div class="service-customization">
        <p class="customization-label">Elige tus colores <small>(puedes elegir varios)</small></p>
        <div class="color-palette">${colorOptions}</div>
        <label class="design-label" for="design-${service.id}">¿Tienes un diseño en mente?</label>
        <textarea id="design-${service.id}" data-design-service="${service.id}" rows="2" maxlength="240" placeholder="Ej. una mariposa, flores, estilo minimalista...">${escapeHTML(options.design)}</textarea>
      </div>`;
  }

  function renderCatalog() {
    const grid = $("#catalog-grid");
    if (!grid) return;

    const services = state.activeCategory === "todos"
      ? SOFISPA_SERVICES
      : SOFISPA_SERVICES.filter(service => service.category === state.activeCategory);

    grid.innerHTML = services.map(service => {
      const added = state.selectedServices.includes(service.id);
      return `
        <article class="service-card">
          <div class="service-image-wrap">
            <img src="${service.image}" alt="${escapeHTML(service.imageAlt)}" loading="lazy"
              onerror="this.parentElement.classList.add('image-missing'); this.style.display='none';">
            <span class="image-fallback">Agrega tu fotografía</span>
            ${service.featured ? '<span class="service-badge">Destacado</span>' : ""}
          </div>
          <div class="service-card-body">
            <p class="service-category">${escapeHTML(service.categoryLabel)}</p>
            <h3>${escapeHTML(service.name)}</h3>
            <p class="service-description">${escapeHTML(service.description)}</p>
            ${renderServiceCustomization(service)}
            <div class="service-card-bottom">
              <strong class="service-price">${formatMoney(service.price)}</strong>
              <button class="add-service ${added ? "is-added" : ""}" type="button"
                data-add-service="${service.id}" aria-pressed="${added}">
                ${added ? "✓ Agregado" : "+ Agregar"}
              </button>
            </div>
          </div>
        </article>`;
    }).join("");

    $$(".category-tab").forEach(button => {
      const active = button.dataset.category === state.activeCategory;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderCart() {
    const cart = $("#cart-items");
    const count = state.selectedServices.length;
    const services = state.selectedServices.map(getService).filter(Boolean);
    const total = services.reduce((sum, service) => sum + service.price, 0);

    $("#cart-count").textContent = count;
    $("#selection-count").textContent = `(${count})`;
    $("#cart-total").textContent = formatMoney(total);

    if (!services.length) {
      cart.innerHTML = `
        <div class="empty-cart">
          <span class="empty-cart-icon">♡</span>
          <p>Aún no has agregado servicios.</p>
          <small>Explora el catálogo y selecciona tus favoritos.</small>
        </div>`;
    } else {
      cart.innerHTML = services.map(service => `
        <article class="cart-item">
          <img src="${service.image}" alt="${escapeHTML(service.imageAlt)}"
            onerror="this.style.visibility='hidden'">
          <div class="cart-item-info">
            <strong>${escapeHTML(service.name)}</strong>
            <span>${formatMoney(service.price)}</span>
            ${getOptions(service.id).colors.length ? `<small>Colores: ${escapeHTML(getOptions(service.id).colors.join(", "))}</small>` : ""}
            ${getOptions(service.id).design ? `<small>Diseño: ${escapeHTML(getOptions(service.id).design)}</small>` : ""}
          </div>
          <button class="remove-service" type="button" data-remove-service="${service.id}"
            aria-label="Quitar ${escapeHTML(service.name)}">×</button>
        </article>`).join("");
    }

    $("#clear-cart").disabled = count === 0;
    saveCart();
    renderCatalog();
  }

  function renderGallery() {
    const grid = $("#gallery-grid");
    const items = state.activeGalleryFilter === "todos"
      ? SOFISPA_GALLERY
      : SOFISPA_GALLERY.filter(item => item.category === state.activeGalleryFilter);

    grid.innerHTML = items.map(item => `
      <figure class="gallery-item">
        <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy"
          onerror="this.parentElement.classList.add('image-missing'); this.style.display='none';">
        <figcaption>${escapeHTML(item.title)}</figcaption>
      </figure>`).join("");

    $$(".gallery-filter").forEach(button => {
      const active = button.dataset.filter === state.activeGalleryFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderReviews() {
    $("#reviews-grid").innerHTML = SOFISPA_REVIEWS.map(review => `
      <article class="review-card">
        <div class="review-stars" aria-label="${review.rating} de 5 estrellas">${"★".repeat(review.rating)}</div>
        <p>“${escapeHTML(review.text)}”</p>
        <strong>${escapeHTML(review.name)}</strong>
      </article>`).join("");
  }

  function renderFAQs() {
    $("#faq-list").innerHTML = SOFISPA_FAQS.map((faq, index) => `
      <details class="faq-item" ${index === 0 ? "open" : ""}>
        <summary>${escapeHTML(faq.question)}<span aria-hidden="true">+</span></summary>
        <p>${escapeHTML(faq.answer)}</p>
      </details>`).join("");
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function buildWhatsAppMessage(formData) {
    const selected = state.selectedServices.map(getService).filter(Boolean);
    const total = selected.reduce((sum, service) => sum + service.price, 0);
    const siteBase = SOFISPA_CONFIG.siteUrl || (location.protocol.startsWith("http") ? location.href : "");
    const lines = [
      "💗 ¡Hola, Sofi! Quiero solicitar una cita en *SofiSpa* ✨",
      "━━━━━━━━━━━━━━━━━━",
      `👤 *Nombre:* ${formData.get("customerName")}`,
      `📍 *Modalidad:* ${formData.get("serviceMode")}`
    ];
    if (formData.get("serviceMode") === "A domicilio") lines.push(`🏡 *Dirección:* ${formData.get("customerAddress") || "Por confirmar"}`);
    lines.push("", "💅 *SERVICIOS SELECCIONADOS*", "");
    selected.forEach((service, index) => {
      let imageUrl = "";
      if (siteBase) imageUrl = new URL(service.image, siteBase).href;
      lines.push(
        `🌸 *${index + 1}. ${service.name}*`,
        `💰 Precio publicado: ${formatMoney(service.price)}`,
        `🎨 Colores: ${getOptions(service.id).colors.length ? getOptions(service.id).colors.join(", ") : "Por definir"}`,
        `📝 Diseño: ${getOptions(service.id).design || "Sin diseño específico"}`,
        imageUrl ? `🖼️ *Ver imagen de referencia:* ${imageUrl}` : "🖼️ Imagen: pendiente de publicar el sitio web",
        ""
      );
    });
    lines.push(
      "━━━━━━━━━━━━━━━━━━",
      `🧾 *Total estimado:* ${formatMoney(total)}`,
      `📅 *Fecha preferida:* ${formData.get("preferredDate") || "Por acordar"}`,
      `⏰ *Hora preferida:* ${formData.get("preferredTime") || "Por acordar"}`
    );
    if (formData.get("notes")) lines.push(`💬 *Comentario:* ${formData.get("notes")}`);
    lines.push("", "🤍 Esta es una solicitud de cita. La disponibilidad, duración y precio final serán confirmados por Sofi.", "¡Muchas gracias! 🌷");
    return lines.join("\n");
  }

  // Categorías del catálogo.
  $("#category-tabs").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.activeCategory = button.dataset.category;
    renderCatalog();
  });

  // Agregar servicios al carrito.
  $("#catalog-grid").addEventListener("click", event => {
    const button = event.target.closest("[data-add-service]");
    if (!button) return;
    const id = button.dataset.addService;

    if (state.selectedServices.includes(id)) {
      state.selectedServices = state.selectedServices.filter(item => item !== id);
    } else {
      state.selectedServices.push(id);
    }
    renderCart();
  });

  // Guardar selección múltiple de colores y descripción de diseño por servicio.
  $("#catalog-grid").addEventListener("change", event => {
    const colorInput = event.target.closest("[data-color-service]");
    if (!colorInput) return;
    const options = getOptions(colorInput.dataset.colorService);
    if (colorInput.checked) {
      if (!options.colors.includes(colorInput.value)) options.colors.push(colorInput.value);
    } else {
      options.colors = options.colors.filter(color => color !== colorInput.value);
    }
    saveCart();
    renderCart();
  });
  $("#catalog-grid").addEventListener("input", event => {
    const designInput = event.target.closest("[data-design-service]");
    if (!designInput) return;
    getOptions(designInput.dataset.designService).design = designInput.value;
    saveCart();
  });

  // Quitar servicios.
  $("#cart-items").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-service]");
    if (!button) return;
    state.selectedServices = state.selectedServices.filter(id => id !== button.dataset.removeService);
    renderCart();
  });

  $("#clear-cart").addEventListener("click", () => {
    state.selectedServices = [];
    state.serviceOptions = {};
    renderCart();
  });

  // Filtros de galería.
  $("#gallery-filters").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.activeGalleryFilter = button.dataset.filter;
    renderGallery();
  });

  // Modalidad a domicilio: mostrar campo de dirección.
  $("#service-mode").addEventListener("change", event => {
    const isHome = event.target.value === "A domicilio";
    $("#address-field").hidden = !isHome;
    $("#customer-address").required = isHome;
  });

  // Enviar la solicitud completa a WhatsApp.
  $("#booking-form").addEventListener("submit", event => {
    event.preventDefault();

    if (!state.selectedServices.length) {
      $("#form-feedback").textContent = "Primero agrega al menos un servicio desde el catálogo.";
      $("#form-feedback").classList.add("is-error");
      $("#servicios").scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (SOFISPA_CONFIG.whatsappNumber === "573000000000") {
      $("#form-feedback").textContent = "Antes de publicar, configura el número real de WhatsApp de Sofi en contenido/script.js.";
      $("#form-feedback").classList.add("is-error");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const message = buildWhatsAppMessage(formData);
    const url = `https://wa.me/${SOFISPA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    $("#form-feedback").textContent = "Se está abriendo WhatsApp para enviar tu solicitud.";
    $("#form-feedback").classList.remove("is-error");
  });

  // Navegación por vistas: muestra solo la sección elegida en el menú.
  function showPage(pageId) {
    const valid = $(`[data-page-view="${pageId}"]`);
    if (!valid) pageId = "inicio";
    $$('[data-page-view]').forEach(panel => panel.classList.toggle("is-active", panel.dataset.pageView === pageId));
    $$('[data-page-link]').forEach(link => {
      const active = link.dataset.pageLink === pageId;
      link.classList.toggle("is-current", active);
      if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
    history.replaceState(null, "", pageId === "inicio" ? location.pathname + location.search : `#${pageId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  document.addEventListener("click", event => {
    const link = event.target.closest("[data-page-link]");
    if (!link) return;
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
  const initialPage = location.hash.slice(1);
  showPage(initialPage && $(`[data-page-view="${initialPage}"]`) ? initialPage : "inicio");

  // Carrusel de fotografías de Sobre Sofi. Cambia estos archivos por tus fotos.
  const aboutSlides = $$(".about-slide");
  let aboutIndex = 0;
  function showAboutSlide(index) {
    if (!aboutSlides.length) return;
    aboutIndex = (index + aboutSlides.length) % aboutSlides.length;
    aboutSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === aboutIndex));
    $("#about-slide-count").textContent = `${aboutIndex + 1} / ${aboutSlides.length}`;
  }
  $("#about-prev").addEventListener("click", () => showAboutSlide(aboutIndex - 1));
  $("#about-next").addEventListener("click", () => showAboutSlide(aboutIndex + 1));

  // Menú móvil.
  const menuToggle = $("#menu-toggle");
  const navMenu = $("#nav-menu");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navMenu.addEventListener("click", event => {
    if (event.target.closest("a")) {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Redes sociales: no mostrar enlaces vacíos.
  const socialLinks = [
    ["floating-whatsapp", SOFISPA_CONFIG.whatsappNumber !== "573000000000" ? `https://wa.me/${SOFISPA_CONFIG.whatsappNumber}` : "#mi-cita", true],
    ["floating-instagram", SOFISPA_CONFIG.instagramUrl || "#contacto", true],
    ["floating-facebook", SOFISPA_CONFIG.facebookUrl || "#contacto", true],
    ["floating-tiktok", SOFISPA_CONFIG.tiktokUrl || "#contacto", true]
  ];

  socialLinks.forEach(([id, url, enabled]) => {
    const link = document.getElementById(id);
    if (enabled) {
      link.href = url;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  // Datos de contacto configurables.
  $("#business-hours").textContent = SOFISPA_CONFIG.businessHours;
  $("#business-address").textContent = SOFISPA_CONFIG.businessAddress;
  if (SOFISPA_CONFIG.mapsUrl) {
    $("#maps-link").href = SOFISPA_CONFIG.mapsUrl;
    $("#maps-link").hidden = false;
  }

  // Año del footer y botón volver arriba.
  $("#current-year").textContent = new Date().getFullYear();
  const backToTop = $("#back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Fecha mínima: hoy.
  const dateInput = $("#preferred-date");
  const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
  dateInput.min = localToday;

  renderCatalog();
  renderCart();
  renderGallery();
  renderReviews();
  renderFAQs();
});
