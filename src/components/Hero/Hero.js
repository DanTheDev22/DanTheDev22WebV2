export class HeroScene {
    constructor() {
        this.wrapper = document.getElementById('tilt-wrapper');
        this.card = document.getElementById('tech-card');
        this.cardTitle = document.getElementById('card-title');
        this.cardStack = document.getElementById('card-stack');
        this.cardDesc = document.getElementById('card-desc');
        this.cardIcon = document.getElementById('card-icon');
        this.closeBtn = document.getElementById('close-card-btn');
        this.isFocused = false;

        this.systemData = {
            'node-backend': {
                title: 'Backend Core',
                stack: 'Node.js, Python, Go',
                desc: 'High-performance API gateway and business logic orchestration.',
                icon: 'cpu'
            },
            'node-cloud': {
                title: 'Cloud Infrastructure',
                stack: 'AWS, Docker, CI/CD',
                desc: 'Scalable deployment pipelines and containerized environments.',
                icon: 'cloud'
            },
            'node-frontend': {
                title: 'Frontend Architecture',
                stack: 'React, Vue, WebGL',
                desc: 'Responsive, accessible, and performant client-side applications.',
                icon: 'layout'
            },
            'node-api': {
                title: 'API & Logic',
                stack: 'GraphQL, REST, gRPC',
                desc: 'Type-safe data layers ensuring efficient client-server communication.',
                icon: 'code-2'
            },
            'node-db': {
                title: 'Database Layer',
                stack: 'PostgreSQL, Redis, Mongo',
                desc: 'Optimized data persistence, caching strategies, and replication.',
                icon: 'database'
            }
        };

        this.init();
    }

    init() {
        this.initMouseMove();
        this.initNodeInteractions();
        this.initCloseButton();
        this.initClickOutside();
    }

    initMouseMove() {
        document.addEventListener('mousemove', (e) => {
            if (this.isFocused) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const rotateY = ((clientX - innerWidth / 2) / innerWidth) * 20;
            const rotateX = -((clientY - innerHeight / 2) / innerHeight) * 20;

            this.wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        document.addEventListener('mouseleave', () => {
            if (!this.isFocused) {
                this.wrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
            }
        });
    }

    initNodeInteractions() {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                this.activateNode(node.id);
            });
        });
    }

    activateNode(id) {
        if (this.isFocused && document.querySelector('.node.active')?.id === id) return;

        this.isFocused = true;
        document.body.classList.add('has-focus');

        document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));

        const node = document.getElementById(id);
        if (node) node.classList.add('active');

        let transform = 'scale(1.1)';
        if (id === 'node-backend') transform += ' translateZ(50px)';
        if (id === 'node-cloud') transform += ' rotateX(-20deg) translateY(20%) translateZ(80px)';
        if (id === 'node-frontend') transform += ' rotateY(20deg) translateX(15%) translateZ(80px)';
        if (id === 'node-api') transform += ' rotateY(-20deg) translateX(-15%) translateZ(80px)';
        if (id === 'node-db') transform += ' rotateX(20deg) translateY(-20%) translateZ(80px)';

        this.wrapper.style.transform = transform;

        const data = this.systemData[id];
        if (data) {
            this.showCard(data);
        }
    }

    showCard(data) {
        this.cardTitle.textContent = data.title;
        this.cardStack.textContent = data.stack;
        this.cardDesc.textContent = data.desc;
        this.cardIcon.setAttribute('data-lucide', data.icon);

        if (window.lucide) {
            window.lucide.createIcons();
        }

        this.card.classList.add('visible');
    }

    initCloseButton() {
        this.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.resetView();
        });
    }

    initClickOutside() {
        document.addEventListener('click', (e) => {
            if (this.isFocused &&
                !e.target.closest('.tech-card') &&
                !e.target.closest('.node')) {
                this.resetView();
            }
        });
    }

    resetView() {
        this.isFocused = false;
        document.body.classList.remove('has-focus');
        document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
        this.wrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
        this.card.classList.remove('visible');
    }
}