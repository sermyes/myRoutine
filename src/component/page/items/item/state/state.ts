import { StateType } from '../../../../../presenter.js';
import { BaseComponent } from '../../../../component.js';
import { Component } from '../../../../component.js';
import { Modal } from './../../../../modal/modal.js';

type OnStateChangeListener = (state: StateType) => void;
interface StateImpl extends Component {
  setOnStateChangeListener(listener: OnStateChangeListener): void;
}

class StateComponent extends BaseComponent<HTMLElement> implements StateImpl {
  private onStateChangeListener?: OnStateChangeListener;
  constructor() {
    super(`
			<ul class="stateMenu">
				<li data-state="completion">
					<i class="fas fa-check"></i>
					<span>completion</span>
				</li>
				<li data-state="rest">
					<i class="fas fa-umbrella-beach"></i>
					<span>rest</span>
				</li>
				<li data-state="cancel">
					<i class="fas fa-eraser"></i>
					<span>cancel</span>
				</li>
			</ul>		
		`);

    this.element.addEventListener('click', (e) => {
      const target = e.target! as HTMLElement;
      if (target.matches('.stateMenu')) {
        return;
      }

      this.onStateChangeListener &&
        this.onStateChangeListener(target.dataset.state! as StateType);
    });
  }

  setOnStateChangeListener(listener: OnStateChangeListener) {
    this.onStateChangeListener = listener;
  }
}

export class StateContainerComponent
  extends BaseComponent<HTMLElement>
  implements StateImpl
{
  private onStateChangeListener?: OnStateChangeListener;
  constructor(state: StateType) {
    super(`
			<div class="state_container">
				<div class="stateBtn">
				</div>
			</div>
		`);
    const modal = new Modal();
    const stateBtn = this.element.querySelector('.stateBtn')! as HTMLElement;
    if (state === 'completion') {
      stateBtn.innerHTML = `<i class="fas fa-check"></i>`;
    } else if (state === 'rest') {
      stateBtn.innerHTML = `<i class="fas fa-umbrella-beach"></i>`;
    }

    const stateMenu = new StateComponent();
    stateMenu.setOnStateChangeListener((state) => {
      this.onStateChangeListener && this.onStateChangeListener(state);
    });

    this.element.addEventListener('click', () => {
      if (this.element.matches('.active')) {
        modal.removeFrom(this.element);
        this.element.classList.remove('active');
        stateMenu.removeFrom(this.element);
      } else {
        modal.attatchTo(this.element);
        this.element.classList.add('active');
        stateMenu.attatchTo(this.element);
      }
    });
  }

  setOnStateChangeListener(listener: OnStateChangeListener): void {
    this.onStateChangeListener = listener;
  }
}
