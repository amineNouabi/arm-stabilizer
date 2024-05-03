
/**
 *	Circular buffer class.
 *	@param buffer	Array of type T
 *	@param head		Head index
 *	@param tail		Tail index
 *	@param isFull	Is buffer full
 */
export class CircularBuffer<T> {
	private buffer: Array<T>;
	head: number;
	tail: number;
	isFull: Boolean;

	constructor(size: number=20) {
		this.buffer = new Array<T>(size);
		this.head = 0;
		this.tail = 0;
		this.isFull = false;
	}

	push(item: T) {
		this.buffer[this.tail] = item;
		this.tail = (this.tail + 1) % this.buffer.length;
		if (this.head === this.tail) {
			this.head = (this.head + 1) % this.buffer.length;
		} else if (this.isFull) {
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
	static parse_circular_buffers(buffers: Record<string, CircularBuffer<number>>) {
		let data: Record<string, number[]> = {};
	
		for (const [key, buffer] of Object.entries(buffers))
			data[key] = buffer.toArray();

		return data;
	}
}
