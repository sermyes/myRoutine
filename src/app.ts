import { Component, DayType } from './component/component.js';
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

    this.page = new PageComponent(this.days.getActivedDay()! as DayType);
    this.pageContainer = this.appRoot.querySelector(
      '.contents__container'
    )! as HTMLElement;
    this.page.attatchTo(this.pageContainer);

    this.bindDaysToPage(this.page);
  }

  private bindDaysToPage(page: PageComponent) {
    const days = document.querySelectorAll('.day');
    days.forEach((day) => {
      day.addEventListener('click', () => {
        page.setOnActiveChangeListener(
          day.children[0]?.textContent! as DayType
        );
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement);
