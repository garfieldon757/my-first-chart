export default class Event {
    constructor() {
        // 事件监听器
        this._listener = {};
    }

    on(type, handler) {
        if(!this._listener[type]) {
            this._listener[type] = [handler];
        }
        this._listener[type].push(handler);
    }

    emit(e) {
        if(!this._listener[e.type]) {
            console.warn('wrong type event!');
            return;
        }
        this._listener[e.type].forEach(handler => {
            debugger
            handler();
        });
    }
}