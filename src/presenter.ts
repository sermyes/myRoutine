import { DayType } from './component/component.js';

export type DataType = 'Routine' | 'Todo';
type MetaData = {
  time: string;
  title: string;
};
type TodoMetaData = MetaData & { state: 'completion' | null };
type RoutineMetaData = TodoMetaData & { rest: DayType[] };
type TodoData = {
  [K in DayType]: {
    [key in number]: TodoMetaData;
  };
};
type RoutineData = {
  [K in number]: RoutineMetaData;
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
