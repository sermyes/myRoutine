import { Component } from './component/component.js';
import { DaysComponent, Days } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';

class App {
  private days: Days & Component;
  private page: PageComponent;
  private daysContainer: HTMLElement;
  private pageContainer: HTMLElement;
  private today: number;
  constructor(private appRoot: HTMLElement) {
    this.today = new Date().getDay();
    this.days = new DaysComponent(this.today);
    this.daysContainer = this.appRoot.querySelector(
      '.days__container'
    )! as HTMLElement;
    this.days.attatchTo(this.daysContainer);

    this.page = new PageComponent();
    this.pageContainer = this.appRoot.querySelector(
      '.contents__container'
    )! as HTMLElement;
    this.page.attatchTo(this.pageContainer);

    console.log(this.days.getActivedDay());
  }
}

new App(document.querySelector('.document')! as HTMLElement);
