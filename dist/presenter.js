export class Presenter {
    constructor() {
        this.items = {
            Routine: {},
            Todo: { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {} }
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
