"use strict";

const pages = [...document.querySelectorAll(".page")];
const navButtons = [...document.querySelectorAll(".nav-link")];
const pageTriggers = [...document.querySelectorAll(".nav-trigger")];
const statNodes = [...document.querySelectorAll(".stat-node")];
const heroObject = document.getElementById("heroObject");
const ambientCanvas = document.getElementById("ambientCanvas");
const specCard = document.getElementById("specCard");
const hotspots = [...document.querySelectorAll(".hotspot")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const bikeSpecs = {
  wheelset: { title: "Wheelset", text: "Hope Fortus 30 Pro 5 wheels with purple Hope Pro 5 hubs.", tags: ["Hope Fortus 30", "Pro 5", "Purple hubs"] },
  tyres: { title: "Tyres", text: "Schwalbe Magic Mary front and Continental Kryptotal rear.", tags: ["Magic Mary", "Kryptotal", "Grip"] },
  brake: { title: "Rear Brake", text: "Purple Hayes Dominion rear brake.", tags: ["Hayes Dominion", "Rear brake", "Purple"] },
  rotor: { title: "Front Rotor", text: "Purple Hope 200mm front rotor.", tags: ["Hope", "200mm", "Front rotor"] },
  shock: { title: "Shock", text: "Purple RockShox Deluxe Ultimate shock — exact model to confirm later.", tags: ["RockShox", "Deluxe Ultimate", "Purple"] },
  fork: { title: "Fork", text: "RockShox Lyrik Select fork.", tags: ["RockShox", "Lyrik Select", "Control"] },
  cockpit: { title: "Cockpit Details", text: "Purple right brake lever and custom purple top cap.", tags: ["Brake lever", "Top cap", "Colour matched"] },
  finish: { title: "Finishing Details", text: "Purple seat clamp and small colour-matched parts.", tags: ["Seat clamp", "Details", "Purple"] },
  custom: { title: "Custom Parts", text: "Self-chromed crank arms and pedals.", tags: ["Cranks", "Pedals", "Custom finish"] }
};

function setActivePage(target) {
  const nextPage = pages.find((page) => page.dataset.page === target);
  if (!nextPage) return;
  pages.forEach((page) => page.classList.toggle("active", page === nextPage));
  navButtons.forEach((button) => {
    const active = button.dataset.target === target;
    button.classList.toggle("active", active);
    active ? button.setAttribute("aria-current", "page") : button.removeAttribute("aria-current");
  });
  document.title = target === "home" ? "Seb Banham | Portfolio" : `Seb Banham | ${target.charAt(0).toUpperCase() + target.slice(1)}`;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  updateReveals();
}

function bindNavigation() {
  [...navButtons, ...pageTriggers, ...statNodes].forEach((element) => {
    element.addEventListener("click", () => {
      const target = element.dataset.target;
      if (!target) return;
      if (element.classList.contains("stat-node") && window.matchMedia("(hover: none)").matches) {
        const alreadyRevealed = element.classList.contains("revealed");
        statNodes.forEach((node) => node.classList.remove("revealed"));
        if (!alreadyRevealed) {
          element.classList.add("revealed");
          return;
        }
      }
      setActivePage(target);
    });
  });
}

function bindHeroMotion() {
  if (!heroObject || reducedMotion) return;
  window.addEventListener("mousemove", (event) => {
    const rect = heroObject.getBoundingClientRect();
    const objectX = rect.left + rect.width / 2;
    const objectY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - objectX) / rect.width;
    const deltaY = (event.clientY - objectY) / rect.height;
    const rotateY = Math.max(-10, Math.min(10, deltaX * 10));
    const rotateX = Math.max(-10, Math.min(10, -deltaY * 10));
    const moveX = Math.max(-10, Math.min(10, deltaX * 8));
    const moveY = Math.max(-10, Math.min(10, deltaY * 8));
    heroObject.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${moveX}px, ${moveY}px, 0)`;
  });
  window.addEventListener("mouseleave", () => {
    heroObject.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
  });
}

function buildSpecTags(tags) { return tags.map((tag) => `<span>${tag}</span>`).join(""); }
function setBikeSpec(key) {
  const spec = bikeSpecs[key];
  if (!spec || !specCard) return;
  specCard.innerHTML = `<span class="eyebrow">YT Jeffsy</span><h3>${spec.title}</h3><p>${spec.text}</p><div class="tag-row">${buildSpecTags(spec.tags)}</div>`;
}
function bindBikeHotspots() {
  hotspots.forEach((hotspot) => {
    const specKey = hotspot.dataset.spec;
    hotspot.addEventListener("mouseenter", () => setBikeSpec(specKey));
    hotspot.addEventListener("focus", () => setBikeSpec(specKey));
    hotspot.addEventListener("click", () => {
      hotspots.forEach((item) => item.classList.remove("active"));
      hotspot.classList.add("active");
      setBikeSpec(specKey);
    });
  });
}

function insertSebsWebsProject() {
  const projectPage = document.querySelector('[data-page="projects"]');
  const areteProject = projectPage?.querySelector(".featured-project");
  if (!projectPage || !areteProject || projectPage.querySelector('[data-project="sebswebs"]')) return;
  const sebsWebsProject = document.createElement("article");
  sebsWebsProject.className = "featured-project reveal";
  sebsWebsProject.dataset.project = "sebswebs";
  sebsWebsProject.innerHTML = `
    <div><p class="eyebrow">New venture</p><h3>SebsWebs</h3><p class="card-subtitle">Local Business Websites</p><p>Developing a focused web design project to create clean, professional and affordable websites for local companies. SebsWebs is built around helping small businesses present themselves clearly online, attract customers and grow with a reliable digital presence.</p><div class="tag-row"><span>Web Design</span><span>Local Business</span><span>Responsive Sites</span><span>Brand Presence</span><span>Client Work</span></div><div class="button-row"><a class="primary-action" href="https://sebswebs.co.uk" target="_blank" rel="noopener">Visit SebsWebs</a></div></div>
    <div class="project-preview" style="height:clamp(260px, 30vw, 360px);min-height:0;align-self:start;"><img src="https://raw.githubusercontent.com/sebsebeats/sebswebs/main/screenshot-logo-mobile.png" alt="SebsWebs affordable websites for local businesses preview" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';" /><span class="image-placeholder">SebsWebs Preview</span></div>
  `;
  areteProject.insertAdjacentElement("afterend", sebsWebsProject);
}

function updateReveals() {
  const activePage = document.querySelector(".page.active");
  if (!activePage) return;
  const reveals = [...activePage.querySelectorAll(".reveal")];
  if (!("IntersectionObserver" in window) || reducedMotion) {
    reveals.forEach((item) => item.classList.add("visible"));
    return;
  }
  reveals.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) item.classList.add("visible");
  });
}
function bindRevealObserver() {
  if (!("IntersectionObserver" in window) || reducedMotion) {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

function startAmbientCanvas() {
  if (!ambientCanvas || reducedMotion) return;
  const ctx = ambientCanvas.getContext("2d");
  if (!ctx) return;
  let width = 0, height = 0, particles = [];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    ambientCanvas.width = Math.floor(width * dpr); ambientCanvas.height = Math.floor(height * dpr);
    ambientCanvas.style.width = `${width}px`; ambientCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(80, Math.max(36, Math.floor(width / 18)));
    particles = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22, radius: Math.random() * 1.8 + 0.4, alpha: Math.random() * 0.48 + 0.08 }));
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = width + 20; if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20; if (p.y > height + 20) p.y = -20;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = `rgba(124, 200, 255, ${p.alpha})`; ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j], dx = a.x - b.x, dy = a.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 118) { const opacity = (1 - dist / 118) * 0.09; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(124, 200, 255, ${opacity})`; ctx.lineWidth = 1; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  resize(); draw(); window.addEventListener("resize", resize);
}

function enableCardTilt() {
  if (reducedMotion) return;
  const cards = [...document.querySelectorAll(".project-card, .glass-panel, .contact-card, .achievement-card, .portal-card, .experience-card, .gym-feature")];
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      card.style.transform = `translateY(-5px) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg)`;
    });
    card.addEventListener("mouseleave", () => card.removeAttribute("style"));
  });
}


const emailServices = [
  { key: "gmail", label: "Gmail", detail: "Google Mail" },
  { key: "outlook", label: "Outlook", detail: "Microsoft" },
  { key: "icloud", label: "iCloud", detail: "Apple Mail" },
  { key: "yahoo", label: "Yahoo", detail: "Yahoo Mail" }
];

let activeEmailTrigger = null;
let emailChoicePopover = null;

function encodeEmailValue(value) { return encodeURIComponent(value || ""); }

function buildEmailUrl(service, to, subject, body) {
  const encodedTo = encodeEmailValue(to);
  const encodedSubject = encodeEmailValue(subject);
  const encodedBody = encodeEmailValue(body);
  if (service === "gmail") return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
  if (service === "outlook") return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`;
  if (service === "yahoo") return `https://compose.mail.yahoo.com/?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`;
  return `mailto:${to || ""}?subject=${encodedSubject}&body=${encodedBody}`;
}

function ensureEmailChoicePopover() {
  if (emailChoicePopover) return emailChoicePopover;
  emailChoicePopover = document.createElement("div");
  emailChoicePopover.className = "email-choice-popover";
  emailChoicePopover.setAttribute("role", "dialog");
  emailChoicePopover.setAttribute("aria-modal", "false");
  emailChoicePopover.setAttribute("aria-label", "Choose email service");
  emailChoicePopover.setAttribute("aria-hidden", "true");
  emailChoicePopover.innerHTML = `
    <div class="email-choice-title">Choose email service</div>
    <div class="email-choice-grid">
      ${emailServices.map((service) => `<button type="button" class="email-choice-option" data-email-service="${service.key}"><strong>${service.label}</strong><span>${service.detail}</span></button>`).join("")}
    </div>
  `;
  document.body.appendChild(emailChoicePopover);
  emailChoicePopover.addEventListener("click", (event) => {
    const option = event.target.closest("[data-email-service]");
    if (!option || !activeEmailTrigger) return;
    const service = option.dataset.emailService;
    const url = buildEmailUrl(service, activeEmailTrigger.dataset.emailTo, activeEmailTrigger.dataset.emailSubject, activeEmailTrigger.dataset.emailBody);
    closeEmailChoicePopover();
    if (service === "icloud") {
      window.location.href = url;
      return;
    }
    window.open(url, "_blank", "noopener");
  });
  return emailChoicePopover;
}

function positionEmailChoicePopover(trigger) {
  const popover = ensureEmailChoicePopover();
  const rect = trigger.getBoundingClientRect();
  popover.classList.remove("above");
  popover.style.left = "0px";
  popover.style.top = "0px";
  const popoverRect = popover.getBoundingClientRect();
  const gap = 13;
  const margin = 8;
  const spaceBelow = window.innerHeight - rect.bottom;
  const placeAbove = spaceBelow < popoverRect.height + 26 && rect.top > popoverRect.height + 26;
  const top = placeAbove ? rect.top - popoverRect.height - gap : rect.bottom + gap;
  const left = Math.min(window.innerWidth - popoverRect.width - margin, Math.max(margin, rect.left + rect.width / 2 - popoverRect.width / 2));
  popover.style.top = `${Math.round(top)}px`;
  popover.style.left = `${Math.round(left)}px`;
  popover.style.setProperty("--bubble-arrow-left", `${Math.round(rect.left + rect.width / 2 - left)}px`);
  popover.classList.toggle("above", placeAbove);
}

function openEmailChoicePopover(trigger) {
  activeEmailTrigger = trigger;
  const popover = ensureEmailChoicePopover();
  popover.classList.add("active");
  popover.setAttribute("aria-hidden", "false");
  positionEmailChoicePopover(trigger);
  const firstOption = popover.querySelector("button");
  if (firstOption) firstOption.focus({ preventScroll: true });
}

function closeEmailChoicePopover() {
  if (!emailChoicePopover) return;
  emailChoicePopover.classList.remove("active", "above");
  emailChoicePopover.setAttribute("aria-hidden", "true");
  activeEmailTrigger = null;
}

function bindEmailChoices() {
  document.querySelectorAll(".email-choice-trigger[data-email-to]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (activeEmailTrigger === trigger && emailChoicePopover?.classList.contains("active")) {
        closeEmailChoicePopover();
        return;
      }
      openEmailChoicePopover(trigger);
    });
  });
  document.addEventListener("click", (event) => {
    if (!emailChoicePopover?.classList.contains("active")) return;
    if (emailChoicePopover.contains(event.target) || event.target.closest(".email-choice-trigger")) return;
    closeEmailChoicePopover();
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeEmailChoicePopover(); });
  window.addEventListener("resize", closeEmailChoicePopover);
  window.addEventListener("scroll", closeEmailChoicePopover, { passive: true });
}
function bindKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const activeElement = document.activeElement;
    const isTyping = activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName);
    if (isTyping) return;
    const currentIndex = pages.findIndex((page) => page.classList.contains("active"));
    if (event.key === "ArrowRight") setActivePage(pages[(currentIndex + 1) % pages.length].dataset.page);
    if (event.key === "ArrowLeft") setActivePage(pages[(currentIndex - 1 + pages.length) % pages.length].dataset.page);
  });
}

function init() {
  insertSebsWebsProject(); bindNavigation(); bindHeroMotion(); bindBikeHotspots(); bindRevealObserver(); bindEmailChoices(); bindKeyboardShortcuts(); startAmbientCanvas(); enableCardTilt(); updateReveals();
}
document.addEventListener("DOMContentLoaded", init);
