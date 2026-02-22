import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export class Projects {
    constructor() {
        this.swiper = null;
        this.infoContainer = document.getElementById('project-info-container');
        this.projTitle = document.getElementById('proj-title');
        this.projDesc = document.getElementById('proj-desc');
        this.projTags = document.getElementById('proj-tags');

        this.projectsData = [
            {
                title: "TradeBot",
                desc: "A Telegram Bot designed to provide real-time financial data and personalized tools for traders and investors.",
                tags: ["Spring Boot", "PostgreSQL", "Redis", "Docker", "Heroku"],
                github: "https://github.com/DanTheDev22/Tradebot",
                demo: "https://t.me/my_trading_assist_bot"
            }
        ];

        this.setup();
    }

    static init() {
        return new Projects();
    }

    setup() {
        this.swiper = new Swiper('.projects__images', {
            modules: [Navigation, Pagination],
            direction: 'vertical',
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                slideChange: () => {
                    const index = this.swiper.activeIndex;
                    this.updateProjectInfo(this.projectsData[index]);
                },
            },
        });

        this.updateProjectInfo(this.projectsData[0]);
    }

    updateProjectInfo(data) {
        if (!data || !this.infoContainer) return;

        this.infoContainer.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        this.infoContainer.style.opacity = '0.5';
        this.infoContainer.style.transform = 'translateY(10px)';

        setTimeout(() => {
            this.projTitle.textContent = data.title;
            this.projDesc.textContent = data.desc;
            this.projTags.innerHTML = data.tags
                .map(tag => `<span class="projects__tag">${tag}</span>`)
                .join('');

            const [primary, secondary] = document.querySelectorAll('.projects__button');
            if (primary) primary.href = data.github;
            if (secondary) secondary.href = data.demo;

            this.infoContainer.style.opacity = '1';
            this.infoContainer.style.transform = 'translateY(0)';
        }, 200);
    }

    destroy() {
        this.swiper?.destroy(true, true);
        this.swiper = null;
    }
}