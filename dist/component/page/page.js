import { BaseComponent } from '../component.js';
const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
class DaysItemComponent extends BaseComponent {
    constructor(text, day) {
        super(`
		<li class="day">
			<span class="day__text"></span>
			<div class="day__circle"></div>
		</li>
		`);
        this.text = text;
        this.day = day;
        const textElement = this.element.querySelector('.day__text');
        textElement.innerText = this.text;
        if (Days[this.day] === text) {
            this.element.classList.add('today');
            this.element.classList.add('active');
        }
        this.element.addEventListener('click', () => {
            this.onClickListener && this.onClickListener();
        });
    }
    setOnListener(listener) {
        this.onClickListener = listener;
    }
    onActive(state) {
        if (state === 'add') {
            this.element.classList.add('active');
        }
        else {
            this.element.classList.remove('active');
        }
    }
}
export class DaysComponent extends BaseComponent {
    constructor() {
        super(`
			<ul class="days">
			</ul>
 		`);
        this.children = [];
        this.addDays = (parent) => {
            for (let i = 1; i <= Days.length; i++) {
                const item = new DaysItemComponent(Days[i % Days.length], this.today);
                this.children.push(item);
                item.setOnListener(() => {
                    this.children.forEach((component) => {
                        component.onActive('remove');
                    });
                    item.onActive('add');
                });
                item.attatchTo(parent, 'beforeend');
            }
        };
        this.today = new Date().getDay();
        this.addDays(this.element);
    }
}
