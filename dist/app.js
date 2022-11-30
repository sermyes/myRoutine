import { DaysComponent } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
class App {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.today = new Date().getDay();
        this.days = new DaysComponent(this.today);
        this.daysContainer = this.appRoot.querySelector('.days__container');
        this.days.attatchTo(this.daysContainer);
        this.page = new PageComponent();
        this.pageContainer = this.appRoot.querySelector('.contents__container');
        this.page.attatchTo(this.pageContainer);
        console.log(this.days.getActivedDay());
    }
}
new App(document.querySelector('.document'));
