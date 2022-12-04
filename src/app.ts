import { Component, DayType } from './component/component.js';
import { DaysComponent, Days } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './dialog/dialog.js';

class App {
  private days: Days & Component;
  private page: PageComponent;
  private daysContainer: HTMLElement;
  private pageContainer: HTMLElement;
  private today: number;
  private activedPage: HTMLElement;
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

    this.activedPage = this.page.getActivedPage();
    this.bindDaysToPage(this.page);
    this.bindElementToDialog();
  }

  private bindDaysToPage(page: PageComponent) {
    const days = document.querySelector('.days')! as HTMLUListElement;
    days.addEventListener('click', (e) => {
      const target = e.target! as HTMLLIElement;
      page.setOnActiveChangeListener(target.dataset.day! as DayType);
      this.activedPage = page.getActivedPage();
      this.bindElementToDialog();
    });
  }

  private bindElementToDialog = () => {
    const dialog = new Dialog();
    const addBtn = this.activedPage.querySelector(
      '.addBtn'
    )! as HTMLButtonElement;
    addBtn.addEventListener('click', () => {
      const addMenu = this.activedPage.querySelector(
        '.addMenu'
      )! as HTMLElement;
      addMenu.addEventListener('click', (e) => {
        const target = e.target! as HTMLElement;
        if (target.matches('.addRoutine')) {
          dialog.setType('Routine');
        } else {
          dialog.setType('Todo');
        }

        dialog.attatchTo(document.body);
        dialog.setOnCloseListener(() => {
          dialog.removeFrom(document.body);
        });

        dialog.setOnAddListener(() => {
          dialog.removeFrom(document.body);
        });
      });
    });
  };

  // private addItem = (
  //   type: string,
  //   time: string,
  //   title: string,
  //   day: string
  // ) => {
  //   console.log(type, time, title, day);
  // };
}

new App(document.querySelector('.document')! as HTMLElement);
