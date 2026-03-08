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
