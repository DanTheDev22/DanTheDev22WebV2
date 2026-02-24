// Header.js
export function initNavbar() {
    const navbar = document.getElementById('navbar');
    const logoElement = document.getElementById('glitch-logo');
    const mobileMenuBtn = document.querySelector('.navbar__mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                navbar?.classList.toggle('scrolled', window.scrollY > 20);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Glitch effect
    const glitchInterval = setInterval(() => {
        logoElement?.classList.add('glitch-active');
        setTimeout(() => logoElement?.classList.remove('glitch-active'), 400);
    }, 5000);

    // Cleanup
    return () => clearInterval(glitchInterval);
}