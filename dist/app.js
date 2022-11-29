import { DaysComponent } from './component/page/page.js';
class App {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.days = new DaysComponent();
        this.daysContainer = this.appRoot.querySelector('.days__container');
        this.days.attatchTo(this.daysContainer);
    }
}
new App(document.querySelector('.document'));
