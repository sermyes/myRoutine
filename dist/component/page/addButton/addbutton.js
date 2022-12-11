import { BaseComponent } from '../../component.js';
import { Modal } from './../../modal/modal.js';
export class AddItemMenuComponent extends BaseComponent {
    constructor(day) {
        super(`
      <ul class="addMenu">
        <li class="addRoutine menuItem">
          <span class="addText">Routine</span>
          <button class="add">
            <i class="fas fa-plus addIcon"></i>
          </button>
        </li>
        <li class="addTodo menuItem">
          <span class="addText">Todo</span>
          <button class="add">
            <i class="fas fa-check"></i>
          </button>
        </li>
      </ul>
    `);
        this.day = day;
        this.element.dataset.day = this.day;
        this.element.addEventListener('click', (e) => {
            const target = e.target;
            const textElement = target.querySelector('.addText');
            if (!target.matches('.menuItem')) {
                return;
            }
            this.removeItemMenuListener && this.removeItemMenuListener();
            this.onBindDialogListener &&
                this.onBindDialogListener(textElement.innerText);
        });
    }
    setRemoveItemMenuListener(listener) {
        this.removeItemMenuListener = listener;
    }
    setOnBindDialogListener(listener) {
        this.onBindDialogListener = listener;
    }
}
export class AddButtonComponent extends BaseComponent {
    constructor(day) {
        super(`
			<div class="content__footer">
				<button class="addBtn add">
					<i class="fas fa-plus addIcon"></i>
				</button>
			</div>
		`);
        this.day = day;
        const modal = new Modal();
        const addItemMenu = new AddItemMenuComponent(this.day);
        this.onAddItemMenu(modal, addItemMenu);
    }
    onAddItemMenu(modal, addItemMenu) {
        const addBtn = this.element.querySelector('.addBtn');
        const addIco = this.element.querySelector('.addIcon');
        addBtn.addEventListener('click', () => {
            if (addIco.matches('.rotate')) {
                this.removeItemMenu(addIco, modal, addItemMenu, addBtn);
            }
            else {
                this.addItemMenu(addIco, modal, addItemMenu, addBtn);
                addItemMenu.setOnBindDialogListener((type) => {
                    this.onBindDialogListener && this.onBindDialogListener(type);
                });
                addItemMenu.setRemoveItemMenuListener(() => {
                    this.removeItemMenu(addIco, modal, addItemMenu, addBtn);
                });
            }
        });
    }
    setOnBindDialogListener(listener) {
        this.onBindDialogListener = listener;
    }
    removeItemMenu(addIco, modal, addItemMenu, addBtn) {
        addIco.classList.remove('rotate');
        modal.removeFrom(this.element);
        addItemMenu.removeFrom(this.element);
        addBtn.classList.remove('active');
    }
    addItemMenu(addIco, modal, addItemMenu, addBtn) {
        addIco.classList.add('rotate');
        modal.attatchTo(this.element, 'afterbegin');
        addItemMenu.attatchTo(this.element, 'beforeend');
        addBtn.classList.add('active');
    }
}
