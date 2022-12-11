import { BaseComponent, Component } from '../../component.js';
import { Modal } from './../../modal/modal.js';

type OnSortedItemsListener = (type: FilterType) => void;
type OnViewItemConatinerListener = (type: ViewType) => void;
export type ViewType = 'weekly' | 'daily';
export type FilterType = 'All' | 'Routine' | 'Todo';

interface FilterImpl extends Component {
  setOnSortedItemsListener(listener: OnSortedItemsListener): void;
}

export interface ViewContainer extends FilterImpl {
  setOnViewItemContainerListener(listener: OnViewItemConatinerListener): void;
  initViewOption(): void;
}

class FilterMenuComponent
  extends BaseComponent<HTMLElement>
  implements FilterImpl
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
      if (target.matches('.filterMenu')) {
        return;
      }
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
  implements ViewContainer
{
  private onSortedItemsListener?: OnSortedItemsListener;
  private modal: Modal;
  private filterMenu: FilterMenuComponent;
  private onViewItemConatinerListener?: OnViewItemConatinerListener;
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
    const optionBtn = this.element.querySelector(
      '.view_option'
    )! as HTMLElement;
    const overlay = this.element.querySelector('.overlay')! as HTMLDivElement;
    const weeklyBtn = this.element.querySelector(
      '.weeklyBtn'
    )! as HTMLButtonElement;
    const dailyBtn = this.element.querySelector(
      '.dailyBtn'
    )! as HTMLButtonElement;
    optionBtn.addEventListener('click', (e) => {
      const target = e.target! as HTMLElement;
      let type: ViewType;
      if (target.matches('.overlay')) {
        return;
      }

      if (target.matches('.weeklyBtn')) {
        type = 'weekly';
        overlay.classList.add('right');
        weeklyBtn.classList.add('active');
        dailyBtn.classList.remove('active');
      } else {
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
    const overlay = this.element.querySelector('.overlay')! as HTMLDivElement;
    const weeklyBtn = this.element.querySelector(
      '.weeklyBtn'
    )! as HTMLButtonElement;
    const dailyBtn = this.element.querySelector(
      '.dailyBtn'
    )! as HTMLButtonElement;
    overlay.classList.remove('right');
    weeklyBtn.classList.remove('active');
    dailyBtn.classList.add('active');
    this.onViewItemConatinerListener &&
      this.onViewItemConatinerListener('daily');
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

  setOnViewItemContainerListener(listener: OnViewItemConatinerListener) {
    this.onViewItemConatinerListener = listener;
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
