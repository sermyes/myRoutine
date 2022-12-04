import { BaseComponent } from '../component/component.js';
import { Component } from './../component/component.js';

type DataType = 'Routine' | 'Todo';
type OnCloseListener = () => void;
type OnAddListener = () => void;
interface DialogInputData extends Component {
  get title(): string;
  get time(): string;
  get type(): string;
}

export class Dialog
  extends BaseComponent<HTMLElement>
  implements DialogInputData
{
  private dataType: DataType;
  private onCloseListener?: OnCloseListener;
  private onAddListener?: OnAddListener;
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
              <span class="dialog__error">Please enter at least one charator</span>
              <button type="submit" class="dialog__submit">ADD</button>
            </div>
					</form>
				</dialog>
			</section">
		`);

    this.dataType = 'Routine';
    this.setType(this.dataType);
    const error = this.element.querySelector(
      '.dialog__error'
    )! as HTMLSpanElement;

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
      this.onCloseListener && this.onCloseListener();
      this.removeActive(error);
    });

    const addBtn = this.element.querySelector(
      '.dialog__submit'
    )! as HTMLButtonElement;
    const time = this.element.querySelector('#time')! as HTMLInputElement;
    const title = this.element.querySelector('#title')! as HTMLInputElement;

    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (title.value === '' || time.value === '') {
        this.addActive(error);
        return;
      }

      this.onAddListener && this.onAddListener();
    });
  }

  addActive(error: HTMLElement) {
    error.classList.add('active');
  }

  removeActive(error: HTMLElement) {
    error.classList.remove('active');
  }

  setType = (dataType: 'Routine' | 'Todo') => {
    const titleElement = this.element.querySelector(
      "label[for='title']"
    )! as HTMLLabelElement;
    if (dataType === 'Routine') {
      titleElement.innerText = 'Routine';
    } else {
      titleElement.innerText = 'Todo';
    }
    this.dataType = dataType;
  };

  setOnCloseListener = (listener: OnCloseListener) => {
    this.onCloseListener = listener;
  };

  setOnAddListener = (listener: OnAddListener) => {
    this.onAddListener = listener;
  };

  get time(): string {
    const time = this.element.querySelector('#time')! as HTMLInputElement;
    return time.value;
  }

  get title(): string {
    const title = this.element.querySelector('#title')! as HTMLInputElement;
    return title.value;
  }

  get type(): DataType {
    return this.dataType;
  }
}
