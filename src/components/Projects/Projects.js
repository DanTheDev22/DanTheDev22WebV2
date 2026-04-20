import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default class Slider {
    constructor() {
        this.init();
    }

    init() {
        this.swiper = new Swiper('.project__preview.swiper', {
            modules: [Pagination],
            direction: 'horizontal',
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
                clickable: true,
            },
        });
    }
}