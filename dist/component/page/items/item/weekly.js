import { BaseComponent } from '../../../component.js';
import { StateContainerComponent } from './state/state.js';
class WeeklyItemComponent extends BaseComponent {
    constructor(item, type, day) {
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
        this.item = item;
        this.type = type;
        this.day = day;
        this.element.dataset.id = this.item.id + '';
        const titleElement = this.element.querySelector('.title');
        if (this.type === 'Routine') {
            titleElement.innerText = this.item.title;
        }
        else {
            titleElement.innerHTML = `
				<span class="todo_icon"></span> 
				${this.item.title}
			`;
        }
        if (this.type === 'Todo') {
            const days = this.element.querySelectorAll('.weekly_day');
            days.forEach((day) => {
                const dayElement = day;
                if (dayElement.dataset.day !== this.day) {
                    dayElement.classList.add('inactive');
                }
            });
        }
        const stateElements = this.element.querySelectorAll('.weekly_state');
        stateElements.forEach((element) => {
            const el = element;
            const day = el.dataset.day;
            let state;
            if (this.type === 'Todo') {
                state = day === this.day ? this.item.state : 'cancel';
            }
            else {
                state = this.item.state[day];
            }
            const stateContainer = new StateContainerComponent(state);
            stateContainer.setOnStateChangeListener((state) => {
                this.onStateChangeListener &&
                    this.onStateChangeListener(this.element.dataset.id, this.type, state, day);
            });
            stateContainer.attatchTo(el);
        });
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
}
export class WeeklyItemsComponent extends BaseComponent {
    constructor() {
        super(`
			<ul class="weekly__items">
			</ul>
		`);
    }
    updateItems(routineData, todoData, day, type) {
        this.element.innerHTML = '';
        if (type === 'All') {
            this.refresh(routineData, 'Routine', day);
            this.refresh(todoData, 'Todo', day);
        }
        else if (type === 'Routine') {
            this.refresh(routineData, 'Routine', day);
        }
        else if (type === 'Todo') {
            this.refresh(todoData, 'Todo', day);
        }
    }
    refresh(items, type, day) {
        items.forEach((item) => {
            const itemComponent = new WeeklyItemComponent(item, type, day);
            itemComponent.setOnStateChangeListener((id, type, state, day) => {
                this.onStateChangeListener &&
                    this.onStateChangeListener(id, type, state, day);
            });
            itemComponent.attatchTo(this.element, 'beforeend');
        });
    }
    onActive(type) {
        if (type === 'weekly') {
            this.element.classList.add('active');
        }
        else {
            this.element.classList.remove('active');
        }
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
}
