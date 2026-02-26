import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export class Projects {
    constructor() {
        this.desktopSwiper = null;
        this.videoSwipers = [];
        this.mobileSwiper = null;
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

        this.setupDesktop();
        this.setupMobile();
    }

    static init() {
        return new Projects();
    }

    // ─── Desktop ────────────────────────────────────────────────────────────────

    setupDesktop() {
        // Inner video swipers (one per project slide)
        document.querySelectorAll('[id^="project-video-swiper-"]').forEach((el, i) => {
            const s = new Swiper(el, {
                modules: [Pagination],
                loop: true,
                pagination: { el: el.querySelector('.project-video-pagination'), clickable: true },
            });
            this.videoSwipers[i] = s;
        });

        // Outer vertical swiper (between projects)
        this.desktopSwiper = new Swiper('#projects-desktop-swiper', {
            modules: [Navigation, Pagination],
            direction: 'vertical',
            loop: false,
            pagination: { el: '.projects-desktop-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            on: {
                slideChange: () => {
                    const idx = this.desktopSwiper.activeIndex;
                    this.updateProjectInfo(this.projectsData[idx]);
                },
            },
        });

        this.updateProjectInfo(this.projectsData[0]);
    }

    updateProjectInfo(data) {
        if (!data || !this.infoContainer) return;

        // Fade out
        this.infoContainer.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        this.infoContainer.style.opacity    = '0.5';
        this.infoContainer.style.transform  = 'translateY(10px)';

        setTimeout(() => {
            if (this.projTitle)  this.projTitle.textContent = data.title;
            if (this.projDesc)   this.projDesc.textContent  = data.desc;
            if (this.projTags)   this.projTags.innerHTML    = data.tags
                .map(t => `<span class="projects__tag">${t}</span>`)
                .join('');
            if (this.projGithub) this.projGithub.href = data.github;
            if (this.projDemo)   this.projDemo.href   = data.demo;

            // Fade in
            this.infoContainer.style.opacity   = '1';
            this.infoContainer.style.transform = 'translateY(0)';
        }, 200);
    }

    // ─── Mobile ─────────────────────────────────────────────────────────────────

    setupMobile() {
        // Inner video swipers inside each mobile project card
        document.querySelectorAll('.project-mobile__video-swiper').forEach((el) => {
            const s = new Swiper(el, {
                modules: [Pagination],
                loop: true,
                pagination: { el: el.querySelector('.project-mobile-video-pagination'), clickable: true },
            });
            this.mobileVideoSwipers.push(s);
        });

        // Outer horizontal swiper (between project cards)
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
        this.desktopSwiper?.destroy(true, true);
        this.desktopSwiper = null;

        this.videoSwipers.forEach(s => s.destroy(true, true));
        this.videoSwipers = [];

        this.mobileSwiper?.destroy(true, true);
        this.mobileSwiper = null;

        this.mobileVideoSwipers.forEach(s => s.destroy(true, true));
        this.mobileVideoSwipers = [];
    }
}