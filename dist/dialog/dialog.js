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
						<div class="dialog__footer">
              <span class="dialog__error"></span>
              <button type="submit" class="dialog__submit">ADD</button>
            </div>
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
        const error = this.element.querySelector('.dialog__error');
        const closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.onCloseListener && this.onCloseListener();
            this.removeActive(error);
        });
        const addBtn = this.element.querySelector('.dialog__submit');
        const time = this.element.querySelector('#time');
        const title = this.element.querySelector('#title');
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (time.value === '' || title.value === '') {
                error.innerText =
                    time.value === ''
                        ? 'Please enter time !'
                        : 'Please enter at least one charactor !';
                this.addActive(error);
                return;
            }
            this.onAddListener && this.onAddListener();
            time.value = '';
            title.value = '';
        });
    }
    addActive(error) {
        error.classList.add('active');
    }
    removeActive(error) {
        error.classList.remove('active');
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
