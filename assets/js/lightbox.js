function openLightbox(src) {
            const lightbox = document.getElementById('image-lightbox');
            const img = document.getElementById('lightbox-img');
            img.src = src;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            // Small delay to allow display block to apply before transition
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                img.classList.remove('scale-95');
                img.classList.add('scale-100');
            }, 10);
        }

        function closeLightbox() {
            const lightbox = document.getElementById('image-lightbox');
            const img = document.getElementById('lightbox-img');
            lightbox.classList.add('opacity-0');
            img.classList.remove('scale-100');
            img.classList.add('scale-95');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
            }, 300);
        }

        // Close on background click
        document.getElementById('image-lightbox').addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });