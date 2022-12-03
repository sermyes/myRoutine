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

    const addBtns = document.querySelectorAll('.addBtn');
    addBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e.target === btn) {
          const parent = btn.parentElement! as HTMLElement;
          const ico = btn.querySelector('.addIcon')! as HTMLElement;
          const addMenu = parent.querySelector('.addMenu')! as HTMLElement;
          if (ico.matches('.rotate')) {
            addMenu.addEventListener('click', this.bindElementToDialog);
          }
        }
      });
    });
    // data
  }

  private bindDaysToPage(page: PageComponent) {
    const days = document.querySelector('.days')! as HTMLUListElement;
    days.addEventListener('click', (e) => {
      const target = e.target! as HTMLLIElement;
      page.setOnActiveChangeListener(target.dataset.day! as DayType);
    });
  }

  private bindElementToDialog(e: Event) {
    const btnContainer = e.currentTarget! as HTMLUListElement;
    const day = btnContainer.dataset.day;
    const btn = e.target! as HTMLLIElement;
    let dialog: Dialog;

    console.log(day);
    if (btn.matches('.addRoutine')) {
      dialog = new Dialog('Routine');
    } else {
      dialog = new Dialog('Todo');
    }
    dialog.attatchTo(document.body);
    dialog.setOnCloseListener(() => {
      dialog.removeFrom(document.body);
    });

    dialog.setOnAddListener(() => {
      dialog.removeFrom(document.body);
      this.addItem(dialog.type, dialog.time, dialog.title);
    });
  }

  private addItem(type: string, time: string, title: string) {
    console.log(type, time, title);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
