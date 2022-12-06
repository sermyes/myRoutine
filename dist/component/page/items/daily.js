import { BaseComponent } from '../../component.js';
class ItemComponent extends BaseComponent {
    constructor(item, type) {
        super(`
			<li class="item" data-id="">
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
        this.item = item;
        this.type = type;
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
    }
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
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
    updateItems(items, day) {
        this.items = items;
        const routineSortable = Object.entries(this.items.Routine)
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
        const todoSortable = Object.entries(this.items.Todo[day])
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
        this.element.innerHTML = '';
        routineSortable && this.refresh(routineSortable, 'Routine');
        todoSortable && this.refresh(todoSortable, 'Todo');
    }
    refresh(items, type) {
        items.forEach((item) => {
            const itemComponent = new ItemComponent(item, type);
            itemComponent.setOnRemoveItemListener((id, type) => {
                this.onRemoveItemListener && this.onRemoveItemListener(id, type);
            });
            itemComponent.attatchTo(this.element, 'beforeend');
        });
    }
    setOnRemoveItemListener(listener) {
        this.onRemoveItemListener = listener;
    }
}
