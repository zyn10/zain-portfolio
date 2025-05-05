document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#4F46E5",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#4F46E5",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      console.log({ name, email, message });

      // Show success message
      alert("Thank you for your message! I will get back to you soon.");

      // Reset form
      this.reset();
    });
  }

  // ======================
  // PHYSICS INTERACTIONS
  // ======================

  // Magnetic cursor effect
  const magneticArea = document.querySelector(".magnetic-area");
  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    magneticArea.style.left = `${clientX}px`;
    magneticArea.style.top = `${clientY}px`;
    magneticArea.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    magneticArea.style.opacity = "0";
  });

  // Physics-based element interactions
  const physicsElements = document.querySelectorAll(
    "[data-physics], .btn, .project-card, .about-image, .highlight"
  );

  physicsElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const { offsetX, offsetY, target } = e;
      const { offsetWidth, offsetHeight } = target;

      // Calculate position relative to element center
      const xPos = (offsetX - offsetWidth / 2) / 20;
      const yPos = (offsetY - offsetHeight / 2) / 20;

      // Apply different effects based on element type
      if (element.classList.contains("project-card")) {
        // 3D tilt effect for cards
        gsap.to(element, {
          duration: 0.5,
          rotateX: -yPos * 0.5,
          rotateY: xPos * 0.5,
          ease: "power2.out",
        });

        // Shadow effect
        const shadowX = xPos * 2;
        const shadowY = yPos * 2;
        element.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.1)`;
      } else if (element.classList.contains("btn")) {
        // Magnetic button effect
        gsap.to(element, {
          duration: 0.3,
          x: xPos * 0.5,
          y: yPos * 0.5,
          ease: "power2.out",
        });
      } else if (element.classList.contains("about-image")) {
        // Subtle parallax effect for image
        const img = element.querySelector("img");
        gsap.to(img, {
          duration: 0.5,
          x: xPos * 0.3,
          y: yPos * 0.3,
          ease: "power2.out",
        });
      } else if (element.classList.contains("highlight")) {
        // Wavy text effect
        gsap.to(element, {
          duration: 0.3,
          y: -yPos * 0.5,
          ease: "power2.out",
        });
      } else {
        // Default magnetic effect
        gsap.to(element, {
          duration: 0.3,
          x: xPos,
          y: yPos,
          ease: "power2.out",
        });
      }
    });

    element.addEventListener("mouseleave", () => {
      // Reset all transformations
      gsap.to(element, {
        duration: 0.7,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        ease: "elastic.out(1, 0.5)",
      });

      // Reset image position
      if (element.classList.contains("about-image")) {
        const img = element.querySelector("img");
        gsap.to(img, {
          duration: 0.7,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.5)",
        });
      }
    });
  });

  // Floating animation for hero elements
  const heroElements = document.querySelectorAll(".hero-title .title-line");
  heroElements.forEach((line, index) => {
    gsap.to(line, {
      duration: 3 + index,
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // Physics-based scroll animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".about-image, .project-card, .step"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        gsap.to(element, {
          duration: 0.6,
          opacity: 1,
          y: 0,
          ease: "back.out(1.2)",
        });
      }
    });
  };

  // Set initial state for animated elements
  gsap.set(".about-image, .project-card, .step", {
    opacity: 0,
    y: 40,
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load

  // Physics-based hover effect for nav links
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        duration: 0.3,
        y: -3,
        ease: "power2.out",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        duration: 0.5,
        y: 0,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });
});
