import {
  DataType,
  RoutineMetaData,
  RoutineState,
  StateType,
  TodoMetaData
} from '../../../../presenter.js';
import { BaseComponent, DayType } from '../../../component.js';
import { FilterType, ViewType } from '../../viewOption/viewOption.js';
import { ItemContainer, OnStateChangeListener } from '../items.js';
import { StateContainerComponent } from './state/state.js';
import { ItemsContainer } from './../items';

type OnRemoveItemListener = (id: string, type: DataType) => void;

interface DailyItemContainer extends ItemContainer {
  setOnRemoveItemListener(listener: OnRemoveItemListener): void;
}

class DailyItemComponent
  extends BaseComponent<HTMLElement>
  implements DailyItemContainer
{
  private onRemoveItemListener?: OnRemoveItemListener;
  private onStateChangeListener?: OnStateChangeListener;
  constructor(
    private item: RoutineMetaData | TodoMetaData,
    private type: DataType,
    private day: DayType
  ) {
    super(`
			<li class="daily_item" data-id="">
				<span class="time"></span>
				<span class="title"></span>
				<div class="daily_state"></div>
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
    const stateElement = this.element.querySelector(
      '.daily_state'
    )! as HTMLElement;
    const stateContainer = new StateContainerComponent(state! as StateType);
    stateContainer.setOnStateChangeListener((state) => {
      this.onStateChangeListener &&
        this.onStateChangeListener(
          this.element.dataset.id! as string,
          this.type,
          state,
          this.day
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
  implements ItemsContainer, DailyItemContainer
{
  private onRemoveItemListener?: OnRemoveItemListener;
  private onStateChangeListener?: OnStateChangeListener;
  constructor() {
    super(`
			<ul class="daily__items active">
			</ul>
		`);
  }

  updateItems(
    routineData: RoutineMetaData[],
    todoData: TodoMetaData[],
    day: DayType,
    type: FilterType
  ) {
    this.element.innerHTML = '';
    if (type === 'All') {
      this.refresh(routineData, 'Routine', day);
      this.refresh(todoData, 'Todo', day);
    } else if (type === 'Routine') {
      this.refresh(routineData, 'Routine', day);
    } else if (type === 'Todo') {
      this.refresh(todoData, 'Todo', day);
    }
  }

  refresh(
    items: RoutineMetaData[] | TodoMetaData[],
    type: DataType,
    day: DayType
  ) {
    items.forEach((item) => {
      const itemComponent = new DailyItemComponent(item, type, day);
      itemComponent.setOnRemoveItemListener((id, type) => {
        this.onRemoveItemListener && this.onRemoveItemListener(id, type);
      });
      itemComponent.setOnStateChangeListener((id, type, state, day) => {
        this.onStateChangeListener &&
          this.onStateChangeListener(id, type, state, day);
      });
      itemComponent.attatchTo(this.element, 'beforeend');
    });
  }

  onActive(type: ViewType) {
    if (type === 'daily') {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  setOnRemoveItemListener(listener: OnRemoveItemListener) {
    this.onRemoveItemListener = listener;
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }
}
