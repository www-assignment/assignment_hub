document.addEventListener('DOMContentLoaded', () => {
  // ==================== MOBILE MENU TOGGLE ====================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
  });

  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          nav.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
      });
  });

  // ==================== HERO STATS COUNTER ====================
  const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const stats = document.querySelectorAll('.stat-number');
              stats.forEach(stat => {
                  const target = +stat.getAttribute('data-count');
                  const duration = 2000;
                  const step = target / (duration / 10);
                  let count = 0;

                  const counter = setInterval(() => {
                      count += step;
                      if (count >= target) {
                          clearInterval(counter);
                          count = target;
                      }
                      stat.textContent = Math.floor(count);
                  }, 10);
              });
              statsObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  statsObserver.observe(document.querySelector('.hero-stats'));

  // ==================== SERVICES TABS ====================
  document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
          const tabId = btn.getAttribute('data-tab');
          const tabContent = document.getElementById(tabId);

          document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

          btn.classList.add('active');
          tabContent.classList.add('active');
      });
  });

  // ==================== TESTIMONIALS SLIDER ====================
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  const testimonialContainer = document.querySelector('.testimonials-slider');

  function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
          testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
      });
  }

  document.querySelector('.slider-prev').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
  });

  document.querySelector('.slider-next').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
  });

  testimonialContainer.style.width = `${testimonials.length * 100}%`;
  testimonials.forEach(testimonial => {
      testimonial.style.width = `${100 / testimonials.length}%`;
  });
  showTestimonial(0);

  // ==================== CONTACT FORM (IMPROVED WHATSAPP INTEGRATION) ====================
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.querySelector('input[name="name"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim();
      const service = document.querySelector('select[name="service"]').value.trim();
      const message = document.querySelector('textarea[name="message"]').value.trim();

      // Validation
      if (!name || !email || !service || !message) {
          alert("Please fill in all fields.");
          return;
      }

      // Format message for WhatsApp
      const whatsappMessage = 
          `New Contact Request%0A%0A` +
          `*Name:* ${encodeURIComponent(name)}%0A` +
          `*Email:* ${encodeURIComponent(email)}%0A` +
          `*Service Needed:* ${encodeURIComponent(service)}%0A%0A` +
          `*Message:*%0A${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      const phoneNumber = '2348065443675'; // Replace with your number
      window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
      
      // Optional: Reset form
      contactForm.reset();
  });

  // ==================== FAQ ACCORDION ====================
  document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const isOpen = answer.classList.contains('show');

          document.querySelectorAll('.faq-answer').forEach(ans => {
              ans.classList.remove('show');
              ans.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
          });

          if (!isOpen) {
              answer.classList.add('show');
              question.querySelector('i').style.transform = 'rotate(45deg)';
          }
      });
  });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // ==================== STICKY HEADER ====================
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.sticky-header');
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // ==================== SCROLL ANIMATIONS ====================
  const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = 1;
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate__animated').forEach(element => {
      animateOnScroll.observe(element);
  });
});