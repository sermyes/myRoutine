import { BaseComponent } from '../component.js';

export class Modal extends BaseComponent<HTMLElement> {
  constructor() {
    super(`
			<section class="modal">
			</>
		`);
  }
}
