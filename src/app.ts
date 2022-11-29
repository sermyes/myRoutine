import { Component } from './component/component.js';
import { DaysComponent } from './component/page/page.js';

class App {
  private days: Component;
  private daysContainer: HTMLElement;
  constructor(private appRoot: HTMLElement) {
    this.days = new DaysComponent();
    this.daysContainer = this.appRoot.querySelector(
      '.days__container'
    )! as HTMLElement;
    this.days.attatchTo(this.daysContainer);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
