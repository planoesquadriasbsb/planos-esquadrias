
      // Init Lucide Icons
      lucide.createIcons();

      // 1. Loading screen sequence & entrance animations
      const startAnimations = () => {
          const preloader = document.getElementById('preloader');
          if (preloader && preloader.style.display !== 'none') {
              gsap.to(preloader, {
                  opacity: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  onComplete: () => {
                      preloader.style.display = 'none';
                      initMainEntranceAnimations();
                  }
              });
          } else {
              initMainEntranceAnimations();
          }
      };

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
          setTimeout(startAnimations, 100);
      } else {
          window.addEventListener('load', startAnimations);
      }

     
      // 3. Responsive Header Sticky Effects
      const header = document.getElementById('main-nav');
      if (header) {
          const handleHeaderScroll = (scrollY) => {
              if (scrollY > 50) {
                  header.classList.add('bg-[#070709]/95', 'border-white/15', 'shadow-2xl');
                  header.classList.remove('bg-[#0B0B0E]/80', 'border-white/[0.08]');
              } else {
                  header.classList.remove('bg-[#070709]/95', 'border-white/15', 'shadow-2xl');
                  header.classList.add('bg-[#0B0B0E]/80', 'border-white/[0.08]');
              }
          };

          if (typeof lenis !== 'undefined' && lenis) {
              lenis.on('scroll', (e) => handleHeaderScroll(e.scroll));
          } else {
              window.addEventListener('scroll', () => handleHeaderScroll(window.scrollY));
          }
      }

      // 4. Mobile Drawer Navigation toggle logic
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      let mobileMenuOpen = false;

      if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', () => {
              mobileMenuOpen = !mobileMenuOpen;
              if (mobileMenuOpen) {
                  mobileMenu.classList.remove('translate-x-full');
                  mobileMenuBtn.innerHTML = `<i data-lucide="x" class="w-6 h-6"></i>`;
                  lucide.createIcons();
              } else {
                  mobileMenu.classList.add('translate-x-full');
                  mobileMenuBtn.innerHTML = `<i data-lucide="menu" class="w-6 h-6"></i>`;
                  lucide.createIcons();
              }
          });
      }

      // Close drawer on navigating mobile links
      const mobileLinks = document.querySelectorAll('.mobile-nav-link');
      mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (mobileMenu) mobileMenu.classList.add('translate-x-full');
              mobileMenuOpen = false;
              if (mobileMenuBtn) mobileMenuBtn.innerHTML = `<i data-lucide="menu" class="w-6 h-6"></i>`;
              lucide.createIcons();
          });
      });

      // 5. Entrance sequence for hero zone (runs instantly on load)
      function initMainEntranceAnimations() {
          if (typeof gsap === 'undefined') return;
          const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

          const animEyebrow = document.getElementById('hero-eyebrow');
          const animHeading = document.getElementById('hero-heading');
          const animDivider = document.getElementById('hero-divider');
          const animDesc = document.getElementById('hero-desc');
          const animCtas = document.querySelectorAll('#hero-ctas a');
          const animBadges = document.querySelectorAll('#hero-badges > div');
          const animCards = document.querySelectorAll('#hero-cards > div');

          if (animEyebrow) heroTL.fromTo(animEyebrow, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7 });
          if (animHeading) heroTL.fromTo(animHeading, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
          if (animDivider) heroTL.fromTo(animDivider, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.7, transformOrigin: 'left center' }, '-=0.5');
          if (animDesc) heroTL.fromTo(animDesc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
          if (animCtas.length) heroTL.fromTo(animCtas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, '-=0.4');
          if (animBadges.length) heroTL.fromTo(animBadges, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, '-=0.3');
          if (animCards.length) heroTL.fromTo(animCards, { opacity: 0, x: 35 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.8 }, '-=0.6');
      }

      // 6. Normal scrolling: use IntersectionObserver to gently reveal elements as user scrolls down
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  gsap.fromTo(entry.target,
                      { opacity: 0, y: 30 },
                      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }
                  );
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      revealElements.forEach(el => {
          gsap.set(el, { opacity: 0 });
          revealObserver.observe(el);
      });

      // 7. Interactive Menu Page Turner logic
      let currentMenuPage = 1;
      const totalMenuPages = 3;

      window.switchMenuPage = function(pageNumber) {
          if (pageNumber < 1 || pageNumber > totalMenuPages) return;
          currentMenuPage = pageNumber;

          for (let i = 1; i <= totalMenuPages; i++) {
              const pageEl = document.getElementById(`menu-page-${i}`);
              const tabEl = document.getElementById(`menu-tab-${i}`);
              if (pageEl) {
                  if (i === pageNumber) {
                      pageEl.classList.remove('hidden');
                      gsap.fromTo(pageEl, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
                  } else {
                      pageEl.classList.add('hidden');
                  }
              }
              if (tabEl) {
                  if (i === pageNumber) {
                      tabEl.classList.add('active', 'border-goldPrimary', 'bg-goldPrimary/15', 'text-goldPrimary');
                      tabEl.classList.remove('border-borderGold/20', 'text-textSecondary');
                  } else {
                      tabEl.classList.remove('active', 'border-goldPrimary', 'bg-goldPrimary/15', 'text-goldPrimary');
                      tabEl.classList.add('border-borderGold/20', 'text-textSecondary');
                  }
              }
          }

          // Update indicator
          const indicator = document.getElementById('menu-page-indicator');
          if (indicator) {
              const numerals = ["I", "II", "III"];
              indicator.textContent = `Page ${numerals[pageNumber - 1]} of III`;
          }
      };

      window.turnMenuPage = function(direction) {
          let targetPage = currentMenuPage + direction;
          if (targetPage < 1) targetPage = totalMenuPages;
          if (targetPage > totalMenuPages) targetPage = 1;
          switchMenuPage(targetPage);
      };

      // 8. Gallery Carousel Controls
      const carousel = document.getElementById('gallery-carousel');
      const prevBtn = document.getElementById('carousel-prev');
      const nextBtn = document.getElementById('carousel-next');

      if (carousel && prevBtn && nextBtn) {
          prevBtn.addEventListener('click', () => {
              carousel.scrollBy({ left: -360, behavior: 'smooth' });
          });
          nextBtn.addEventListener('click', () => {
              carousel.scrollBy({ left: 360, behavior: 'smooth' });
          });
      }