export function initServices() {
    const scrollSection = document.getElementById('services-wrapper');
    const track = document.getElementById('services-track');
    if (!scrollSection || !track) return;

    let currentX = 0;
    let targetX = 0;

    function getTrackOverflow() {
        return track.scrollWidth - window.innerWidth;
    }

    // Make the section tall enough to scroll the full track width
    function setSectionHeight() {
        const overflow = getTrackOverflow();
        scrollSection.style.height = `${window.innerHeight + overflow}px`;
    }

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function animate() {
        if (Math.abs(targetX - currentX) > 0.05) {
            currentX = lerp(currentX, targetX, 0.1);
        } else {
            currentX = targetX;
        }
        track.style.transform = `translateX(-${currentX}px) translateZ(0)`;
        requestAnimationFrame(animate);
    }

    animate();

    function updateHorizontalScroll() {
        const rect = scrollSection.getBoundingClientRect();
        const viewH = window.innerHeight;
        const sectionH = scrollSection.offsetHeight;
        const offset = -rect.top;

        if (rect.top <= 0 && rect.bottom >= viewH) {
            const availableHeight = sectionH - viewH;
            const percent = Math.max(0, Math.min(1, offset / availableHeight));
            targetX = getTrackOverflow() * percent;
        } else if (rect.top > 0) {
            targetX = 0;
        }
    }

    // Init height, then update on resize
    setSectionHeight();

    window.addEventListener('scroll', updateHorizontalScroll, { passive: true });

    window.addEventListener('resize', () => {
        setSectionHeight();
        updateHorizontalScroll();
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
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateZ(0)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
        });
    });
}