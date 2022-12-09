import {
  DataType,
  RoutineMetaData,
  StateType,
  TodoMetaData
} from '../../../presenter.js';
import { DayType } from '../../component.js';
import { FilterType, ViewType } from '../viewOption/viewOption.js';
import { Component } from './../../component';

export type OnStateChangeListener = (
  id: string,
  type: DataType,
  state: StateType,
  day: DayType
) => void;

export interface ItemImpl extends Component {
  setOnStateChangeListener(listener: OnStateChangeListener): void;
}

export interface ItemsContainer extends ItemImpl {
  updateItems(
    routineData: RoutineMetaData[],
    todoData: TodoMetaData[],
    day: DayType,
    type: FilterType
  ): void;
  refresh(items: RoutineMetaData[], type: DataType, day: DayType): void;
  onActive(type: ViewType): void;
}
