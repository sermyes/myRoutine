import { Component, DayType } from './component/component.js';
import { DaysComponent, Days } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './dialog/dialog.js';
import { Modal } from './component/modal/modal.js';
// import { Presenter } from './presenter.js';

class App {
  private days: Days & Component;
  private page: PageComponent;
  private daysContainer: HTMLElement;
  private pageContainer: HTMLElement;
  private today: number;
  constructor(private appRoot: HTMLElement, private dialogRoot: HTMLElement) {
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

    const modal = new Modal();
    const addFooter = document.querySelector(
      '.content__footer'
    )! as HTMLElement;
    const addBtn = addFooter.querySelector('.addBtn')! as HTMLButtonElement;
    addBtn.addEventListener('click', () => {
      const addBtnContainer = addFooter.querySelector(
        '.addMenu'
      )! as HTMLUListElement;
      addBtnContainer && this.bindElementToDialog(modal, addBtnContainer);
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

  private bindElementToDialog(modal: Modal, addBtnContainer: HTMLElement) {
    addBtnContainer.addEventListener('click', (e) => {
      const btnContainer = e.currentTarget! as HTMLUListElement;
      const day = btnContainer.dataset.day;
      const btn = e.target! as HTMLLIElement;
      let dialog: Dialog;

      console.log(day);
      modal.attatchTo(this.dialogRoot);
      if (btn.matches('.addRoutine')) {
        dialog = new Dialog('Routine');
      } else {
        dialog = new Dialog('Todo');
      }

      modal.attatch(dialog);
      modal.attatchTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        modal.removeFrom(this.dialogRoot);
      });

      dialog.setOnAddListener(() => {
        console.log(dialog.time, dialog.title);
        modal.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
