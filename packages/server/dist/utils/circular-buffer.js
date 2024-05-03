"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularBuffer = void 0;
/**
 *	Circular buffer class.
 *	@param buffer	Array of type T
 *	@param head		Head index
 *	@param tail		Tail index
 *	@param isFull	Is buffer full
 */
class CircularBuffer {
    constructor(size = 20) {
        this.buffer = new Array(size);
        this.head = 0;
        this.tail = 0;
        this.isFull = false;
    }
    push(item) {
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.buffer.length;
        if (this.head === this.tail) {
            this.head = (this.head + 1) % this.buffer.length;
        }
        else if (this.isFull) {
            this.head = (this.head + 1) % this.buffer.length;
        }
        if (!this.isFull && this.head < this.tail) {
            this.isFull = true;
        }
    }
    toArray() {
        if (!this.isFull)
            return this.buffer.slice(this.head, this.tail);
        else
            return [...this.buffer.slice(this.tail), ...this.buffer.slice(0, this.tail)];
    }
    /**
     *	Parse circular buffers object into an object of arrays.
     *	@static
     *	@param buffers	Object of circular buffers
     *	@returns		Object of arrays
     */
    static parse_circular_buffers(buffers) {
        let data = {};
        for (const [key, buffer] of Object.entries(buffers))
            data[key] = buffer.toArray();
        return data;
    }
}
exports.CircularBuffer = CircularBuffer;
