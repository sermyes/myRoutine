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
        viewOption.setOnSortedItemsListener((type) => {
            this.items && this.updateItems(this.items, type);
        });
        viewOption.attatchTo(this.element, 'afterbegin');
        const itemsContainer = this.element.querySelector('.items__container');
        this.dailyItems = new DailyItemsComponent();
        this.dailyItems.setOnRemoveItemListener((id, type) => {
            this.onRemoveItemListener &&
                this.onRemoveItemListener(id, type, this.element.dataset.day);
        });
        this.dailyItems.setOnStateChangeListener((id, type, state) => {
            this.onStateChangeListener &&
                this.onStateChangeListener(id, type, this.element.dataset.day, state);
        });
        this.dailyItems.attatchTo(itemsContainer);
        this.weeklyItems = new WeeklyItemsComponent();
        this.weeklyItems.attatchTo(itemsContainer, 'beforeend');
        const addButton = new AddButtonComponent(this.day);
        addButton.setOnBindDialogListener((type) => {
            this.onBindDialogListener && this.onBindDialogListener(type, this.day);
        });
        addButton.attatchTo(this.element, 'beforeend');
    }
    onActive(activedDay) {
        this.element.classList.remove('active');
        if (this.element.dataset.day === activedDay) {
            this.element.classList.add('active');
        }
    }
    updateItems(items, type = 'All') {
        this.items = items;
        const routineData = this.sortRoutine(this.items);
        const todoData = this.sortTodo(this.items, this.day);
        this.dailyItems.updateItems(routineData, todoData, this.day, type);
    }
    sortRoutine(items) {
        return Object.entries(items.Routine)
            .sort(([, a], [, b]) => {
            const aTime = a.time.replace(':', '');
            const bTime = b.time.replace(':', '');
            if (aTime > bTime) {
                return 1;
            }
            else {
                return -1;
            }
        })
            .map((value) => value[1]);
    }
    sortTodo(items, day) {
        return Object.entries(items.Todo[day])
            .sort(([, a], [, b]) => {
            const aTime = a.time.replace(':', '');
            const bTime = b.time.replace(':', '');
            if (aTime > bTime) {
                return 1;
            }
            else {
                return -1;
            }
        })
            .map((value) => value[1]);
    }
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
    setOnBindDialogListener(listener) {
        this.onBindDialogListener = listener;
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
            page.setOnStateChangeListener((id, type, day, state) => {
                this.onStateChangeListener &&
                    this.onStateChangeListener(id, type, day, state);
            });
            page.setOnBindDialogListener((type, day) => {
                this.onBindDialogListener && this.onBindDialogListener(type, day);
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
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
    setOnBindDialogListener(listener) {
        this.onBindDialogListener = listener;
    }
}
