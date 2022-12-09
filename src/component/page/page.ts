import { BaseComponent, Component, DayType, Days } from './../component.js';
import {
  FilterType,
  ViewOptionComponent,
  ViewContainer
} from './viewOption/viewOption.js';
import { AddButtonComponent } from './addButton/addbutton.js';
import { DailyItemsComponent } from './items/item/daily.js';
import { WeeklyItemsComponent } from './items/item/weekly.js';
import {
  DataType,
  Items,
  StateType,
  RoutineMetaData,
  TodoMetaData
} from '../../presenter.js';

type ChangeListener = DayType;
type OnRemoveItemListener = (id: string, type: DataType, day: DayType) => void;
type OnStateChangeListener = (
  id: string,
  type: DataType,
  day: DayType,
  state: StateType
) => void;
type OnBindDialogListener = (type: DataType, day: DayType) => void;
interface Activable extends Component {
  onActive(activedDay: DayType): void;
}

interface PageItemImpl extends Component {
  setOnRemoveItemListener(listener: OnRemoveItemListener): void;
  setOnStateChangeListener(listener: OnStateChangeListener): void;
  setOnBindDialogListener(listener: OnBindDialogListener): void;
}

interface PageItemContainer extends PageItemImpl, Activable {
  updateItems(items: Items, type: FilterType): void;
}

export interface PageContainer extends PageItemImpl {
  setOnActiveChangeListener(listener: ChangeListener): void;
  updateItems(items: Items): void;
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements PageItemContainer
{
  private items?: Items;
  private dailyItems: DailyItemsComponent;
  private weeklyItems: WeeklyItemsComponent;
  private viewOption: ViewContainer;
  private onRemoveItemListener?: OnRemoveItemListener;
  private onStateChangeListener?: OnStateChangeListener;
  private onBindDialogListener?: OnBindDialogListener;
  constructor(private day: DayType) {
    super(`
      <div class="content" data-day>
        <div class="items__container">
        </div>
      </div>
    `);
    this.element.dataset.day = this.day;
    this.viewOption = new ViewOptionComponent();
    this.dailyItems = new DailyItemsComponent();
    this.weeklyItems = new WeeklyItemsComponent();

    this.viewOption.setOnSortedItemsListener((type) => {
      this.items && this.updateItems(this.items! as Items, type);
    });
    this.viewOption.setOnViewItemContainerListener((type) => {
      this.dailyItems.onActive(type);
      this.weeklyItems.onActive(type);
    });
    this.viewOption.attatchTo(this.element, 'afterbegin');

    const itemsContainer = this.element.querySelector(
      '.items__container'
    )! as HTMLElement;

    this.dailyItems.setOnRemoveItemListener((id, type) => {
      this.onRemoveItemListener && this.onRemoveItemListener(id, type, day);
    });
    this.dailyItems.setOnStateChangeListener((id, type, state, day) => {
      this.onStateChangeListener &&
        this.onStateChangeListener(id, type, day, state);
    });

    this.weeklyItems.setOnStateChangeListener((id, type, state, day) => {
      this.onStateChangeListener &&
        this.onStateChangeListener(id, type, day, state);
    });

    this.dailyItems.attatchTo(itemsContainer);
    this.weeklyItems.attatchTo(itemsContainer);

    const addButton = new AddButtonComponent(this.day);
    addButton.setOnBindDialogListener((type: DataType) => {
      this.onBindDialogListener && this.onBindDialogListener(type, this.day);
    });
    addButton.attatchTo(this.element, 'beforeend');
  }

  onActive(activedDay: DayType): void {
    this.element.classList.remove('active');
    this.viewOption.initViewOption();
    if (this.element.dataset.day === activedDay) {
      this.element.classList.add('active');
    }
  }

  updateItems(items: Items, type: FilterType = 'All') {
    this.items = items;
    const routineData = this.sortRoutine(this.items);
    const todoData = this.sortTodo(this.items, this.day);
    this.dailyItems.updateItems(routineData, todoData, this.day, type);
    this.weeklyItems.updateItems(routineData, todoData, this.day, type);
  }

  private sortRoutine(items: Items): RoutineMetaData[] {
    return Object.entries(items.Routine)
      .sort(([, a], [, b]) => {
        const aTime = a.time.replace(':', '');
        const bTime = b.time.replace(':', '');
        if (aTime > bTime) {
          return 1;
        } else {
          return -1;
        }
      })
      .map((value) => value[1]);
  }

  private sortTodo(items: Items, day: DayType): TodoMetaData[] {
    return Object.entries(items.Todo[day])
      .sort(([, a], [, b]) => {
        const aTime = a.time.replace(':', '');
        const bTime = b.time.replace(':', '');
        if (aTime > bTime) {
          return 1;
        } else {
          return -1;
        }
      })
      .map((value) => value[1]);
  }

  setOnRemoveItemListener(listener: OnRemoveItemListener) {
    this.onRemoveItemListener = listener;
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }

  setOnBindDialogListener(listener: OnBindDialogListener) {
    this.onBindDialogListener = listener;
  }
}

// PageComponent
export class PageComponent
  extends BaseComponent<HTMLElement>
  implements PageContainer
{
  private children: PageItemComponent[] = [];
  private items?: Items;
  private onRemoveItemListener?: OnRemoveItemListener;
  private onStateChangeListener?: OnStateChangeListener;
  private onBindDialogListener?: OnBindDialogListener;
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
      page.setOnRemoveItemListener((id, type, day) => {
        this.onRemoveItemListener && this.onRemoveItemListener(id, type, day);
      });
      page.setOnStateChangeListener((id, type, day, state) => {
        this.onStateChangeListener &&
          this.onStateChangeListener(id, type, day, state);
      });
      page.setOnBindDialogListener((type, day) => {
        this.onBindDialogListener && this.onBindDialogListener(type, day);
      });
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

  setOnRemoveItemListener(listener: OnRemoveItemListener) {
    this.onRemoveItemListener = listener;
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }

  setOnBindDialogListener(listener: OnBindDialogListener) {
    this.onBindDialogListener = listener;
  }
}
