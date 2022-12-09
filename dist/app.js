import { DaysComponent } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './component/dialog/dialog.js';
import { Presenter } from './presenter.js';
class App {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.addItem = (type, time, title, day) => {
            const newItems = this.presenter.addItem(type, time, title, day);
            this.items = newItems;
            this.page.updateItems(this.items);
        };
        this.presenter = new Presenter();
        this.items = this.presenter.getItems();
        this.today = new Date().getDay();
        this.days = new DaysComponent(this.today);
        this.dialog = new Dialog();
        this.daysContainer = this.appRoot.querySelector('.days__container');
        this.days.attatchTo(this.daysContainer);
        this.page = new PageComponent(this.days.getActivedDay());
        this.pageContainer = this.appRoot.querySelector('.contents__container');
        this.page.setOnRemoveItemListener((id, type, day) => {
            this.items = this.presenter.removeItem(id, type, day);
            this.page.updateItems(this.items);
        });
        this.page.setOnStateChangeListener((id, type, day, state) => {
            this.items = this.presenter.updateItem(id, type, day, state);
            this.page.updateItems(this.items);
        });
        this.page.setOnBindDialogListener((type, day) => {
            this.dialog.setType(type);
            this.dialog.attatchTo(document.body);
            this.dialog.setOnCloseListener(() => {
                this.dialog.removeFrom(document.body);
            });
            this.dialog.setOnAddListener(() => {
                this.dialog.removeFrom(document.body);
                this.addItem(this.dialog.type, this.dialog.time, this.dialog.title, day);
            });
        });
        this.page.attatchTo(this.pageContainer);
        this.bindDaysToPage(this.page);
        this.page.updateItems(this.items);
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
