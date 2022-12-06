import { DayType } from './component/component.js';

export type DataType = 'Routine' | 'Todo';
type MetaData = {
  id: number;
  time: string;
  title: string;
};
type StateType = 'completion' | 'rest' | null;
type RoutineState = {
  [K in DayType]: StateType | null;
};
export type TodoMetaData = MetaData & { state: StateType };
export type RoutineMetaData = MetaData & { state: RoutineState };
type TodoData = {
  [K in DayType]: {
    [key in string]: TodoMetaData;
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
        0: {
          id: 0,
          time: '14:00',
          title: 'test0',
          state: {
            Mon: null,
            Tue: null,
            Wed: null,
            Thu: null,
            Fri: null,
            Sat: null,
            Sun: null
          }
        },
        1: {
          id: 1,
          time: '04:00',
          title: 'test1',
          state: {
            Mon: null,
            Tue: null,
            Wed: null,
            Thu: null,
            Fri: null,
            Sat: null,
            Sun: null
          }
        },
        2: {
          id: 2,
          time: '19:00',
          title: 'test2',
          state: {
            Mon: null,
            Tue: null,
            Wed: null,
            Thu: null,
            Fri: null,
            Sat: null,
            Sun: null
          }
        }
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
    let item = { id, time, title };
    if (type === 'Routine') {
      const routineItem: RoutineMetaData = {
        ...item,
        state: {
          Mon: null,
          Tue: null,
          Wed: null,
          Thu: null,
          Fri: null,
          Sat: null,
          Sun: null
        }
      };
      this.items[type][id] = routineItem;
    } else {
      const todoItem: TodoMetaData = { ...item, state: null };
      this.items[type! as 'Todo'][day][id] = todoItem;
    }

    return this.getItems();
  }

  removeItem(id: string, type: DataType, day: DayType) {
    if (type === 'Routine') {
      delete this.items[type][id];
    } else {
      delete this.items[type][day][id];
    }
    return this.getItems();
  }

  getItems() {
    return this.items;
  }
}
