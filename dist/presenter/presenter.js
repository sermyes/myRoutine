export class Presenter {
    constructor(initData = {
        Routine: {},
        Todo: { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {} }
    }) {
        this.initData = initData;
        this.items = this.initData;
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
