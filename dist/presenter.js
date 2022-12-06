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
                },
                2: {
                    id: 2,
                    time: '19:00',
                    title: 'test2',
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
                    4: { id: 4, time: '05:00', title: 'test4', state: 'cancel' },
                    5: { id: 5, time: '06:00', title: 'test5', state: 'cancel' }
                },
                Tue: {
                    3: { id: 3, time: '08:00', title: 'test3', state: 'cancel' },
                    4: { id: 4, time: '05:00', title: 'test4', state: 'cancel' },
                    5: { id: 5, time: '12:00', title: 'test6', state: 'cancel' }
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
                    Mon: 'cancel',
                    Tue: 'cancel',
                    Wed: 'cancel',
                    Thu: 'cancel',
                    Fri: 'cancel',
                    Sat: 'cancel',
                    Sun: 'cancel'
                } });
            this.items[type][id] = routineItem;
        }
        else {
            const todoItem = Object.assign(Object.assign({}, item), { state: 'cancel' });
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
    updateItem(id, type, day, state) {
        if (type === 'Routine') {
            this.items[type][id].state[day] = state;
        }
        else {
            this.items[type][day][id].state = state;
        }
        return this.getItems();
    }
    getItems() {
        return this.items;
    }
}
