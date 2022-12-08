import { DataType } from '../../../presenter.js';
import { BaseComponent, DayType } from '../../component.js';
import { Modal } from './../../modal/modal.js';

type RemoveItemMenuListener = () => void;
type OnBindDialogListener = (type: DataType) => void;

interface ItemMenuContainer extends addButtonContainer {
  setRemoveItemMenuListener(listener: RemoveItemMenuListener): void;
}

export interface addButtonContainer {
  setOnBindDialogListener(listener: OnBindDialogListener): void;
}

export class AddItemMenuComponent
  extends BaseComponent<HTMLElement>
  implements ItemMenuContainer
{
  private removeItemMenuListener?: RemoveItemMenuListener;
  private onBindDialogListener?: OnBindDialogListener;
  constructor(private day: DayType) {
    super(`
      <ul class="addMenu">
        <li class="addRoutine">
          <span class="addText">Routine</span>
          <button class="add">
            <i class="fas fa-plus addIcon"></i>
          </button>
        </li>
        <li class="addTodo">
          <span class="addText">Todo</span>
          <button class="add">
            <i class="fas fa-check"></i>
          </button>
        </li>
      </ul>
    `);

    this.element.dataset.day = this.day;
    this.element.addEventListener('click', (e) => {
      const textElement = (e.target! as HTMLElement).querySelector(
        '.addText'
      )! as HTMLSpanElement;
      this.removeItemMenuListener && this.removeItemMenuListener();
      this.onBindDialogListener &&
        this.onBindDialogListener(textElement.innerText! as DataType);
    });
  }

  setRemoveItemMenuListener(listener: RemoveItemMenuListener) {
    this.removeItemMenuListener = listener;
  }

  setOnBindDialogListener(listener: OnBindDialogListener) {
    this.onBindDialogListener = listener;
  }
}

export class AddButtonComponent
  extends BaseComponent<HTMLElement>
  implements addButtonContainer
{
  private onBindDialogListener?: OnBindDialogListener;
  constructor(private day: DayType) {
    super(`
			<div class="content__footer">
				<button class="addBtn add">
					<i class="fas fa-plus addIcon"></i>
				</button>
			</div>
		`);
    const modal = new Modal();
    const addItemMenu = new AddItemMenuComponent(this.day);
    this.onAddItemMenu(modal, addItemMenu);
  }

  private onAddItemMenu(modal: Modal, addItemMenu: AddItemMenuComponent): void {
    const addBtn = this.element.querySelector('.addBtn')! as HTMLButtonElement;
    const addIco = this.element.querySelector('.addIcon')! as HTMLElement;

    addBtn.addEventListener('click', () => {
      if (addIco.matches('.rotate')) {
        this.removeItemMenu(addIco, modal, addItemMenu, addBtn);
      } else {
        this.addItemMenu(addIco, modal, addItemMenu, addBtn);
        addItemMenu.setOnBindDialogListener((type: DataType) => {
          this.onBindDialogListener && this.onBindDialogListener(type);
        });
        addItemMenu.setRemoveItemMenuListener(() => {
          this.removeItemMenu(addIco, modal, addItemMenu, addBtn);
        });
      }
    });
  }

  setOnBindDialogListener(listener: OnBindDialogListener) {
    this.onBindDialogListener = listener;
  }

  private removeItemMenu(
    addIco: HTMLElement,
    modal: Modal,
    addItemMenu: AddItemMenuComponent,
    addBtn: HTMLButtonElement
  ) {
    addIco.classList.remove('rotate');
    modal.removeFrom(this.element);
    addItemMenu.removeFrom(this.element);
    addBtn.classList.remove('active');
  }

  private addItemMenu(
    addIco: HTMLElement,
    modal: Modal,
    addItemMenu: AddItemMenuComponent,
    addBtn: HTMLButtonElement
  ) {
    addIco.classList.add('rotate');
    modal.attatchTo(this.element, 'afterbegin');
    addItemMenu.attatchTo(this.element, 'beforeend');
    addBtn.classList.add('active');
  }
}
