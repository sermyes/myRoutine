import { BaseComponent } from '../../../component.js';
class StateComponent extends BaseComponent {
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
            const target = e.target;
            if (target.matches('.stateMenu')) {
                return;
            }
            this.onStateChangeListener &&
                this.onStateChangeListener(target.dataset.state);
        });
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
}
export class StateContainerComponent extends BaseComponent {
    constructor(state) {
        super(`
			<div class="state_container">
				<div class="stateBtn">
				</div>
			</div>
		`);
        const stateBtn = this.element.querySelector('.stateBtn');
        if (state === 'completion') {
            stateBtn.innerHTML = `<i class="fas fa-check"></i>`;
        }
        else if (state === 'rest') {
            stateBtn.innerHTML = `<i class="fas fa-umbrella-beach"></i>`;
        }
        const stateMenu = new StateComponent();
        stateMenu.setOnStateChangeListener((state) => {
            this.onStateChangeListener && this.onStateChangeListener(state);
        });
        this.element.addEventListener('click', () => {
            if (this.element.matches('.active')) {
                this.element.classList.remove('active');
                stateMenu.removeFrom(this.element);
            }
            else {
                this.element.classList.add('active');
                stateMenu.attatchTo(this.element);
            }
        });
    }
    setOnStateChangeListener(listener) {
        this.onStateChangeListener = listener;
    }
}
