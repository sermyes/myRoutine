import {
  DataType,
  Items,
  RoutineMetaData,
  TodoMetaData
} from '../../../presenter.js';
import { BaseComponent, Component, DayType } from '../../component.js';

export interface ItemsContainer extends Component {
  updateItems(items: Items, day: DayType): void;
  refresh(items: RoutineMetaData[], type: DataType): void;
}

class ItemComponent extends BaseComponent<HTMLElement> {
  constructor(
    private item: RoutineMetaData | TodoMetaData,
    private type: DataType
  ) {
    super(`
			<li class="item">
				<span class="time"></span>
				<span class="title"></span>
				<div class="state_container">
					<button class="stateBtn">
						<i class="fas fa-check"></i>
					</button>
				</div>
				<button class="deleteBtn">
					<i class="fas fa-trash-alt"></i>
				</button>
			</li>
		`);

    const time = this.getTime(this.item.time);
    const timeElement = this.element.querySelector('.time')! as HTMLElement;
    timeElement.innerText = time;

    const titleElement = this.element.querySelector('.title')! as HTMLElement;
    if (this.type === 'Routine') {
      titleElement.innerText = this.item.title;
    } else {
      titleElement.innerHTML = `
				<span class="todo_icon"></span> 
				${this.item.title}
			`;
    }
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
  private items?: Items;
  constructor() {
    super(`
			<ul class="daily__items">
			</ul>
		`);
  }

  updateItems(items: Items, day: DayType) {
    this.items = items;
    const routineSortable = Object.entries(this.items.Routine)
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
    const todoSortable = Object.entries(this.items.Todo[day])
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

    routineSortable && this.refresh(routineSortable, 'Routine');
    todoSortable && this.refresh(todoSortable, 'Todo');
  }

  refresh(items: RoutineMetaData[] | TodoMetaData[], type: DataType) {
    items.forEach((item) => {
      const itemComponent = new ItemComponent(item, type);
      itemComponent.attatchTo(this.element, 'beforeend');
    });
  }
}
