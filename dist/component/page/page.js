import { BaseComponent, Days } from './../component.js';
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
          <button class="addBtn">
            <i class="fas fa-plus addIcon"></i>
          </button>
        </div>
      </div>
    `);
        this.day = day;
        this.element.dataset.day = this.day;
        this.element.innerText = this.day;
    }
    onActive(activedDay) {
        this.element.classList.remove('active');
        if (this.element.dataset.day === activedDay) {
            this.element.classList.add('active');
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
}
