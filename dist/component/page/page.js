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
        this.dailyItems = new DailyItemsComponent();
        this.dailyItems.setOnRemoveItemListener((id, type) => {
            this.onRemoveItemListener &&
                this.onRemoveItemListener(id, type, this.element.dataset.day);
        });
        this.dailyItems.attatchTo(itemsContainer);
        this.weeklyItems = new WeeklyItemsComponent();
        this.weeklyItems.attatchTo(itemsContainer, 'beforeend');
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
    updateItems(items) {
        this.items = items;
        this.dailyItems.updateItems(this.items, this.day);
    }
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
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
            page.setOnRemoveItemListener((id, type, day) => {
                this.onRemoveItemListener && this.onRemoveItemListener(id, type, day);
            });
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
    updateItems(items) {
        this.items = items;
        this.children.forEach((page) => {
            page.updateItems(this.items);
        });
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
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
    }
}
