import { BaseComponent, Days } from './../component.js';
import { Modal } from '../modal/modal.js';
class FilterMenuComponent extends BaseComponent {
    constructor() {
        super(`
      <ul class="filterMenu">
        <li>
          <span>All</span>
        </li>
        <li>
          <span>Routine</span>
        </li>
        <li>
          <span>Todo</span>
        </li>
      </ul>
    `);
    }
}
class AddItemMenuComponent extends BaseComponent {
    constructor() {
        super(`
      <ul class="addMenu">
        <li>
          <span class="addText">Routine</span>
          <button class="add">
            <i class="fas fa-plus addIcon"></i>
          </button>
        </li>
        <li>
          <span class="addText">Todo</span>
          <button class="add">
            <i class="fas fa-check"></i>
          </button>
        </li>
      </ul>
    `);
    }
}
class PageItemComponent extends BaseComponent {
    constructor(day) {
        super(`
      <div class="content" data-day>
        <div class="content__header">
          <div class="view_option">
            <div class="overlay"></div>
            <button class="dailyBtn viewBtn active">
              <span class="textIcon">Daily</span>
            </button>
            <button class="weeklyBtn viewBtn">
              <span class="textIcon">Weekly</span>
            </button>
          </div>
          <div class="filter_container">
            <button class="filter_option">
              <i class="fas fa-filter filterIcon"></i>
              <span class="filterText">Filter</span>
            </button>
          </div>
        </div>
        <ul class="items"></ul>
        <div class="content__footer">
          <button class="addBtn add">
            <i class="fas fa-plus addIcon"></i>
          </button>
        </div>
      </div>
    `);
        this.day = day;
        this.element.dataset.day = this.day;
        const modal = new Modal();
        const addItemMenu = new AddItemMenuComponent();
        const filterMenu = new FilterMenuComponent();
        this.onAddItemMenu(modal, addItemMenu);
        this.onFilterMenu(modal, filterMenu);
        this.changeViewOption();
    }
    onActive(activedDay) {
        this.element.classList.remove('active');
        if (this.element.dataset.day === activedDay) {
            this.element.classList.add('active');
        }
    }
    onAddItemMenu(modal, addItemMenu) {
        const addBtn = this.element.querySelector('.addBtn');
        const addIco = this.element.querySelector('.addIcon');
        const footer = this.element.querySelector('.content__footer');
        addBtn.addEventListener('click', () => {
            if (addIco.matches('.rotate')) {
                addIco.classList.remove('rotate');
                modal.removeFrom(this.element);
                addItemMenu.removeFrom(footer);
                addBtn.classList.remove('active');
            }
            else {
                addIco.classList.add('rotate');
                modal.attatchTo(this.element, 'afterbegin');
                addItemMenu.attatchTo(footer, 'beforeend');
                addBtn.classList.add('active');
            }
        });
    }
    onFilterMenu(modal, filterMenu) {
        const filterContainer = this.element.querySelector('.filter_container');
        const filterOption = this.element.querySelector('.filter_option');
        filterOption.addEventListener('click', () => {
            if (filterOption.matches('.active')) {
                modal.removeFrom(this.element);
                filterOption.classList.remove('active');
                filterMenu.removeFrom(filterContainer);
            }
            else {
                modal.attatchTo(this.element, 'afterbegin');
                filterOption.classList.add('active');
                filterMenu.attatchTo(filterContainer);
            }
        });
    }
    changeViewOption() {
        const overlay = this.element.querySelector('.overlay');
        const optionBtn = this.element.querySelector('.view_option');
        const weeklyBtn = this.element.querySelector('.weeklyBtn');
        const dailyBtn = this.element.querySelector('.dailyBtn');
        optionBtn.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('.weeklyBtn')) {
                overlay.classList.add('right');
                weeklyBtn.classList.add('active');
                dailyBtn.classList.remove('active');
            }
            else {
                overlay.classList.remove('right');
                weeklyBtn.classList.remove('active');
                dailyBtn.classList.add('active');
            }
        });
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
}
