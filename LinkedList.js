import Node from "./Node.js"

export default class LinkedList {
  #dummyHead;
  #tail;
  #size;

  constructor() {
    this.#dummyHead = new Node();
    this.#tail = this.#dummyHead;
    this.#size = 0;
  }

  append(value) {
    this.#tail.nextNode = new Node(value);
    this.#tail = this.#tail.nextNode;
    this.#size++;
  }

  prepend(value) {
    if (this.#size === 0) {
      this.append(value);
      return;
    }

    const node = new Node(value, this.#dummyHead.nextNode);
    this.#dummyHead.nextNode = node;
    this.#size++;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#dummyHead.nextNode;
  }

  at(index) {
    if (index >= this.#size) return null;

    let ptr = this.#dummyHead.nextNode;
    for (let i = 0; i < index; i++) {
      ptr = ptr.nextNode;
    }

    return ptr;
  }

  pop() {
    if (this.#size <= 0) return;

    let ptr = this.#dummyHead;

    while (ptr.nextNode) {
      if (!ptr.nextNode.nextNode) {
        ptr.nextNode = null;
        this.#tail = ptr;
        this.#size--;
        return;
      }
      ptr = ptr.nextNode;
    }
  }

  contains(value) {
    let ptr = this.#dummyHead.nextNode;

    while (ptr) {
      if (ptr.value === value) return true;
      ptr = ptr.nextNode;
    }

    return false;
  }

  find(value) {
    let ptr = this.#dummyHead.nextNode;

    while (ptr) {
      if (ptr.value === value) return ptr;
      ptr = ptr.nextNode;
    }

    return null;
  }

  insertAt(value, index) {
    if (index < 0 || index >= this.#size) return;

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.#size - 1) {
      this.append(value);
      return;
    }

    let ptr = this.#dummyHead;

    for (let i = 0; i < index; i++) {
      ptr = ptr.nextNode;
    }

    const node = new Node(value, ptr.nextNode);
    ptr.nextNode = node;
    this.#size++;
  }

  removeAt(index) {
    if (index < 0 || index >= this.#size) return;

    if (index === this.#size - 1) {
      this.pop();
      return;
    }

    let ptr = this.#dummyHead;

    for (let i = 0; i < index; i++) {
      ptr = ptr.nextNode;
    }

    ptr.nextNode = ptr.nextNode.nextNode;
    this.#size--;
  }

  toString() {
    let ptr = this.#dummyHead.nextNode;
    const result = [];

    while (ptr) {
      result.push(`( ${ptr.value} )`);
      ptr = ptr.nextNode;
    }

    result.push(`( ${null} )`);

    return result.join(' -> ');
  }
}
