import { BaseComponent } from '../../component.js';
import { StateContainerComponent } from './state/state.js';
class ItemComponent extends BaseComponent {
    constructor(item, type, day) {
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
        const stateElement = this.element.querySelector('.state');
        const stateContainer = new StateContainerComponent(state);
        stateContainer.setOnStateChangeListener((state) => {
            this.onStateChangeListener &&
                this.onStateChangeListener(this.element.dataset.id, this.type, state);
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
			<ul class="daily__items">
			</ul>
		`);
    }
    updateItems(items, day, type) {
        this.items = items;
        const routineSortable = this.sortRoutine(this.items);
        const todoSortable = this.sortTodo(this.items, day);
        this.element.innerHTML = '';
        if (type === 'All') {
            routineSortable && this.refresh(routineSortable, 'Routine', day);
            todoSortable && this.refresh(todoSortable, 'Todo', day);
        }
        else if (type === 'Routine') {
            routineSortable && this.refresh(routineSortable, 'Routine', day);
        }
        else if (type === 'Todo') {
            todoSortable && this.refresh(todoSortable, 'Todo', day);
        }
    }
    sortRoutine(items) {
        return Object.entries(items.Routine)
            .sort(([, a], [, b]) => {
            const aTime = a.time.replace(':', '');
            const bTime = b.time.replace(':', '');
            if (aTime > bTime) {
                return 1;
            }
            else {
                return -1;
            }
        })
            .map((value) => value[1]);
    }
    sortTodo(items, day) {
        return Object.entries(items.Todo[day])
            .sort(([, a], [, b]) => {
            const aTime = a.time.replace(':', '');
            const bTime = b.time.replace(':', '');
            if (aTime > bTime) {
                return 1;
            }
            else {
                return -1;
            }
        })
            .map((value) => value[1]);
    }
    refresh(items, type, day) {
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
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
}
