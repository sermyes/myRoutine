import { BaseComponent } from '../../component.js';
export class ItemComponent extends BaseComponent {
    constructor() {
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
    }
}
export class ItemConatainerComponent {
    constructor() { }
}
