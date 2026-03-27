/* =============================================
       MODULE: initNavbar
       Handles navbar shrink and transparency on scroll.
    ============================================= */
    function initNavbar() {
      const navbar = document.getElementById('navbar');

      const onScroll = () => {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // Run on load in case page is already scrolled
    }

    /* =============================================
       MODULE: initScrollAnimation
       Uses IntersectionObserver to reveal elements.
    ============================================= */
    function initScrollAnimation() {
      const revealEls = document.querySelectorAll('.reveal');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Animate timeline line when curriculum section enters view
              if (entry.target.classList.contains('curriculum-header')) {
                setTimeout(() => {
                  const line = document.getElementById('timelineLine');
                  if (line) line.classList.add('drawn');
                }, 400);
              }
              observer.unobserve(entry.target); // Animate only once
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach((el) => observer.observe(el));
    }

    /* =============================================
       MODULE: initCounter
       Animated number counters with easing.
    ============================================= */
    function initCounter() {
      const counters = [
        { id: 'counter-students', target: 3000, suffix: '+', decimals: 0 },
        { id: 'counter-rating',   target: 4.9,  suffix: '',  decimals: 1 },
        { id: 'counter-jobs',     target: 95,   suffix: '%', decimals: 0 },
      ];

      let started = false;

      const heroSection = document.getElementById('hero');

      const startCounting = () => {
        if (started) return;
        started = true;

        counters.forEach(({ id, target, suffix, decimals }) => {
          const el = document.getElementById(id);
          if (!el) return;

          const duration = 2000; // ms
          const startTime = performance.now();

          const easeOut = (t) => 1 - Math.pow(1 - t, 3);

          const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = easeOut(progress) * target;

            el.textContent = value.toFixed(decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target.toFixed(decimals) + suffix;
            }
          };

          requestAnimationFrame(update);
        });
      };

      // Start when hero is visible (almost immediately on load)
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startCounting();
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      if (heroSection) observer.observe(heroSection);
    }

    /* =============================================
       MODULE: initSlider
       Auto-rotating testimonial carousel with dots.
    ============================================= */
    function initSlider() {
      const track    = document.getElementById('testimonialTrack');
      const dotsWrap = document.getElementById('testimonialDots');
      if (!track || !dotsWrap) return;

      const slides = track.querySelectorAll('.testimonial-slide');
      const dots   = dotsWrap.querySelectorAll('.dot');
      let current  = 0;
      let timer    = null;

      const showSlide = (index) => {
        // Hide current
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        dots[current].setAttribute('aria-selected', 'false');

        // Show next
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-selected', 'true');
      };

      const startAutoplay = () => {
        stopAutoplay();
        timer = setInterval(() => {
          showSlide(current + 1);
        }, 5000);
      };

      const stopAutoplay = () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      };

      // Dot click handlers
      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          showSlide(parseInt(dot.dataset.index, 10));
          startAutoplay(); // Reset timer on manual nav
        });
      });

      // Pause on hover
      track.addEventListener('mouseenter', stopAutoplay);
      track.addEventListener('mouseleave', startAutoplay);

      // Kick off
      startAutoplay();
    }



    /* =============================================
       MODULE: initMobileMenu
       Handles mobile hamburger and slide-in menu.
    ============================================= */
    function initMobileMenu() {
      const hamburger = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      const overlay    = document.getElementById('menuOverlay');

      if (!hamburger || !mobileMenu) return;

      const open = () => {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      };

      const close = () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      };

      const toggle = () => {
        mobileMenu.classList.contains('open') ? close() : open();
      };

      hamburger.addEventListener('click', toggle);
      overlay.addEventListener('click', close);

      // Close when a nav link is clicked
      mobileMenu.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', close);
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      });
    }

    /* =============================================
       INIT — Run all modules on DOMContentLoaded
    ============================================= */
    /* =============================================
       MODULE: initPhoneCarousel
       Auto-cycles the phone mockup app screens.
    ============================================= */
    function initPhoneCarousel() {
      const carousel = document.getElementById('phoneCarousel');
      if (!carousel) return;
      const dots = [
        document.getElementById('pdot0'),
        document.getElementById('pdot1'),
        document.getElementById('pdot2'),
      ];
      const slides = carousel.querySelectorAll('.phone-app-slide');
      let current = 0;
      const slideNames = ['slide-1','slide-2','slide-3'];

      const goTo = (idx) => {
        carousel.classList.remove('slide-1','slide-2','slide-3');
        carousel.classList.add(slideNames[idx]);
        dots.forEach((d,i) => d.classList.toggle('active', i === idx));
        current = idx;
      };

      setInterval(() => goTo((current + 1) % 3), 3200);
    }

    document.addEventListener('DOMContentLoaded', () => {
      initNavbar();
      initScrollAnimation();
      initCounter();
      initSlider();
      initMobileMenu();
      initPhoneCarousel();
    });