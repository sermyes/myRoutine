import { BaseComponent } from '../../component.js';
class ItemComponent extends BaseComponent {
    constructor() {
        super(`
			<li class="item">
				<span class="time">오전 08:00</span>
				<span class="title">공복에 물마시기</span>
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
    }
}
export class DailyItemsComponent extends BaseComponent {
    constructor() {
        super(`
			<ul class="daily__items">
			</ul>
		`);
        const item = new ItemComponent();
        item.attatchTo(this.element, 'beforeend');
    }
}
