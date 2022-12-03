import { BaseComponent } from '../component/component.js';
export class Dialog extends BaseComponent {
    constructor(dataType) {
        super(`
			<dialog class="dialog__container">
				<div class="dialog">
					<button class="close">&times;</button>
					<div id="dialog__body">
						<div class="form__container">
							<div class="form__time">
								<label for="time">Time</label>
								<input type="time" id="time" />
							</div>
							<div class="form__title">
								<label for="title"></label>
								<input type="text" id="title" />
							</div>
						</div>
					</div>
					<button class="dialog__submit">ADD</button>
				</div>
			</dialog>
		`);
        this.dataType = dataType;
        this.setOnCloseListener = (listener) => {
            this.onCloseListener = listener;
        };
        const titleElement = this.element.querySelector("label[for='title']");
        if (this.dataType === 'Routine') {
            titleElement.innerText = 'Routine';
        }
        else {
            titleElement.innerText = 'Todo';
        }
        const closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.onCloseListener && this.onCloseListener();
        });
    }
}
