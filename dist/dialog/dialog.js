import { BaseComponent } from '../component/component.js';
export class Dialog extends BaseComponent {
    constructor() {
        super(`
			<section class="modal">
				<dialog class="dialog__container">
					<form class="dialog">
						<button type="button" class="close">&times;</button>
						<div class="form__container">
							<div class="form__time">
								<label for="time">Time</label>
								<input type="time" id="time" required />
							</div>
							<div class="form__title">
								<label for="title"></label>
								<input type="text" id="title" minlength="1" required />
							</div>
						</div>
						<button type="submit" class="dialog__submit">ADD</button>
					</form>
				</dialog>
			</section">
		`);
        this.setType = (dataType) => {
            const titleElement = this.element.querySelector("label[for='title']");
            if (dataType === 'Routine') {
                titleElement.innerText = 'Routine';
            }
            else {
                titleElement.innerText = 'Todo';
            }
            this.dataType = dataType;
        };
        this.setOnCloseListener = (listener) => {
            this.onCloseListener = listener;
        };
        this.setOnAddListener = (listener) => {
            this.onAddListener = listener;
        };
        this.dataType = 'Routine';
        this.setType(this.dataType);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.onCloseListener && this.onCloseListener();
        });
        const addBtn = this.element.querySelector('.dialog__submit');
        addBtn.addEventListener('click', () => {
            this.onAddListener && this.onAddListener();
        });
    }
    get time() {
        const time = this.element.querySelector('#time');
        return time.value;
    }
    get title() {
        const title = this.element.querySelector('#title');
        return title.value;
    }
    get type() {
        return this.dataType;
    }
}
