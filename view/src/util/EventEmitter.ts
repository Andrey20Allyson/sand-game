export interface listenerStack {
    [event: string]: ((...args: any[]) => any)[];
}

export class EventEmitter {
    private listeners: listenerStack;

    constructor() {
        this.listeners = {}
    }

    on(event: string, listener: (...args: any[]) => any) {
        if (this.listeners[event]) {
            this.listeners[event].push(listener)
        
        } else {
            this.listeners[event] = [listener];
        }

        return this
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event])
            return false
        
        for (let listener of this.listeners[event]) 
            listener(...args)

        return true
    }

    removeListener(event: string, listener: (...args: any[]) => any) {
        if (!this.listeners[event])
            return false

        for (let index of this.listeners[event].keys()) {
            if (this.listeners[event][index] === listener) {
                this.listeners[event].splice(index, 1);

                if (this.listeners[event].length === 0)
                    delete this.listeners[event];

                return true;
            }
        }

        return false
    }
}