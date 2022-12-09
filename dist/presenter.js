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
