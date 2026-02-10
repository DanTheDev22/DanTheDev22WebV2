// Services.js
export function initServices() {
    const scrollSection = document.getElementById('services-wrapper');
    const track = document.getElementById('services-track');

    if (!scrollSection || !track) return;

    // Cache these values
    const trackWidth = track.scrollWidth;
    let ticking = false;

    // Horizontal scroll with RAF throttling
    function updateHorizontalScroll() {
        const rect = scrollSection.getBoundingClientRect();
        const viewH = window.innerHeight;
        const sectionH = scrollSection.offsetHeight;
        const offset = -rect.top;

        if (rect.top <= 0 && rect.bottom >= viewH) {
            const availableHeight = sectionH - viewH;
            const percent = Math.max(0, Math.min(1, offset / availableHeight));
            const moveAmount = (trackWidth - window.innerWidth + 100) * percent;
            track.style.transform = `translateX(-${moveAmount}px)`;
        } else if (rect.top > 0) {
            track.style.transform = 'translateX(0px)';
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHorizontalScroll);
            ticking = true;
        }
    }, { passive: true });

    // Magnetic hover effect
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}