import { BaseComponent, Component, DayType, Days } from './../component.js';
import { Modal } from '../modal/modal.js';

type ChangeListener = DayType;
type AddItemsClickListener = () => void;
type RemoveItemMenuListener = () => void;
interface Activable extends Component {
  onActive(activedDay: DayType): void;
}
interface PageContainer extends Component, Activable {
  setOnActiveChangeListener(listener: ChangeListener): void;
}

class FilterMenuComponent extends BaseComponent<HTMLElement> {
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

class AddItemMenuComponent extends BaseComponent<HTMLElement> {
  private removeItemMenuListener?: RemoveItemMenuListener;
  constructor(private day: DayType) {
    super(`
      <ul class="addMenu">
        <li class="addRoutine">
          <span class="addText">Routine</span>
          <button class="add">
            <i class="fas fa-plus addIcon"></i>
          </button>
        </li>
        <li class="addTodo">
          <span class="addText">Todo</span>
          <button class="add">
            <i class="fas fa-check"></i>
          </button>
        </li>
      </ul>
    `);

    this.element.dataset.day = this.day;
    this.element.addEventListener('click', () => {
      this.removeItemMenuListener && this.removeItemMenuListener();
    });
  }

  setRemoveItemMenuListener(listener: RemoveItemMenuListener) {
    this.removeItemMenuListener = listener;
  }
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Activable
{
  constructor(private day: DayType) {
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
        <ul class="items">
          <li class="item">
            <span class="time">오전 08:00</span>
            <span class="title">공복에 물마시기</span>
            <div class="state_container">
              <button class="stateBtn">
                <i class="fas fa-check"></i>
              </button>
            </div>
            <button class="deleteBtn">
              <i class="fas fa-trash-alt"></i>
            </button>
          </li>
        </ul>
        <div class="content__footer">
          <button class="addBtn add">
            <i class="fas fa-plus addIcon"></i>
          </button>
        </div>
      </div>
    `);

    this.element.dataset.day = this.day;
    const modal = new Modal();
    const addItemMenu = new AddItemMenuComponent(this.day);
    const filterMenu = new FilterMenuComponent();
    this.onAddItemMenu(modal, addItemMenu);
    this.onFilterMenu(modal, filterMenu);
    this.changeViewOption();
  }

  onActive(activedDay: DayType): void {
    this.element.classList.remove('active');
    if (this.element.dataset.day === activedDay) {
      this.element.classList.add('active');
    }
  }

  private onAddItemMenu(modal: Modal, addItemMenu: AddItemMenuComponent): void {
    const addBtn = this.element.querySelector('.addBtn')! as HTMLButtonElement;
    const addIco = this.element.querySelector('.addIcon')! as HTMLElement;
    const footer = this.element.querySelector(
      '.content__footer'
    )! as HTMLElement;

    addBtn.addEventListener('click', () => {
      if (addIco.matches('.rotate')) {
        this.removeItemMenu(addIco, modal, addItemMenu, footer, addBtn);
      } else {
        this.addItemMenu(addIco, modal, addItemMenu, footer, addBtn);
        addItemMenu.setRemoveItemMenuListener(() => {
          this.removeItemMenu(addIco, modal, addItemMenu, footer, addBtn);
        });
      }
    });
  }

  private removeItemMenu(
    addIco: HTMLElement,
    modal: Modal,
    addItemMenu: AddItemMenuComponent,
    footer: HTMLElement,
    addBtn: HTMLButtonElement
  ) {
    addIco.classList.remove('rotate');
    modal.removeFrom(this.element);
    addItemMenu.removeFrom(footer);
    addBtn.classList.remove('active');
  }

  private addItemMenu(
    addIco: HTMLElement,
    modal: Modal,
    addItemMenu: AddItemMenuComponent,
    footer: HTMLElement,
    addBtn: HTMLButtonElement
  ) {
    addIco.classList.add('rotate');
    modal.attatchTo(this.element, 'afterbegin');
    addItemMenu.attatchTo(footer, 'beforeend');
    addBtn.classList.add('active');
  }

  private onFilterMenu(modal: Modal, filterMenu: FilterMenuComponent) {
    const filterContainer = this.element.querySelector(
      '.filter_container'
    )! as HTMLElement;
    const filterOption = this.element.querySelector(
      '.filter_option'
    )! as HTMLElement;
    filterOption.addEventListener('click', () => {
      if (filterOption.matches('.active')) {
        modal.removeFrom(this.element);
        filterOption.classList.remove('active');
        filterMenu.removeFrom(filterContainer);
      } else {
        modal.attatchTo(this.element, 'afterbegin');
        filterOption.classList.add('active');
        filterMenu.attatchTo(filterContainer);
      }
    });
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
}

export class PageComponent
  extends BaseComponent<HTMLElement>
  implements PageContainer
{
  private children: PageItemComponent[] = [];
  constructor(private activedDay: DayType) {
    super(`
      <section class="contents">
      </section>
    `);

    this.addPages(this.element);
  }

  private addPages(parent: HTMLElement): void {
    for (let i = 0; i < Days.length; i++) {
      const page = new PageItemComponent(Days[i]! as DayType);
      page.attatchTo(parent);
      this.children.push(page);
    }

    this.onActive(this.activedDay);
  }

  onActive(activedDay: DayType): void {
    this.children.forEach((page) => {
      page.onActive(activedDay);
    });
  }

  setOnActiveChangeListener(listener: ChangeListener) {
    this.onActive(listener);
  }

  setAddItemsClickListener(listener: AddItemsClickListener) {
    console.log(listener);
  }
}
