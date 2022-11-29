export interface Component {
  attatchTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attatch(component: Component, position?: InsertPosition): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlStr: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlStr;
    this.element = template.content.firstElementChild! as T;
  }

  attatchTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    parent.removeChild(this.element);
  }

  attatch(component: Component, position?: InsertPosition) {
    component.attatchTo(this.element, position);
  }
}
