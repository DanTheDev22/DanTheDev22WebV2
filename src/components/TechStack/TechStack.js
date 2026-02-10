export class TechStack {
    constructor() {
        this.filterBtns = document.querySelectorAll('.tech-stack__filter');
        this.techItems = document.querySelectorAll('.tech-item');
        this.techGrid = document.getElementById('tech-grid');
        // No init() call here!
    }

    init() {
        this.initFilters();
        this.initScrollAnimation();
    }

    initFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleFilter(btn);
            });
        });
    }

    handleFilter(activeBtn) {
        this.filterBtns.forEach(b => b.classList.remove('tech-stack__filter--active'));
        activeBtn.classList.add('tech-stack__filter--active');

        const filter = activeBtn.getAttribute('data-filter');

        this.techItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'flex';
                setTimeout(() => item.classList.add('visible'), index * 50);
            } else {
                item.classList.remove('visible');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    }

    initScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.techItems.forEach((item, index) => {
                        setTimeout(() => item.classList.add('visible'), index * 50);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        if (this.techGrid) {
            observer.observe(this.techGrid);
        }
    }
}