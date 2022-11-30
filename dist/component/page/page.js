import { BaseComponent } from './../component.js';
class PageItemComponent extends BaseComponent {
    constructor() {
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
    }
}
export class PageComponent extends BaseComponent {
    constructor() {
        super(`
      <section class="contents">
      </section>
    `);
        this.page = new PageItemComponent();
        this.page.attatchTo(this.element);
    }
}
