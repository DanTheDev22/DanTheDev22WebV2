// AboutCounters.js
export function initAboutCounters() {
    const aboutSection = document.getElementById('about-section');
    if (!aboutSection) return;

    let hasCounted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                animateCounter('exp-counter', 0, 2, 1000);
                animateCounter('tech-mastered-counter', 0, 18, 1500);
                observer.disconnect(); // Stop observing after animation
            }
        });
    }, { threshold: 0.3 }); // Lower threshold for better UX

    observer.observe(aboutSection);
}

function animateCounter(id, start, end, duration) {
    const el = document.getElementById(id);
    if (!el) return;

    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smoother animation
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(start + range * easeOutQuad);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end; // Ensure final value
        }
    }

    requestAnimationFrame(update);
}