import { BaseComponent, Days } from './../component.js';
import { ViewOptionComponent } from './viewOption/viewOption.js';
import { AddButtonComponent } from './addButton/addbutton.js';
import { DailyItemsComponent } from './items/daily.js';
import { WeeklyItemsComponent } from './items/weekly.js';
class PageItemComponent extends BaseComponent {
    constructor(day) {
        super(`
      <div class="content" data-day>
        <div class="items__container">
        </div>
      </div>
    `);
        this.day = day;
        this.element.dataset.day = this.day;
        const viewOption = new ViewOptionComponent();
        viewOption.attatchTo(this.element, 'afterbegin');
        const itemsContainer = this.element.querySelector('.items__container');
        const dailyItems = new DailyItemsComponent();
        dailyItems.attatchTo(itemsContainer);
        const weeklyItems = new WeeklyItemsComponent();
        weeklyItems.attatchTo(itemsContainer, 'beforeend');
        const addButton = new AddButtonComponent(this.day);
        addButton.attatchTo(this.element, 'beforeend');
    }
    onActive(activedDay) {
        this.element.classList.remove('active');
        if (this.element.dataset.day === activedDay) {
            this.element.classList.add('active');
        }
    }
    getActived() {
        if (this.element.matches('.active')) {
            return this.element;
        }
        else {
            return null;
        }
    }
}
export class PageComponent extends BaseComponent {
    constructor(activedDay) {
        super(`
      <section class="contents">
      </section>
    `);
        this.activedDay = activedDay;
        this.children = [];
        this.addPages(this.element);
    }
    addPages(parent) {
        for (let i = 0; i < Days.length; i++) {
            const page = new PageItemComponent(Days[i]);
            page.attatchTo(parent);
            this.children.push(page);
        }
        this.onActive(this.activedDay);
    }
    onActive(activedDay) {
        this.children.forEach((page) => {
            page.onActive(activedDay);
        });
    }
    setOnActiveChangeListener(listener) {
        this.onActive(listener);
    }
    getActivedPage() {
        let activedPage;
        this.children.forEach((page) => {
            const element = page.getActived();
            if (element) {
                activedPage = element;
            }
        });
        return activedPage;
    }
}
