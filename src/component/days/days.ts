import { BaseComponent, Component, DayType, Days } from '../component.js';

type ClickListener = () => void;
type ActiveState = 'active' | 'inactive';
interface DaysContainer extends Component {
  setOnListener(listener: ClickListener): void;
  onActive(state: ActiveState): void;
  getActive(): DayType | null;
}

export interface Days {
  getActivedDay(): DayType;
}

class DaysItemComponent
  extends BaseComponent<HTMLElement>
  implements DaysContainer
{
  private onClickListener?: ClickListener;
  constructor(private state: ActiveState, private text: DayType) {
    super(`
		<li class="day">
			<span class="day__text"></span>
			<div class="day__circle"></div>
		</li>
		`);

    this.element.dataset.day = text;
    const textElement = this.element.querySelector(
      '.day__text'
    )! as HTMLSpanElement;
    textElement.innerText = this.text;

    if (this.state === 'active') {
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

  onActive(state: ActiveState) {
    if (state === 'active') {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  getActive(): DayType | null {
    if (this.element.matches('.active')) {
      return this.text;
    }

    return null;
  }
}

export class DaysComponent extends BaseComponent<HTMLElement> implements Days {
  private children: DaysItemComponent[] = [];
  constructor(private today: number) {
    super(`
			<ul class="days">
			</ul>
 		`);
    this.addDays(this.element);
  }

  private addDays = (parent: HTMLElement) => {
    for (let i = 1; i <= Days.length; i++) {
      const item = new DaysItemComponent(
        this.today === i % Days.length ? 'active' : 'inactive',
        Days[i % Days.length]! as DayType
      );
      this.children.push(item);

      item.setOnListener(() => {
        this.children.forEach((component) => {
          component.onActive('inactive');
        });

        item.onActive('active');
      });

      item.attatchTo(parent, 'beforeend');
    }
  };

  getActivedDay(): DayType {
    let day: DayType | null;
    this.children.forEach((component) => {
      if (component.getActive() !== null) {
        day = component.getActive();
      }
    });

    return day! as DayType;
  }
}
