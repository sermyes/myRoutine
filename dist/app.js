import { DaysComponent } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './dialog/dialog.js';
import { Modal } from './component/modal/modal.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.appRoot = appRoot;
        this.dialogRoot = dialogRoot;
        this.today = new Date().getDay();
        this.days = new DaysComponent(this.today);
        this.daysContainer = this.appRoot.querySelector('.days__container');
        this.days.attatchTo(this.daysContainer);
        this.page = new PageComponent(this.days.getActivedDay());
        this.pageContainer = this.appRoot.querySelector('.contents__container');
        this.page.attatchTo(this.pageContainer);
        this.bindDaysToPage(this.page);
        const modal = new Modal();
        const addFooter = document.querySelector('.content__footer');
        const addBtn = addFooter.querySelector('.addBtn');
        addBtn.addEventListener('click', () => {
            const addBtnContainer = addFooter.querySelector('.addMenu');
            addBtnContainer && this.bindElementToDialog(modal, addBtnContainer);
        });
    }
    bindDaysToPage(page) {
        const days = document.querySelector('.days');
        days.addEventListener('click', (e) => {
            const target = e.target;
            page.setOnActiveChangeListener(target.dataset.day);
        });
    }
    bindElementToDialog(modal, addBtnContainer) {
        addBtnContainer.addEventListener('click', (e) => {
            const btnContainer = e.currentTarget;
            const day = btnContainer.dataset.day;
            const btn = e.target;
            let dialog;
            console.log(day);
            modal.attatchTo(this.dialogRoot);
            if (btn.matches('.addRoutine')) {
                dialog = new Dialog('Routine');
            }
            else {
                dialog = new Dialog('Todo');
            }
            modal.attatch(dialog);
            modal.attatchTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                modal.removeFrom(this.dialogRoot);
            });
            dialog.setOnAddListener(() => {
                console.log(dialog.time, dialog.title);
                modal.removeFrom(this.dialogRoot);
            });
        });
    }
}
new App(document.querySelector('.document'), document.body);
