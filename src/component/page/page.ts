import { BaseComponent, Component } from '../component.js';

type DayType = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
type ClickListener = () => void;
const Days: DayType[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
interface DaysContainer extends Component {
  setOnListener(listener: ClickListener): void;
  onActive(state: 'add' | 'remove'): void;
}

class DaysItemComponent
  extends BaseComponent<HTMLElement>
  implements DaysContainer
{
  private onClickListener?: ClickListener;
  constructor(private text: DayType, private day: number) {
    super(`
		<li class="day">
			<span class="day__text"></span>
			<div class="day__circle"></div>
		</li>
		`);

    const textElement = this.element.querySelector(
      '.day__text'
    )! as HTMLSpanElement;
    textElement.innerText = this.text;

    if (Days[this.day] === text) {
      this.element.classList.add('today');
      this.element.classList.add('active');
    }

    this.element.addEventListener('click', () => {
      this.onClickListener && this.onClickListener();
    });
  }

  setOnListener(listener: ClickListener): void {
    this.onClickListener = listener;
  }

  onActive(state: 'add' | 'remove') {
    if (state === 'add') {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }
}

export class DaysComponent extends BaseComponent<HTMLElement> {
  private today: number;
  private children: DaysItemComponent[] = [];
  constructor() {
    super(`
			<ul class="days">
			</ul>
 		`);
    this.today = new Date().getDay();
    this.addDays(this.element);
  }

  private addDays = (parent: HTMLElement) => {
    for (let i = 1; i <= Days.length; i++) {
      const item = new DaysItemComponent(
        Days[i % Days.length]! as DayType,
        this.today
      );
      this.children.push(item);

      item.setOnListener(() => {
        this.children.forEach((component) => {
          component.onActive('remove');
        });

        item.onActive('add');
      });
      item.attatchTo(parent, 'beforeend');
    }
  };
}
