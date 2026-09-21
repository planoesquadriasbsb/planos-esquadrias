
          document.addEventListener('DOMContentLoaded', function() {
            const sliderContainer = document.getElementById('testimonial-slider-aura-empkn7xpxbx1gepe');
            if (!sliderContainer) return;
            const slides = sliderContainer.querySelectorAll('.testimonial-slide-item');
            if(slides.length <= 1) return;
            let currentSlide = 0;

            setInterval(function() {
              slides[currentSlide].classList.remove('opacity-100', 'z-10');
              slides[currentSlide].classList.add('opacity-0', 'z-0');
              
              currentSlide = (currentSlide + 1) % slides.length;
              
              slides[currentSlide].classList.remove('opacity-0', 'z-0');
              slides[currentSlide].classList.add('opacity-100', 'z-10');
            }, 4000);
          });
        