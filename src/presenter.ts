import { DayType } from './component/component.js';

export type DataType = 'Routine' | 'Todo';
type MetaData = {
  id: number;
  time: string;
  title: string;
};
export type StateType = 'completion' | 'rest' | 'cancel';
export type RoutineState = {
  [K in DayType]: StateType;
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

export interface DataItemsContainer {
  addItem(type: string, time: string, title: string, day: DayType): Items;
  removeItem(id: string, type: DataType, day: DayType): Items;
  updateItem(id: string, type: DataType, day: DayType, state: StateType): Items;
  getItems(): Items;
}

export class Presenter implements DataItemsContainer {
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
            Mon: 'cancel',
            Tue: 'cancel',
            Wed: 'cancel',
            Thu: 'cancel',
            Fri: 'cancel',
            Sat: 'cancel',
            Sun: 'cancel'
          }
        },
        1: {
          id: 1,
          time: '04:00',
          title: 'test1',
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
          3: { id: 3, time: '08:00', title: 'test3', state: 'cancel' },
          4: { id: 4, time: '05:00', title: 'test4', state: 'cancel' }
        },
        Tue: {
          5: { id: 5, time: '08:00', title: 'test3', state: 'cancel' },
          6: { id: 6, time: '05:00', title: 'test4', state: 'cancel' }
        },
        Wed: {
          7: { id: 7, time: '05:00', title: 'test4', state: 'cancel' }
        },
        Thu: {
          8: { id: 8, time: '05:00', title: 'test4', state: 'cancel' }
        },
        Fri: {
          9: { id: 9, time: '05:00', title: 'test4', state: 'cancel' }
        },
        Sat: {
          10: { id: 10, time: '05:00', title: 'test4', state: 'cancel' }
        },
        Sun: {
          11: { id: 11, time: '05:00', title: 'test4', state: 'cancel' }
        }
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
          Mon: 'cancel',
          Tue: 'cancel',
          Wed: 'cancel',
          Thu: 'cancel',
          Fri: 'cancel',
          Sat: 'cancel',
          Sun: 'cancel'
        }
      };
      this.items[type][id] = routineItem;
    } else {
      const todoItem: TodoMetaData = { ...item, state: 'cancel' };
      this.items[type! as 'Todo'][day][id] = todoItem;
    }

    return this.getItems();
  }

  removeItem(id: string, type: DataType, day: DayType): Items {
    if (type === 'Routine') {
      delete this.items[type][id];
    } else {
      delete this.items[type][day][id];
    }
    return this.getItems();
  }

  updateItem(
    id: string,
    type: DataType,
    day: DayType,
    state: StateType
  ): Items {
    if (type === 'Routine') {
      (this.items[type][id]! as RoutineMetaData).state[day] = state;
    } else {
      (this.items[type][day][id]! as TodoMetaData).state = state;
    }
    return this.getItems();
  }

  getItems(): Items {
    return this.items;
  }
}
