import { BaseComponent, Days } from './../component.js';
import { Modal } from '../modal/modal.js';
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
            <button class="daily viewBtn active">
              <span class="textIcon">Daily</span>
            </button>
            <button class="weekly viewBtn">
              <span class="textIcon">Weekly</span>
            </button>
          </div>
          <button class="filter_option">
            <i class="fas fa-filter filterIcon"></i>
            <span class="filterText">Filter</span>
          </button>
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
        this.onAddItemMenu(modal, addItemMenu);
    }
    onActive(activedDay) {
        this.element.classList.remove('active');
        if (this.element.dataset.day === activedDay) {
            this.element.classList.add('active');
        }
    }
    onAddItemMenu(modal, addItemMenu) {
        const add = this.element.querySelector('.addBtn');
        const addBtn = this.element.querySelector('.addIcon');
        const footer = this.element.querySelector('.content__footer');
        add.addEventListener('click', () => {
            if (addBtn.matches('.rotate')) {
                addBtn.classList.remove('rotate');
                modal.removeFrom(this.element);
                addItemMenu.removeFrom(footer);
            }
            else {
                addBtn.classList.add('rotate');
                modal.attatchTo(this.element, 'afterbegin');
                addItemMenu.attatchTo(footer, 'beforeend');
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
