import { DaysComponent } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './dialog/dialog.js';
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
        const addBtns = document.querySelectorAll('.addBtn');
        addBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                if (e.target === btn) {
                    const parent = btn.parentElement;
                    const ico = btn.querySelector('.addIcon');
                    const addMenu = parent.querySelector('.addMenu');
                    if (ico.matches('.rotate')) {
                        addMenu.addEventListener('click', this.bindElementToDialog);
                    }
                }
            });
        });
    }
    bindDaysToPage(page) {
        const days = document.querySelector('.days');
        days.addEventListener('click', (e) => {
            const target = e.target;
            page.setOnActiveChangeListener(target.dataset.day);
        });
    }
    bindElementToDialog(e) {
        const btnContainer = e.currentTarget;
        const day = btnContainer.dataset.day;
        const btn = e.target;
        let dialog;
        console.log(day);
        if (btn.matches('.addRoutine')) {
            dialog = new Dialog('Routine');
        }
        else {
            dialog = new Dialog('Todo');
        }
        dialog.attatchTo(document.body);
        dialog.setOnCloseListener(() => {
            dialog.removeFrom(document.body);
        });
        dialog.setOnAddListener(() => {
            dialog.removeFrom(document.body);
            this.addItem(dialog.type, dialog.time, dialog.title);
        });
    }
    addItem(type, time, title) {
        console.log(type, time, title);
    }
}
new App(document.querySelector('.document'));
