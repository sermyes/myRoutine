import { BaseComponent } from '../../component.js';

class ItemComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`
			<li class="item">
				<span class="time">오후 08:00</span>
				<span class="title">공복에 물마시기123123123</span>
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

export class WeeklyItemsComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`
			<ul class="weekly__items">
			</ul>
		`);

    const item = new ItemComponent();
    item.attatchTo(this.element, 'beforeend');
  }
}
