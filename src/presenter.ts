import { DayType } from './component/component.js';

export type DataType = 'Routine' | 'Todo';
type MetaData = {
  id: number;
  time: string;
  title: string;
};
export type TodoMetaData = MetaData & { state: 'completion' | null };
export type RoutineMetaData = TodoMetaData & { rest: DayType[] };
type TodoData = {
  [K in DayType]: {
    [key in number]: TodoMetaData;
  };
};
type RoutineData = {
  [K in string]: RoutineMetaData;
};
export type Items = {
  Routine: RoutineData;
  Todo: TodoData;
};

export class Presenter {
  private items: Items;
  constructor() {
    this.items = {
      Routine: {},
      Todo: { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {} }
    };

    // test data
    this.items = {
      Routine: {
        0: { id: 0, time: '14:00', title: 'test0', state: null, rest: [] },
        1: { id: 1, time: '04:00', title: 'test1', state: null, rest: [] },
        2: { id: 2, time: '19:00', title: 'test2', state: null, rest: [] }
      },
      Todo: {
        Mon: {
          3: { id: 3, time: '08:00', title: 'test3', state: null },
          4: { id: 4, time: '05:00', title: 'test4', state: null },
          5: { id: 5, time: '06:00', title: 'test5', state: null }
        },
        Tue: {
          3: { id: 3, time: '08:00', title: 'test3', state: null },
          4: { id: 4, time: '05:00', title: 'test4', state: null },
          5: { id: 5, time: '12:00', title: 'test6', state: null }
        },
        Wed: {},
        Thu: {},
        Fri: {},
        Sat: {},
        Sun: {}
      }
    };
  }

  addItem(type: string, time: string, title: string, day: DayType): Items {
    const id = Date.now();
    let item = { id, time, title, state: null };
    if (type === 'Routine') {
      const routineItem: RoutineMetaData = { ...item, rest: [] };
      this.items[type][id] = routineItem;
    } else {
      this.items[type! as 'Todo'][day][id] = item;
    }

    return this.items;
  }

  removeItem() {}

  getItems() {
    return this.items;
  }

  // add
  // delete
  // change state
}
