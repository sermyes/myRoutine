export class Presenter {
    constructor() {
        this.items = {
            Routine: [],
            Todo: { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] }
        };
    }
    getItems() {
        return this.items;
    }
}
