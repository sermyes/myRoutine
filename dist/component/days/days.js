import { BaseComponent, Days } from '../component.js';
class DayItemComponent extends BaseComponent {
    constructor(state, text) {
        super(`
		<li class="day">
			<span class="day__text"></span>
			<div class="day__circle"></div>
		</li>
		`);
        this.state = state;
        this.text = text;
        this.element.dataset.day = text;
        const textElement = this.element.querySelector('.day__text');
        textElement.innerText = this.text;
        if (this.state === 'active') {
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
        if (state === 'active') {
            this.element.classList.add('active');
        }
        else {
            this.element.classList.remove('active');
        }
    }
    getActive() {
        if (this.element.matches('.active')) {
            return this.text;
        }
        return null;
    }
}
export class DaysComponent extends BaseComponent {
    constructor(today) {
        super(`
			<ul class="days">
			</ul>
 		`);
        this.today = today;
        this.children = [];
        this.addDays = (parent) => {
            for (let i = 1; i <= Days.length; i++) {
                const item = new DayItemComponent(this.today === i % Days.length ? 'active' : 'inactive', Days[i % Days.length]);
                this.children.push(item);
                item.setOnListener(() => {
                    this.children.forEach((component) => {
                        component.onActive('inactive');
                    });
                    item.onActive('active');
                });
                item.attatchTo(parent, 'beforeend');
            }
        };
        this.addDays(this.element);
    }
    getActivedDay() {
        let day;
        this.children.forEach((component) => {
            if (component.getActive() !== null) {
                day = component.getActive();
            }
        });
        return day;
    }
}
