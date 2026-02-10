export class Projects {
    constructor() {
        this.projectsData = [
            {
                title: "E-Commerce Platform",
                desc: "Full-stack online store with payment integration and admin dashboard. Scalable architecture handling thousands of SKUs.",
                tags: ["React", "Spring Boot", "PostgreSQL"]
            },
            {
                title: "Task Management App",
                desc: "Collaborative project management tool with real-time updates and team analytics features.",
                tags: ["React", "Java", "REST"]
            },
            {
                title: "Portfolio Website",
                desc: "Modern, responsive portfolio with smooth 3D animations and high-performance optimizations.",
                tags: ["TypeScript", "Tailwind", "React"]
            }
        ];

        this.projectTriggers = document.querySelectorAll('.project-image');
        this.infoContainer = document.getElementById('project-info-container');
        this.projTitle = document.getElementById('proj-title');
        this.projDesc = document.getElementById('proj-desc');
        this.projTags = document.getElementById('proj-tags');

        this.init();
    }

    init() {
        this.initScrollSpy();
    }

    initScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = entry.target.getAttribute('data-index');
                    this.updateProjectInfo(this.projectsData[idx]);
                }
            });
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0.2 });

        this.projectTriggers.forEach(trigger => observer.observe(trigger));
    }

    updateProjectInfo(data) {
        if (!data) return;

        // Fade out
        this.infoContainer.style.opacity = '0.5';
        this.infoContainer.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Update content
            this.projTitle.textContent = data.title;
            this.projDesc.textContent = data.desc;

            // Update tags
            this.projTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'projects__tag';
                span.textContent = tag;
                this.projTags.appendChild(span);
            });

            // Fade in
            this.infoContainer.style.opacity = '1';
            this.infoContainer.style.transform = 'translateY(0)';
        }, 200);
    }
}