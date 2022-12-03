export type DataType = 'Routine' | 'Todo';
type MetaData = {
  type: DataType;
  time: string;
  title: string;
};
type TodoMetaData = MetaData & { state: 'completion' | null };
type RoutineMetaData = MetaData & { rest: DayType[] };
type DayType = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
type TodoData = {
  Mon: TodoMetaData[];
  Tue: TodoMetaData[];
  Wed: TodoMetaData[];
  Thu: TodoMetaData[];
  Fri: TodoMetaData[];
  Sat: TodoMetaData[];
  Sun: TodoMetaData[];
};

type Items = {
  Routine: RoutineMetaData[];
  Todo: TodoData;
};

export class Presenter {
  private items: Items;
  constructor() {
    this.items = {
      Routine: [],
      Todo: { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] }
    };
  }

  getItems() {
    return this.items;
  }

  // add
  // delete
  // change state
}
