document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header'); // Para el scroll suave

    // Toggle menu para móvil
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open'); // Para animar el icono del hamburger
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

    // Desplazamiento suave personalizado (más fluido que scrollIntoView)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();

            // Calcula la posición destino considerando el header sticky
            const headerOffset = document.querySelector('.main-header').offsetHeight;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset + 1;

            smoothScrollTo(offsetPosition, 900); // 900ms para mayor fluidez

            // Cierra el menú móvil si está abierto después de hacer clic en un enlace
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
    });

    // Función de scroll suave personalizada (easeInOutCubic)
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

    // Efecto: Cambia el fondo del header al hacer scroll (como Wix)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Si el scroll es mayor a 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});