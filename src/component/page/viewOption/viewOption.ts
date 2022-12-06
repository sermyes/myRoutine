import { BaseComponent } from '../../component.js';
import { Modal } from './../../modal/modal.js';

type OnSortedItemsListener = (type: FilterType) => void;
export type FilterType = 'All' | 'Routine' | 'Todo';
interface FilterContainer {
  setOnSortedItemsListener(listener: OnSortedItemsListener): void;
}

class FilterMenuComponent
  extends BaseComponent<HTMLElement>
  implements FilterContainer
{
  private onSortedItemsListener?: OnSortedItemsListener;
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
      const target = e.target! as HTMLElement;
      this.onSortedItemsListener &&
        this.onSortedItemsListener(target.innerText! as FilterType);
    });
  }

  setOnSortedItemsListener(listener: OnSortedItemsListener) {
    this.onSortedItemsListener = listener;
  }
}

export class ViewOptionComponent
  extends BaseComponent<HTMLElement>
  implements FilterContainer
{
  private onSortedItemsListener?: OnSortedItemsListener;
  private modal: Modal;
  private filterMenu: FilterMenuComponent;
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

  private changeViewOption(): void {
    const overlay = this.element.querySelector('.overlay')! as HTMLDivElement;
    const optionBtn = this.element.querySelector(
      '.view_option'
    )! as HTMLElement;
    const weeklyBtn = this.element.querySelector(
      '.weeklyBtn'
    )! as HTMLButtonElement;
    const dailyBtn = this.element.querySelector(
      '.dailyBtn'
    )! as HTMLButtonElement;
    optionBtn.addEventListener('click', (e) => {
      const target = e.target! as HTMLElement;
      if (target.matches('.weeklyBtn')) {
        overlay.classList.add('right');
        weeklyBtn.classList.add('active');
        dailyBtn.classList.remove('active');
      } else {
        overlay.classList.remove('right');
        weeklyBtn.classList.remove('active');
        dailyBtn.classList.add('active');
      }
    });
  }

  private onFilterMenu() {
    const filterContainer = this.element.querySelector(
      '.filter_container'
    )! as HTMLElement;
    const filterOption = this.element.querySelector(
      '.filter_option'
    )! as HTMLElement;
    filterOption.addEventListener('click', () => {
      if (filterOption.matches('.active')) {
        this.modal.removeFrom(this.element);
        filterOption.classList.remove('active');
        this.filterMenu.removeFrom(filterContainer);
      } else {
        this.modal.attatchTo(this.element, 'afterbegin');
        filterOption.classList.add('active');
        this.filterMenu.attatchTo(filterContainer);
      }
    });
  }

  setOnSortedItemsListener(listener: OnSortedItemsListener): void {
    this.onSortedItemsListener = (type) => {
      listener(type);
      const filterContainer = this.element.querySelector(
        '.filter_container'
      )! as HTMLElement;
      const filterOption = this.element.querySelector(
        '.filter_option'
      )! as HTMLElement;
      this.modal.removeFrom(this.element);
      filterOption.classList.remove('active');
      this.filterMenu.removeFrom(filterContainer);
    };
  }
}
