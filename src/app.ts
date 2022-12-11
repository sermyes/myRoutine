import { DayType } from './component/component.js';
import { DaysComponent, DaysContainer } from './component/days/days.js';
import { PageComponent, PageContainer } from './component/page/page.js';
import { Dialog, DialogContainer } from './component/dialog/dialog.js';
import { Items, Presenter, DataItemsContainer } from './presenter/presenter.js';

class App {
  private days: DaysContainer;
  private page: PageContainer;
  private daysContainer: HTMLElement;
  private pageContainer: HTMLElement;
  private today: number;
  private presenter: DataItemsContainer;
  private items: Items;
  private dialog: DialogContainer;
  constructor(private appRoot: HTMLElement) {
    this.presenter = new Presenter({
      Routine: {
        0: {
          id: 0,
          time: '14:00',
          title: 'test0',
          state: {
            Mon: 'cancel',
            Tue: 'cancel',
            Wed: 'cancel',
            Thu: 'cancel',
            Fri: 'cancel',
            Sat: 'cancel',
            Sun: 'cancel'
          }
        }
      },
      Todo: {
        Mon: {
          3: { id: 3, time: '08:00', title: 'test4', state: 'cancel' }
        },
        Tue: {
          5: { id: 5, time: '08:00', title: 'test5', state: 'cancel' }
        },
        Wed: {
          7: { id: 7, time: '05:00', title: 'test6', state: 'cancel' }
        },
        Thu: {},
        Fri: {
          9: { id: 9, time: '05:00', title: 'test8', state: 'cancel' }
        },
        Sat: {},
        Sun: {
          11: { id: 11, time: '05:00', title: 'test8', state: 'cancel' }
        }
      }
    });
    this.items = this.presenter.getItems();
    this.today = new Date().getDay();
    this.days = new DaysComponent(this.today);
    this.dialog = new Dialog();
    this.daysContainer = this.appRoot.querySelector(
      '.days__container'
    )! as HTMLElement;
    this.days.attatchTo(this.daysContainer);

    this.page = new PageComponent(this.days.getActivedDay()! as DayType);
    this.pageContainer = this.appRoot.querySelector(
      '.contents__container'
    )! as HTMLElement;
    this.page.setOnRemoveItemListener((id, type, day) => {
      this.items = this.presenter.removeItem(id, type, day);
      this.page.updateItems(this.items);
    });
    this.page.setOnStateChangeListener((id, type, day, state) => {
      this.items = this.presenter.updateItem(id, type, day, state);
      this.page.updateItems(this.items);
    });
    this.page.setOnBindDialogListener((type, day) => {
      this.dialog.setType(type);
      this.dialog.attatchTo(document.body);
      this.dialog.setOnCloseListener(() => {
        this.dialog.removeFrom(document.body);
      });

      this.dialog.setOnAddListener(() => {
        this.dialog.removeFrom(document.body);
        this.addItem(
          this.dialog.type,
          this.dialog.time,
          this.dialog.title,
          day! as DayType
        );
      });
    });
    this.page.attatchTo(this.pageContainer);
    this.bindDaysToPage(this.page);
    this.page.updateItems(this.items);
  }

  private bindDaysToPage(page: PageContainer) {
    const days = document.querySelector('.days')! as HTMLUListElement;
    days.addEventListener('click', (e) => {
      const target = e.target! as HTMLLIElement;
      if (target.dataset.day === undefined) {
        return;
      }
      page.setOnActiveChangeListener(target.dataset.day! as DayType);
    });
  }

  private addItem = (
    type: string,
    time: string,
    title: string,
    day: DayType
  ) => {
    const newItems = this.presenter.addItem(type, time, title, day);
    this.items = newItems;
    this.page.updateItems(this.items);
  };
}

new App(document.querySelector('.document')! as HTMLElement);
