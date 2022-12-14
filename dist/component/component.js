export const Days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];
export class BaseComponent {
    constructor(htmlStr) {
        const template = document.createElement('template');
        template.innerHTML = htmlStr;
        this.element = template.content.firstElementChild;
    }
    attatchTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
    removeFrom(parent) {
        parent.removeChild(this.element);
    }
}
