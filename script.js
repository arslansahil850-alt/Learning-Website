
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const menu = nav?.querySelector(":scope > div");
  const menuToggle = nav?.querySelector(".menu-toggle");
  const navLinks = menu?.querySelectorAll("a") || [];
  const announcement = document.querySelector(".top-bar");
  const announcementClose = document.querySelector(".announcement-close");
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (menu && menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("menu-open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("menu-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && menu.classList.contains("menu-open")) {
        menu.classList.remove("menu-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("menu-open")) {
        menu.classList.remove("menu-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        menu.classList.remove("menu-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  if (announcement && announcementClose) {
    announcementClose.addEventListener("click", () => {
      announcement.remove();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });

        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }

        target.focus({ preventScroll: true });
      }
    });
  });

  // Subject Modal Controls
  const exploreButtons = document.querySelectorAll(".explore-btn");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal-close");

  exploreButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute("data-target");
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add("active");
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.classList.remove("active");
      }
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => modal.classList.remove("active"));
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll(
    ".course-explore-btn, .explore-btn"
  );

  const modals = document.querySelectorAll(".modal");

  openButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      const targetId = button.dataset.target;
      const modal = document.getElementById(targetId);

      if (modal) {
        modals.forEach(item => item.classList.remove("active"));
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  modals.forEach(modal => {
    const closeButton = modal.querySelector(".modal-close");

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      modals.forEach(modal => modal.classList.remove("active"));
      document.body.style.overflow = "";
    }
  });
  document.querySelectorAll(".modal-action").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");

      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
  document.querySelectorAll("#articles article a").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      const article = button.closest("article");
      const title = article.querySelector("h3").textContent;

      const descriptions = {
        "How to Start Learning Web Development": [
          "Learn HTML to structure webpages.",
          "Learn CSS to style websites and create responsive layouts.",
          "Learn JavaScript to add interactive features.",
          "Build small projects to practice your skills."
        ],
        "How to Develop Better Study Habits": [
          "Create a realistic study timetable.",
          "Set clear and achievable learning goals.",
          "Practice recalling information without looking at your notes.",
          "Revise topics regularly and take breaks."
        ],
        "Why Learning New Skills Matters": [
          "Expand your knowledge and understanding.",
          "Improve your problem-solving abilities.",
          "Explore future educational and career opportunities.",
          "Build confidence through consistent practice."
        ]
      };

      let modal = document.createElement("div");
      modal.className = "modal active";

      const content = document.createElement("div");
      content.className = "modal-content";

      const closeButton = document.createElement("button");
      closeButton.className = "modal-close";
      closeButton.type = "button";
      closeButton.setAttribute("aria-label", "Close");
      closeButton.innerHTML = "&times;";

      const heading = document.createElement("h2");
      heading.textContent = title;

      content.append(closeButton, heading);

      (descriptions[title] || []).forEach(description => {
        const paragraph = document.createElement("p");
        paragraph.textContent = description;
        content.appendChild(paragraph);
      });

      modal.appendChild(content);
      document.body.appendChild(modal);
      document.body.style.overflow = "hidden";

      function closeModal() {
        modal.remove();
        document.body.style.overflow = "";
      }

      closeButton.addEventListener("click", closeModal);

      modal.addEventListener("click", event => {
        if (event.target === modal) {
          closeModal();
        }
      });

      const handleEscape = event => {
        if (event.key === "Escape" && document.body.contains(modal)) {
          closeModal();
          document.removeEventListener("keydown", handleEscape);
        }
      };

      document.addEventListener("keydown", handleEscape);
    });
  });
  const contactForm = document.querySelector('#contact form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let notice = document.querySelector('.form-success-message');

      if (!notice) {
        notice = document.createElement('p');
        notice.className = 'form-success-message';
        notice.setAttribute('role', 'status');
        notice.style.cssText = `
        margin-top: 15px;
        padding: 14px;
        border-radius: 8px;
        background: #d1fae5;
        color: #065f46;
        font-weight: 600;
        text-align: center;
      `;

        contactForm.appendChild(notice);
      }

      notice.textContent = 'Message sent! Please wait; we will contact you soon.';
      notice.style.display = 'block';

      contactForm.reset();

      setTimeout(() => {
        notice.style.display = 'none';
      }, 5000);
    });
  }
});