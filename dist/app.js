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
        const days = document.querySelectorAll('.day');
        days.forEach((day) => {
            day.addEventListener('click', () => {
                var _a;
                page.setOnActiveChangeListener((_a = day.children[0]) === null || _a === void 0 ? void 0 : _a.textContent);
            });
        });
    }
}
new App(document.querySelector('.document'));
