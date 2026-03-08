document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    // Cambiar estilo del navbar al hacer scroll (de transparente a opaco)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.add('bg-transparent', 'py-6');
            navbar.classList.remove('py-4');
        }
    });

    // Toggle menú móvil
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Animamos clase hidden
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú móvil al clickear un enlace (para experiencia Single Page)
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
});

// Lightbox Funcionalidad
document.addEventListener('DOMContentLoaded', () => {
    // 1. Crear el HTML del Modal Dinámicamente
    const lightboxHTML = `
        <div id="lightbox" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <button id="lightbox-close" class="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-white/10 rounded-full p-2" aria-label="Cerrar">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img id="lightbox-img" src="" alt="Imagen Ampliada" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl">
        </div>
    `;
    
    // Lo anexamos al body si existen imágenes agrupadas
    const galleryItems = document.querySelectorAll('.group img');
    if(galleryItems.length > 0) {
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if(!lightbox) return;

    // 2. Event Listeners para cada imagen
    galleryItems.forEach(img => {
        // Ignorar íconos o fotos de perfil que no sean de galería
        if(img.closest('.columns-1') || window.location.pathname.includes('.html')) {
            img.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Parar el scroll
            });
        }
    });

    // 3. Cerrar Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => lightboxImg.src = '', 300); // limpiar src tras la animación
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
