import {
  DataType,
  Items,
  RoutineMetaData,
  RoutineState,
  StateType,
  TodoMetaData
} from '../../../presenter.js';
import { BaseComponent, Component, DayType } from '../../component.js';
import { FilterType } from '../viewOption/viewOption.js';
import { StateContainerComponent } from './state/state.js';

type OnRemoveItemListener = (id: string, type: DataType) => void;
type OnStateChangeListener = (
  id: string,
  type: DataType,
  state: StateType
) => void;
interface ItemContainer extends Component {
  setOnRemoveItemListener(listener: OnRemoveItemListener): void;
  setOnStateChangeListener(listener: OnStateChangeListener): void;
}

export interface ItemsContainer extends Component, ItemContainer {
  updateItems(items: Items, day: DayType, type: FilterType): void;
  refresh(items: RoutineMetaData[], type: DataType, day: DayType): void;
}

class ItemComponent
  extends BaseComponent<HTMLElement>
  implements ItemContainer
{
  private onRemoveItemListener?: OnRemoveItemListener;
  private onStateChangeListener?: OnStateChangeListener;
  constructor(
    private item: RoutineMetaData | TodoMetaData,
    private type: DataType,
    private day: DayType
  ) {
    super(`
			<li class="item" data-id="">
				<span class="time"></span>
				<span class="title"></span>
				<div class="state"></div>
				<button class="deleteBtn">
					<i class="fas fa-trash-alt"></i>
				</button>
			</li>
		`);

    const time = this.getTime(this.item.time);
    const timeElement = this.element.querySelector('.time')! as HTMLElement;
    timeElement.innerText = time;
    this.element.dataset.id = this.item.id + '';

    const titleElement = this.element.querySelector('.title')! as HTMLElement;
    if (this.type === 'Routine') {
      titleElement.innerText = this.item.title;
    } else {
      titleElement.innerHTML = `
				<span class="todo_icon"></span> 
				${this.item.title}
			`;
    }

    const deleteBtn = this.element.querySelector(
      '.deleteBtn'
    )! as HTMLButtonElement;
    deleteBtn.addEventListener('click', () => {
      this.onRemoveItemListener &&
        this.onRemoveItemListener(
          this.element.dataset.id! as string,
          this.type
        );
    });
    const state =
      this.type === 'Todo'
        ? this.item.state
        : (this.item.state! as RoutineState)[this.day];
    const stateElement = this.element.querySelector('.state')! as HTMLElement;
    const stateContainer = new StateContainerComponent(state! as StateType);
    stateContainer.setOnStateChangeListener((state) => {
      this.onStateChangeListener &&
        this.onStateChangeListener(
          this.element.dataset.id! as string,
          this.type,
          state
        );
    });
    stateContainer.attatchTo(stateElement);
  }

  setOnRemoveItemListener(listener: OnRemoveItemListener) {
    this.onRemoveItemListener = listener;
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }

  private getTime(time: string): string {
    let [hour, min] = time.split(':');
    let h: number = parseInt(hour! as string);
    if (h > 12) {
      return h - 12 < 10 ? `오후 0${h - 12}:${min}` : `오후 ${h - 12}:${min}`;
    } else {
      return `오전 ${time}`;
    }
  }
}

export class DailyItemsComponent
  extends BaseComponent<HTMLElement>
  implements ItemsContainer
{
  private onRemoveItemListener?: OnRemoveItemListener;
  private onStateChangeListener?: OnStateChangeListener;
  private items?: Items;
  constructor() {
    super(`
			<ul class="daily__items">
			</ul>
		`);
  }

  updateItems(items: Items, day: DayType, type: FilterType) {
    this.items = items;
    const routineSortable = this.sortRoutine(this.items);
    const todoSortable = this.sortTodo(this.items, day);

    this.element.innerHTML = '';
    if (type === 'All') {
      routineSortable && this.refresh(routineSortable, 'Routine', day);
      todoSortable && this.refresh(todoSortable, 'Todo', day);
    } else if (type === 'Routine') {
      routineSortable && this.refresh(routineSortable, 'Routine', day);
    } else if (type === 'Todo') {
      todoSortable && this.refresh(todoSortable, 'Todo', day);
    }
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

  refresh(
    items: RoutineMetaData[] | TodoMetaData[],
    type: DataType,
    day: DayType
  ) {
    items.forEach((item) => {
      const itemComponent = new ItemComponent(item, type, day);
      itemComponent.setOnRemoveItemListener((id, type) => {
        this.onRemoveItemListener && this.onRemoveItemListener(id, type);
      });
      itemComponent.setOnStateChangeListener((id, type, state) => {
        this.onStateChangeListener &&
          this.onStateChangeListener(id, type, state);
      });
      itemComponent.attatchTo(this.element, 'beforeend');
    });
  }

  setOnRemoveItemListener(listener: OnRemoveItemListener) {
    this.onRemoveItemListener = listener;
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }
}
