document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a'); // Seleccionar todos los enlaces del nav
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            card.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease-in-out';
            });
            card.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
                img.style.transition = 'transform 0.3s ease-in-out';
            });
        }
    });

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-label', 'Cerrar menú');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });
    }

    // Cerrar el menú al hacer clic en un enlace (para SPA-like behavior)
    if (navLinks && navbar) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-label', 'Abrir menú');
                }
            });
        });
    }

    // Opcional: Active link highlighting basado en scroll (más complejo)
    // Esto es una simplificación. Una solución robusta necesita calcular offsets.
    const sections = document.querySelectorAll('main section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Un poco de offset para el header
            let sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
         // Manejar caso de estar arriba de todo y el "Inicio"
        if (scrollY < sections[0].offsetTop - 100) {
            document.querySelector('.nav-links a[href="#hero"]').classList.add('active');
        }
    }
    // Ejecutar una vez al cargar para la sección visible inicial
    navHighlighter();

});