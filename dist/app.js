import { DaysComponent } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './dialog/dialog.js';
import { Presenter } from './presenter.js';
class App {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.bindElementToDialog = () => {
            const dialog = new Dialog();
            const addBtn = this.activedPage.querySelector('.addBtn');
            addBtn.addEventListener('click', () => {
                const addMenu = this.activedPage.querySelector('.addMenu');
                const day = addMenu.dataset.day;
                addMenu.addEventListener('click', (e) => {
                    const target = e.target;
                    if (target.matches('.addRoutine')) {
                        dialog.setType('Routine');
                    }
                    else {
                        dialog.setType('Todo');
                    }
                    dialog.attatchTo(document.body);
                    dialog.setOnCloseListener(() => {
                        dialog.removeFrom(document.body);
                    });
                    dialog.setOnAddListener(() => {
                        dialog.removeFrom(document.body);
                        this.addItem(dialog.type, dialog.time, dialog.title, day);
                    });
                });
            });
        };
        this.addItem = (type, time, title, day) => {
            const newItems = this.presenter.addItem(type, time, title, day);
            this.items = newItems;
            console.log(this.items);
        };
        this.presenter = new Presenter();
        this.items = this.presenter.getItems();
        this.today = new Date().getDay();
        this.days = new DaysComponent(this.today);
        this.daysContainer = this.appRoot.querySelector('.days__container');
        this.days.attatchTo(this.daysContainer);
        this.page = new PageComponent(this.days.getActivedDay());
        this.pageContainer = this.appRoot.querySelector('.contents__container');
        this.page.attatchTo(this.pageContainer);
        this.activedPage = this.page.getActivedPage();
        this.bindDaysToPage(this.page);
        this.bindElementToDialog();
        this.page.updateItems(this.items);
    }
    bindDaysToPage(page) {
        const days = document.querySelector('.days');
        days.addEventListener('click', (e) => {
            const target = e.target;
            page.setOnActiveChangeListener(target.dataset.day);
            this.activedPage = page.getActivedPage();
            this.bindElementToDialog();
        });
    }
}
new App(document.querySelector('.document'));
