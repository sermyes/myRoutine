import { BaseComponent } from '../../../component.js';
import { StateContainerComponent } from './state/state.js';
class DailyItemComponent extends BaseComponent {
    constructor(item, type, day) {
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
        this.item = item;
        this.type = type;
        this.day = day;
        const time = this.getTime(this.item.time);
        const timeElement = this.element.querySelector('.time');
        timeElement.innerText = time;
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
        const deleteBtn = this.element.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => {
            this.onRemoveItemListener &&
                this.onRemoveItemListener(this.element.dataset.id, this.type);
        });
        const state = this.type === 'Todo'
            ? this.item.state
            : this.item.state[this.day];
        const stateElement = this.element.querySelector('.daily_state');
        const stateContainer = new StateContainerComponent(state);
        stateContainer.setOnStateChangeListener((state) => {
            this.onStateChangeListener &&
                this.onStateChangeListener(this.element.dataset.id, this.type, state, this.day);
        });
        stateContainer.attatchTo(stateElement);
    }
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
    getTime(time) {
        let [hour, min] = time.split(':');
        let h = parseInt(hour);
        if (h > 12) {
            return h - 12 < 10 ? `오후 0${h - 12}:${min}` : `오후 ${h - 12}:${min}`;
        }
        else {
            return `오전 ${time}`;
        }
    }
}
export class DailyItemsComponent extends BaseComponent {
    constructor() {
        super(`
			<ul class="daily__items active">
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
    onActive(type) {
        if (type === 'daily') {
            this.element.classList.add('active');
        }
        else {
            this.element.classList.remove('active');
        }
    }
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
}
