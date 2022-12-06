export class Presenter {
    constructor() {
        this.items = {
            Routine: {},
            Todo: { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {} }
        };
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
    addItem(type, time, title, day) {
        const id = Date.now();
        let item = { id, time, title };
        if (type === 'Routine') {
            const routineItem = Object.assign(Object.assign({}, item), { state: {
                    Mon: null,
                    Tue: null,
                    Wed: null,
                    Thu: null,
                    Fri: null,
                    Sat: null,
                    Sun: null
                } });
            this.items[type][id] = routineItem;
        }
        else {
            const todoItem = Object.assign(Object.assign({}, item), { state: null });
            this.items[type][day][id] = todoItem;
        }
        return this.getItems();
    }
    removeItem(id, type, day) {
        if (type === 'Routine') {
            delete this.items[type][id];
        }
        else {
            delete this.items[type][day][id];
        }
        return this.getItems();
    }
    getItems() {
        return this.items;
    }
}
