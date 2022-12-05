import { BaseComponent, DayType } from '../../component.js';
import { Modal } from './../../modal/modal.js';

type RemoveItemMenuListener = () => void;

class AddItemMenuComponent extends BaseComponent<HTMLElement> {
  private removeItemMenuListener?: RemoveItemMenuListener;
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
    this.element.addEventListener('click', () => {
      this.removeItemMenuListener && this.removeItemMenuListener();
    });
  }

  setRemoveItemMenuListener(listener: RemoveItemMenuListener) {
    this.removeItemMenuListener = listener;
  }
}

export class AddButtonComponent extends BaseComponent<HTMLElement> {
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
        addItemMenu.setRemoveItemMenuListener(() => {
          this.removeItemMenu(addIco, modal, addItemMenu, addBtn);
        });
      }
    });
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
