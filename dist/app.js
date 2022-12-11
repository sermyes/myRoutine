import { DaysComponent } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './component/dialog/dialog.js';
import { Presenter } from './presenter/presenter.js';
class App {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.addItem = (type, time, title, day) => {
            const newItems = this.presenter.addItem(type, time, title, day);
            this.items = newItems;
            this.page.updateItems(this.items);
        };
        this.presenter = new Presenter({
            Routine: {
                0: {
                    id: 0,
                    time: '14:00',
                    title: 'test0',
                    state: {
                        Mon: 'cancel',
                        Tue: 'cancel',
                        Wed: 'cancel',
                        Thu: 'cancel',
                        Fri: 'cancel',
                        Sat: 'cancel',
                        Sun: 'cancel'
                    }
                }
            },
            Todo: {
                Mon: {
                    3: { id: 3, time: '08:00', title: 'test4', state: 'cancel' }
                },
                Tue: {
                    5: { id: 5, time: '08:00', title: 'test5', state: 'cancel' }
                },
                Wed: {
                    7: { id: 7, time: '05:00', title: 'test6', state: 'cancel' }
                },
                Thu: {
                    8: { id: 8, time: '05:00', title: 'test7', state: 'cancel' }
                },
                Fri: {
                    9: { id: 9, time: '05:00', title: 'test8', state: 'cancel' }
                },
                Sat: {
                    10: { id: 10, time: '05:00', title: 'test9', state: 'cancel' }
                },
                Sun: {
                    11: { id: 11, time: '05:00', title: 'test10', state: 'cancel' }
                }
            }
        });
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
            if (target.dataset.day === undefined) {
                return;
            }
            page.setOnActiveChangeListener(target.dataset.day);
        });
    }
}
new App(document.querySelector('.document'));
