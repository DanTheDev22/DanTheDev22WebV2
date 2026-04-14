export class TechStack {
    constructor() {
        this.filterBtns = document.querySelectorAll('.tech-stack__filter');
        this.techItems  = document.querySelectorAll('.tech-item');
        this.techGrid   = document.getElementById('tech-grid');
        this._timeouts     = [];
        this._activeFilter = 'all';
    }

    init() {
        this.initFilters();
        this.initScrollAnimation();
    }

    initFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', this._onFilterClick.bind(this));
        });
    }

    // ─── private ─────────────────────────────────────────────

    _onFilterClick(e) {
        const btn    = e.currentTarget;
        const filter = btn.dataset.filter;

        if (filter === this._activeFilter) return;

        this.filterBtns.forEach(b => {
            b.classList.toggle('tech-stack__filter--active', b === btn);
        });

        this._activeFilter = filter;
        this._applyFilter(filter);
    }

    _applyFilter(filter) {
        this._clearTimeouts();

        let visibleIndex = 0;

        this.techItems.forEach(item => {
            const matches = filter === 'all' || item.dataset.category === filter;

            if (matches) {
                item.classList.remove('hidden');
                const delay = visibleIndex++ * 50;
                const id = setTimeout(() => item.classList.add('visible'), delay + 20); // +20 to let display resolve before animating
                this._timeouts.push(id);
            } else {
                item.classList.remove('visible');
                const id = setTimeout(() => item.classList.add('hidden'), 300);
                this._timeouts.push(id);
            }
        });
    }

    _clearTimeouts() {
        this._timeouts.forEach(clearTimeout);
        this._timeouts = [];
    }

    initScrollAnimation() {
        if (!this.techGrid) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                this._applyFilter(this._activeFilter);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        observer.observe(this.techGrid);
    }
}