import {
  DataType,
  RoutineMetaData,
  RoutineState,
  StateType,
  TodoMetaData
} from '../../../../presenter.js';
import { BaseComponent, DayType } from '../../../component.js';
import { FilterType, ViewType } from '../../viewOption/viewOption.js';
import { ItemImpl, OnStateChangeListener, ItemsContainer } from '../items.js';
import { StateContainerComponent } from './state/state.js';

class WeeklyItemComponent
  extends BaseComponent<HTMLElement>
  implements ItemImpl
{
  private onStateChangeListener?: OnStateChangeListener;
  constructor(
    private item: RoutineMetaData | TodoMetaData,
    private type: DataType,
    private day: DayType
  ) {
    super(`
			<li class="weekly_item">
				<div class="title_container">
					<span class="title"></span>
				</div>
				<div>
					<ul class="weekly_days">
						<li class="weekly_day" data-day="Mon">
							<span class="weekly_text">Mon</span>
							<div class="weekly_state" data-day="Mon"></div>
						</li>
						<li class="weekly_day" data-day="Tue">
							<span class="weekly_text">Tue</span>
							<div class="weekly_state" data-day="Tue"></div>
						</li>
						<li class="weekly_day" data-day="Wed">
							<span class="weekly_text">Wed</span>
							<div class="weekly_state" data-day="Wed"></div>
						</li>
						<li class="weekly_day" data-day="Thu">
							<span class="weekly_text">Thu</span>
							<div class="weekly_state" data-day="Thu"></div>
						</li>
						<li class="weekly_day" data-day="Fri">
							<span class="weekly_text">Fri</span>
							<div class="weekly_state" data-day="Fri"></div>
						</li>
						<li class="weekly_day" data-day="Sat">
							<span class="weekly_text">Sat</span>
							<div class="weekly_state" data-day="Sat"></div>
						</li>
						<li class="weekly_day" data-day="Sun">
							<span class="weekly_text">Sun</span>
							<div class="weekly_state" data-day="Sun"></div>
						</li>
					</ul>
				</div>
			</li>
		`);

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

    if (this.type === 'Todo') {
      const days = this.element.querySelectorAll('.weekly_day');
      days.forEach((day) => {
        const dayElement = day! as HTMLElement;
        if (dayElement.dataset.day !== this.day) {
          dayElement.classList.add('inactive');
        }
      });
    }

    const stateElements = this.element.querySelectorAll('.weekly_state');
    stateElements.forEach((element) => {
      const el = element! as HTMLElement;
      const day = el.dataset.day! as DayType;
      let state: StateType;
      if (this.type === 'Todo') {
        state = day === this.day ? (this.item.state! as StateType) : 'cancel';
      } else {
        state = (this.item.state! as RoutineState)[day];
      }
      const stateContainer = new StateContainerComponent(state! as StateType);
      stateContainer.setOnStateChangeListener((state) => {
        this.onStateChangeListener &&
          this.onStateChangeListener(
            this.element.dataset.id! as string,
            this.type,
            state,
            day
          );
      });
      stateContainer.attatchTo(el);
    });
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }
}

export class WeeklyItemsComponent
  extends BaseComponent<HTMLElement>
  implements ItemsContainer
{
  private onStateChangeListener?: OnStateChangeListener;
  constructor() {
    super(`
			<ul class="weekly__items">
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
      const itemComponent = new WeeklyItemComponent(item, type, day);
      itemComponent.setOnStateChangeListener((id, type, state, day) => {
        this.onStateChangeListener &&
          this.onStateChangeListener(id, type, state, day);
      });
      itemComponent.attatchTo(this.element, 'beforeend');
    });
  }

  onActive(type: ViewType) {
    if (type === 'weekly') {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }
}
