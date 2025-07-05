document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');

    // Toggle menu para móvil
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace (para móvil)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
    });

    // Desplazamiento suave personalizado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            const headerOffset = header ? header.offsetHeight : 0; 
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset + 1;

            smoothScrollTo(offsetPosition, 900);

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
    });

    // Función de scroll suave personalizada
    function smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            window.scrollTo(0, startY + distance * ease);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        requestAnimationFrame(animation);
    }

    // Efecto: Cambia el fondo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Toggable "Que nos diferencia" section
    const toggleDiferenciaBtn = document.getElementById('toggleDiferenciaBtn');
    const diferenciaContent = document.getElementById('diferenciaContent');
    const aboutSection = document.getElementById('quienes-somos');

    if (toggleDiferenciaBtn && diferenciaContent && aboutSection) {
        toggleDiferenciaBtn.addEventListener('click', () => {
            const isOpening = !diferenciaContent.classList.contains('open');
            diferenciaContent.classList.toggle('open');
            aboutSection.classList.toggle('expanded');
            toggleDiferenciaBtn.textContent = isOpening ? 'Cerrar' : '¿Qué nos diferencia?';
        });
    }

    // Toggable "Gestion de Portafolios" section
    const toggleGestionBtn = document.getElementById('toggleGestionBtn');
    const gestionContent = document.getElementById('gestionContent');

    if (toggleGestionBtn && gestionContent) {
        toggleGestionBtn.addEventListener('click', () => {
            const isOpening = !gestionContent.classList.contains('open');
            gestionContent.classList.toggle('open');
            // UPDATED: Changed the reset text
            toggleGestionBtn.textContent = isOpening ? 'Leer menos' : '¿Cómo se realiza la gestión?';
        });
    }


    // Animate on Scroll using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in-element');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});