import { DayType } from './component/component.js';

export type DataType = 'Routine' | 'Todo';
type MetaData = {
  type: DataType;
  time: string;
  title: string;
};
type TodoMetaData = MetaData & { state: 'completion' | null };
type RoutineMetaData = MetaData & { rest: DayType[] };
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

  addItem() {}

  getItems() {
    return this.items;
  }

  // add
  // delete
  // change state
}
