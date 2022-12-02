import { DaysComponent } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
class App {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.today = new Date().getDay();
        this.days = new DaysComponent(this.today);
        this.daysContainer = this.appRoot.querySelector('.days__container');
        this.days.attatchTo(this.daysContainer);
        this.page = new PageComponent(this.days.getActivedDay());
        this.pageContainer = this.appRoot.querySelector('.contents__container');
        this.page.attatchTo(this.pageContainer);
        this.bindDaysToPage(this.page);
    }
    bindDaysToPage(page) {
        const days = document.querySelector('.days');
        days.addEventListener('click', (e) => {
            const target = e.target;
            page.setOnActiveChangeListener(target.dataset.day);
        });
    }
}
new App(document.querySelector('.document'));
