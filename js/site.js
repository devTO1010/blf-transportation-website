/* BLF Transportation — shared layout injection + behaviour.
   Each page sets <body data-page="..."> to mark the active nav item.
   Header and footer markup live here so they stay in sync site-wide. */
(function () {
  "use strict";

  var NAV = [
    { key: "about",    href: "about-us.html",    label: "About Us" },
    { key: "culture",  href: "our-culture.html", label: "Our Culture" },
    { key: "services", href: "services.html",    label: "Services" },
    { key: "careers",  href: "careers.html",     label: "Careers" }
  ];

  var page = document.body.getAttribute("data-page") || "";

  function navItems() {
    return NAV.map(function (n) {
      var a = 'class="' + (page === n.key ? "active" : "") + '"';
      return '<li ' + a + '><a href="' + n.href + '">' + n.label + '</a></li>';
    }).join("");
  }

  var ICON = {
    fb: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h4V0h-4a5 5 0 0 0-5 5v3H5v4h3v12h4V12h3l1-4h-4V5a1 1 0 0 1 1-1z"/></svg>',
    ig: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    li: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05C20.5 8.55 21 11 21 14.1V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21H9z"/></svg>',
    phone: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
    mail: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
  };

  var header =
    '<div class="topbar"><div class="container">' +
      '<div class="topbar__social">' +
        '<a href="#" aria-label="Facebook">' + ICON.fb + '</a>' +
        '<a href="#" aria-label="Instagram">' + ICON.ig + '</a>' +
        '<a href="#" aria-label="LinkedIn">' + ICON.li + '</a>' +
      '</div>' +
      '<div class="topbar__contact">' +
        '<a href="tel:+15029570339">' + ICON.phone + ' +1(502) 957-0339</a>' +
        '<a href="mailto:jobs@blftransportation.com">' + ICON.mail + ' jobs@blftransportation.com</a>' +
        '<a href="contact.html" class="topbar__cta">Get a Quote</a>' +
      '</div>' +
    '</div></div>' +
    '<header class="header"><div class="container">' +
      '<a href="index.html" class="logo">' +
        '<img src="assets/blf-logo.svg" alt="BLF Transportation">' +
      '</a>' +
      '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '<nav class="nav"><ul>' +
        navItems() +
        '<li class="' + (page === "contact" ? "active" : "") + '"><a href="contact.html">Contact</a></li>' +
      '</ul></nav>' +
    '</div></header>';

  var footer =
    '<div class="footer-contact"><div class="container"><div class="cols">' +
      '<div><div class="fc-icon">' + ICON.phone.replace(/15"/g,'30"') + '</div><h3>Call Us Now</h3><p><a href="tel:+15029570339" style="color:inherit">+1(502) 957-0339</a></p></div>' +
      '<div><div class="fc-icon">' + ICON.mail.replace(/15"/g,'30"') + '</div><h3>Email Us</h3><p><a href="mailto:jobs@blftransportation.com" style="color:inherit">jobs@blftransportation.com</a></p></div>' +
      '<div><div class="fc-icon">' + ICON.clock + '</div><h3>Opening Hours</h3><p>24/7 365 Days a Year</p></div>' +
    '</div></div></div>' +
    '<div class="footer-bottom">' +
      '<span class="footer-tagline">Where service, safety, and operational culture are part of the same commitment.</span>' +
      '<span>&copy; 2026 BLF Transportation LLC. All rights reserved.</span>' +
      '<a href="privacy-policy.html" class="privacy">Privacy Policy</a></div>';

  var h = document.getElementById("site-header");
  var f = document.getElementById("site-footer");
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;

  // ---- behaviour ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) toggle.addEventListener("click", function () { nav.classList.toggle("open"); });

  document.querySelectorAll(".has-dropdown > a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 900px)").matches) { e.preventDefault(); a.parentElement.classList.toggle("open"); }
    });
  });

  // ---- Form submission --------------------------------------------------
  // To send form submissions for real, set FORM_ENDPOINT below.
  //   • Formspree:  create a form at formspree.io, then paste its endpoint,
  //                 e.g. "https://formspree.io/f/abcdwxyz"
  //   • Web3Forms:  create a free access key at web3forms.com, set FORM_ENDPOINT
  //                 to "https://api.web3forms.com/submit" and put the key in WEB3FORMS_KEY.
  // Leave FORM_ENDPOINT empty to run in demo mode (no data is sent).
  var FORM_ENDPOINT = "https://formspree.io/f/xeeyezor";   // <-- paste your Formspree/Web3Forms endpoint here
  var WEB3FORMS_KEY = "";   // <-- only needed for Web3Forms

  function setStatus(el, msg, type) {
    el.textContent = msg;
    el.className = "form-status show " + type;
  }

  document.querySelectorAll("form[data-blf-form]").forEach(function (form) {
    var status = document.createElement("div");
    status.className = "form-status";
    form.appendChild(status);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var consent = form.querySelector('input[type="checkbox"][required]');
      if (consent && !consent.checked) {
        setStatus(status, "Please agree to the Privacy Policy to continue.", "error");
        return;
      }

      // Demo mode — no endpoint configured yet.
      if (!FORM_ENDPOINT) {
        setStatus(status, "Thanks! (Demo mode — set FORM_ENDPOINT in js/site.js to send for real.)", "ok");
        form.reset();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : "";
      var data = new FormData(form);
      data.append("page", document.title);
      if (WEB3FORMS_KEY) data.append("access_key", WEB3FORMS_KEY);
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus(status, "", "");

      fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { "Accept": "application/json" } })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; });
        })
        .then(function (res) {
          if (res.ok && res.body.success !== false) {
            setStatus(status, "Thanks! Your message has been sent — we'll be in touch shortly.", "ok");
            form.reset();
          } else {
            setStatus(status, (res.body && res.body.message) || "Something went wrong. Please call us at +1(502) 957-0339.", "error");
          }
        })
        .catch(function () {
          setStatus(status, "Network error — please try again, or call us at +1(502) 957-0339.", "error");
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  });
})();
