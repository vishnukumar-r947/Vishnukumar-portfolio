/**
 * Main Application Logic for Vishnukumar R Portfolio
 * ----------------------------------------------------
 * Handles:
 * - Real profile image loading for Hero and Navbar
 * - Theme toggling (Light/Dark) with localStorage persistence
 * - 3D card tilt & hover interactions
 * - ScrollSpy & floating navigation
 * - Mobile menu drawer
 * - Interactive contact form handling (Formspree/EmailJS)
 * - Copy to clipboard & toast alerts
 * - Direct resume download handling
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initProfileImages();
  initNavbarScrollSpy();
  initMobileMenu();
  initCard3DTilt();
  initContactForm();
  initCopyButtons();
  initResumeButtons();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light-First Default)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const savedTheme = localStorage.getItem("vishnu_portfolio_theme") || "light";

  setTheme(savedTheme);

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("vishnu_portfolio_theme", theme);

  if (window.portfolio3D && typeof window.portfolio3D.updateTheme === "function") {
    window.portfolio3D.updateTheme();
  }
}

/* --------------------------------------------------------------------------
   2. Profile Image Handler (Hero Frame + Navbar Brand Avatar)
   -------------------------------------------------------------------------- */
function initProfileImages() {
  const heroImg = document.getElementById("hero-profile-img");
  const navImg = document.getElementById("nav-profile-img");

  // Candidates for actual profile image across environments
  const candidatePaths = [
    "/assets/profile.jpg",
    "assets/profile.jpg",
    "public/assets/profile.jpg",
    "/public/assets/profile.jpg",
    "/assets/profile.jpeg",
    "assets/profile.jpeg",
    "public/assets/profile.jpeg"
  ];

  function tryLoadImage(paths, callback) {
    if (!paths.length) {
      callback("/assets/profile.jpg"); // default fallback
      return;
    }
    const currentPath = paths[0];
    const testImg = new Image();
    testImg.onload = () => callback(currentPath);
    testImg.onerror = () => tryLoadImage(paths.slice(1), callback);
    testImg.src = currentPath;
  }

  tryLoadImage(candidatePaths, (resolvedPath) => {
    if (heroImg) heroImg.src = resolvedPath;
    if (navImg) navImg.src = resolvedPath;
  });
}

/* --------------------------------------------------------------------------
   3. Navbar ScrollSpy & Floating Effect
   -------------------------------------------------------------------------- */
function initNavbarScrollSpy() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 40) {
      navbar?.classList.add("navbar-scrolled");
    } else {
      navbar?.classList.remove("navbar-scrolled");
    }

    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    drawer.classList.toggle("open");
    const isOpen = drawer.classList.contains("open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* --------------------------------------------------------------------------
   5. Interactive 3D Card Tilt Effects
   -------------------------------------------------------------------------- */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll(".project-card, .glass-card-interactive, .profile-frame-container");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || "ontouchstart" in window) {
    return;
  }

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* --------------------------------------------------------------------------
   6. Functional Contact Form with Validation & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusBox = document.getElementById("form-status-box");
  const submitBtn = document.getElementById("form-submit-btn");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showFormStatus("Please fill out all required fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormStatus("Please enter a valid email address.", "error");
      return;
    }

    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner"></span> <span>Sending...</span>`;
    hideFormStatus();

    try {
      const config = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.contactService) || {};
      let isSuccess = false;

      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      isSuccess = response.ok;
      if (isSuccess) {
        showFormStatus("Message sent successfully!", "success");
        form.reset();
        showToast("✓ Message sent successfully!");
      } else {
        showFormStatus("Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showFormStatus("Something went wrong. Please try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });

  function showFormStatus(msg, type) {
    if (!statusBox) return;
    statusBox.className = `form-status ${type}`;
    statusBox.innerHTML = `
      <span>${type === "success" ? "✓" : "⚠️"}</span>
      <span>${msg}</span>
    `;
    statusBox.style.display = "flex";
  }

  function hideFormStatus() {
    if (!statusBox) return;
    statusBox.style.display = "none";
  }
}

/* --------------------------------------------------------------------------
   7. Copy to Clipboard Utility
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll(".copy-btn");

  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast(`Copied: ${text}`);
  }
}

/* --------------------------------------------------------------------------
   8. Resume Button Actions
   -------------------------------------------------------------------------- */
function initResumeButtons() {
  const resumeBtns = document.querySelectorAll(".resume-download-btn");

  resumeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const candidatePaths = [
        "/assets/resume.pdf",
        "assets/resume.pdf",
        "public/assets/resume.pdf",
        "/public/assets/resume.pdf"
      ];

      function tryDownload(paths) {
        if (!paths.length) {
          window.open("/assets/resume.pdf", "_blank");
          return;
        }
        const currentPath = paths[0];
        fetch(currentPath, { method: "HEAD" })
          .then((res) => {
            if (res.ok) {
              const a = document.createElement("a");
              a.href = currentPath;
              a.download = "resume.pdf";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              showToast("Downloading resume.pdf...");
            } else {
              tryDownload(paths.slice(1));
            }
          })
          .catch(() => {
            tryDownload(paths.slice(1));
          });
      }

      tryDownload(candidatePaths);
    });
  });
}

/* --------------------------------------------------------------------------
   9. Toast Alert Utility
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector(".toast-notice");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
