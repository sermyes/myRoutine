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
        const modal = new Modal();
        const filterMenu = new FilterMenuComponent();
        this.onFilterMenu(modal, filterMenu);
        this.changeViewOption();
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
}
