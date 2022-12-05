export class Presenter {
    constructor() {
        this.items = {
            Routine: {},
            Todo: { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {} }
        };
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
    addItem(type, time, title, day) {
        const id = Date.now();
        let item = { id, time, title, state: null };
        if (type === 'Routine') {
            const routineItem = Object.assign(Object.assign({}, item), { rest: [] });
            this.items[type][id] = routineItem;
        }
        else {
            this.items[type][day][id] = item;
        }
        return this.items;
    }
    removeItem() { }
    getItems() {
        return this.items;
    }
}
