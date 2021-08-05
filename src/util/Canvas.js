export default class Canvas {
    constructor({ domId }) {
        this.canvas = document.getElementById(domId);
        this.ctx = this.canvas.getContext('2d');
        this._shapeList = [];
        this._eventList = ['mousemove'];
    }

    addShape(shape) {
        this._shapeList.push(shape);
    }

    initEvent() {
        this._eventList.forEach(eventName => {
            this.canvas.addEventListener(eventName, this._eventHandler.bind(this));
        });
    }

    _eventHandler(e) {
        this._shapeList
            .filter(shape => {
                debugger
                return shape.isEventInRegion(e.x, e.y);
            })
            .forEach(shape => {
                debugger
                shape.emit(e);
            });
    }

}