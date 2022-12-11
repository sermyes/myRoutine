import { BaseComponent } from '../../component.js';
import { Modal } from './../../modal/modal.js';
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
        this.element.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('.filterMenu')) {
                return;
            }
            this.onSortedItemsListener &&
                this.onSortedItemsListener(target.innerText);
        });
    }
    setOnSortedItemsListener(listener) {
        this.onSortedItemsListener = listener;
    }
}
export class ViewOptionComponent extends BaseComponent {
    constructor() {
        super(`
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
		`);
        this.modal = new Modal();
        this.filterMenu = new FilterMenuComponent();
        this.filterMenu.setOnSortedItemsListener((type) => {
            this.onSortedItemsListener && this.onSortedItemsListener(type);
        });
        this.onFilterMenu();
        this.changeViewOption();
    }
    changeViewOption() {
        const optionBtn = this.element.querySelector('.view_option');
        const overlay = this.element.querySelector('.overlay');
        const weeklyBtn = this.element.querySelector('.weeklyBtn');
        const dailyBtn = this.element.querySelector('.dailyBtn');
        optionBtn.addEventListener('click', (e) => {
            const target = e.target;
            let type;
            if (target.matches('.overlay')) {
                return;
            }
            if (target.matches('.weeklyBtn')) {
                type = 'weekly';
                overlay.classList.add('right');
                weeklyBtn.classList.add('active');
                dailyBtn.classList.remove('active');
            }
            else {
                type = 'daily';
                overlay.classList.remove('right');
                weeklyBtn.classList.remove('active');
                dailyBtn.classList.add('active');
            }
            this.onViewItemConatinerListener &&
                this.onViewItemConatinerListener(type);
        });
    }
    initViewOption() {
        const overlay = this.element.querySelector('.overlay');
        const weeklyBtn = this.element.querySelector('.weeklyBtn');
        const dailyBtn = this.element.querySelector('.dailyBtn');
        overlay.classList.remove('right');
        weeklyBtn.classList.remove('active');
        dailyBtn.classList.add('active');
        this.onViewItemConatinerListener &&
            this.onViewItemConatinerListener('daily');
    }
    onFilterMenu() {
        const filterContainer = this.element.querySelector('.filter_container');
        const filterOption = this.element.querySelector('.filter_option');
        filterOption.addEventListener('click', () => {
            if (filterOption.matches('.active')) {
                this.modal.removeFrom(this.element);
                filterOption.classList.remove('active');
                this.filterMenu.removeFrom(filterContainer);
            }
            else {
                this.modal.attatchTo(this.element, 'afterbegin');
                filterOption.classList.add('active');
                this.filterMenu.attatchTo(filterContainer);
            }
        });
    }
    setOnViewItemContainerListener(listener) {
        this.onViewItemConatinerListener = listener;
    }
    setOnSortedItemsListener(listener) {
        this.onSortedItemsListener = (type) => {
            listener(type);
            const filterContainer = this.element.querySelector('.filter_container');
            const filterOption = this.element.querySelector('.filter_option');
            this.modal.removeFrom(this.element);
            filterOption.classList.remove('active');
            this.filterMenu.removeFrom(filterContainer);
        };
    }
}
