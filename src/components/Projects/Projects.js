import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export class Projects {
    constructor() {
        this.videoSwipers       = [];
        this.mobileSwiper       = null;
        this.mobileVideoSwipers = [];

        this.infoContainer = document.getElementById('project-info-container');
        this.projTitle     = document.getElementById('proj-title');
        this.projDesc      = document.getElementById('proj-desc');
        this.projTags      = document.getElementById('proj-tags');
        this.projGithub    = document.getElementById('proj-github');
        this.projDemo      = document.getElementById('proj-demo');

        this.projectsData = [
            {
                title:  'TradeBot',
                desc:   'A Telegram Bot designed to provide real-time financial data and personalized tools for traders and investors.',
                tags:   ['Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'Heroku'],
                github: 'https://github.com/DanTheDev22/Tradebot',
                demo:   'https://t.me/my_trading_assist_bot',
            },
            // Add more projects here
        ];

        this._isAnimating   = false;
        this._cardListeners = [];

        this.setupDesktop();
        this.setupMobile();
    }

    static init() {
        return new Projects();
    }

    // ─── Desktop ────────────────────────────────────────────────────────────────

    setupDesktop() {
        // Video swipers
        document.querySelectorAll('[id^="project-video-swiper-"]').forEach((el, i) => {
            this.videoSwipers[i] = new Swiper(el, {
                modules: [Pagination],
                loop: true,
                pagination: { el: el.querySelector('.project-video-pagination'), clickable: true },
            });
        });

        // Hover listeners — sole source of truth for active project
        const cards = Array.from(document.querySelectorAll('.project-image[data-index]'));
        if (!cards.length) return;

        cards.forEach(card => {
            const idx     = parseInt(card.dataset.index, 10);
            const onEnter = () => this.updateProjectInfo(this.projectsData[idx]);

            card.addEventListener('mouseenter', onEnter);
            this._cardListeners.push({ card, onEnter });
        });

        // Seed with first project on load
        this.updateProjectInfo(this.projectsData[0]);
    }

    // ─── Info panel update (fade transition) ────────────────────────────────────

    updateProjectInfo(data) {
        if (!data || !this.infoContainer || this._isAnimating) return;

        this._isAnimating = true;
        this.infoContainer.classList.add('is-transitioning');

        const onTransitionEnd = () => {
            this.infoContainer.removeEventListener('transitionend', onTransitionEnd);

            if (this.projTitle)  this.projTitle.textContent = data.title;
            if (this.projDesc)   this.projDesc.textContent  = data.desc;
            if (this.projTags)   this.projTags.innerHTML    = data.tags
                .map(t => `<span class="projects__tag">${t}</span>`)
                .join('');
            if (this.projGithub) this.projGithub.href = data.github;
            if (this.projDemo)   this.projDemo.href   = data.demo;

            void this.infoContainer.offsetWidth;
            this.infoContainer.classList.remove('is-transitioning');
            this._isAnimating = false;
        };

        this.infoContainer.addEventListener('transitionend', onTransitionEnd);
    }

    // ─── Mobile ─────────────────────────────────────────────────────────────────

    setupMobile() {
        document.querySelectorAll('.project-mobile__video-swiper').forEach(el => {
            this.mobileVideoSwipers.push(new Swiper(el, {
                modules: [Pagination],
                loop: true,
                pagination: { el: el.querySelector('.project-mobile-video-pagination'), clickable: true },
            }));
        });

        const mobileEl = document.querySelector('.projects-mobile-swiper');
        if (!mobileEl) return;

        this.mobileSwiper = new Swiper(mobileEl, {
            modules: [Pagination],
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: { el: '.projects-mobile-pagination', clickable: true },
        });
    }

    // ─── Cleanup ─────────────────────────────────────────────────────────────────

    destroy() {
        this._cardListeners.forEach(({ card, onEnter }) =>
            card.removeEventListener('mouseenter', onEnter)
        );
        this._cardListeners = [];

        this.videoSwipers.forEach(s => s.destroy(true, true));
        this.videoSwipers = [];

        this.mobileSwiper?.destroy(true, true);
        this.mobileSwiper = null;

        this.mobileVideoSwipers.forEach(s => s.destroy(true, true));
        this.mobileVideoSwipers = [];
    }
}