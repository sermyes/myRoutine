import { Component, DayType } from './component/component.js';
import { DaysComponent, Days } from './component/days/days.js';
import { PageComponent } from './component/page/page.js';
import { Dialog } from './dialog/dialog.js';
import { Items, Presenter } from './presenter.js';

class App {
  private days: Days & Component;
  private page: PageComponent;
  private daysContainer: HTMLElement;
  private pageContainer: HTMLElement;
  private today: number;
  private activedPage: HTMLElement;
  private presenter: Presenter;
  private items: Items;
  constructor(private appRoot: HTMLElement) {
    this.presenter = new Presenter();
    this.items = this.presenter.getItems();
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

    // 1. 초기 data 보여주기.
    this.page.updateItems(this.items);

    // 2. 데이터 추가시 refresh.
    // 3. 데이터 삭제시 refresh.
    // 4. 상태변경시 refresh.
    // 5. weekly 보여주기.
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
      const day = addMenu.dataset.day;
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
          this.addItem(dialog.type, dialog.time, dialog.title, day! as DayType);
        });
      });
    });
  };

  private addItem = (
    type: string,
    time: string,
    title: string,
    day: DayType
  ) => {
    const newItems = this.presenter.addItem(type, time, title, day);
    this.items = newItems;
    console.log(this.items);
  };
}

new App(document.querySelector('.document')! as HTMLElement);
