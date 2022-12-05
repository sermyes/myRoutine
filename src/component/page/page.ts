import { BaseComponent, Component, DayType, Days } from './../component.js';
import { ViewOptionComponent } from './viewOption/viewOption.js';
import { AddButtonComponent } from './addButton/addbutton.js';
import { DailyItemsComponent, ItemsContainer } from './items/daily.js';
import { WeeklyItemsComponent } from './items/weekly.js';
import { Items } from '../../presenter.js';

type ChangeListener = DayType;

interface Activable extends Component {
  onActive(activedDay: DayType): void;
}
interface PageContainer extends Component, Activable {
  setOnActiveChangeListener(listener: ChangeListener): void;
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Activable
{
  private items?: Items;
  private dailyItems: ItemsContainer;
  private weeklyItems: WeeklyItemsComponent;
  constructor(private day: DayType) {
    super(`
      <div class="content" data-day>
        <div class="items__container">
        </div>
      </div>
    `);
    this.element.dataset.day = this.day;
    const viewOption = new ViewOptionComponent();
    viewOption.attatchTo(this.element, 'afterbegin');

    const itemsContainer = this.element.querySelector(
      '.items__container'
    )! as HTMLElement;
    this.dailyItems = new DailyItemsComponent();
    this.dailyItems.attatchTo(itemsContainer);
    this.weeklyItems = new WeeklyItemsComponent();
    this.weeklyItems.attatchTo(itemsContainer, 'beforeend');

    const addButton = new AddButtonComponent(this.day);
    addButton.attatchTo(this.element, 'beforeend');
  }

  onActive(activedDay: DayType): void {
    this.element.classList.remove('active');
    if (this.element.dataset.day === activedDay) {
      this.element.classList.add('active');
    }
  }

  getActived(): HTMLElement | null {
    if (this.element.matches('.active')) {
      return this.element;
    } else {
      return null;
    }
  }

  updateItems(items: Items) {
    this.items = items;
    this.dailyItems.updateItems(this.items, this.day);
  }
}

// PageComponent
export class PageComponent
  extends BaseComponent<HTMLElement>
  implements PageContainer
{
  private children: PageItemComponent[] = [];
  private items?: Items;
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

  updateItems(items: Items) {
    this.items = items;
    this.children.forEach((page) => {
      page.updateItems(this.items! as Items);
    });
  }

  getActivedPage(): HTMLElement {
    let activedPage: HTMLElement;
    this.children.forEach((page) => {
      const element = page.getActived();
      if (element) {
        activedPage = element;
      }
    });
    return activedPage! as HTMLElement;
  }
}
