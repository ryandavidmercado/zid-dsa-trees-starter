class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else {
      const side = key < this.key ? "left" : "right";
      if (this[side] === null) {
        this[side] = new BinarySearchTree(key, value, this);
      } else {
        this[side].insert(key, value, this);
      }
    }
  }
  _findNode(key) {
    if (this.key === key) return this;
    else {
      const side = key < this.key ? "left" : "right";
      if (this[side]) return this[side]._findNode(key);
      else throw new Error("Key Not Found");
    }
  }
  find(key) {
    return this._findNode(key).value;
  }
  _findMin() {
    if (!this.left) return this;
    return this._findMin(this.left);
  }
  remove(nodeOrKey) {
    const node =
      typeof nodeOrKey === "number" ? this._findNode(nodeOrKey) : nodeOrKey;

    const hasParent = !!node.parent;
    let parentSide;
    if (hasParent) {
      parentSide = node.key < node.parent.key ? "left" : "right";
    }

    if (!node.left && !node.right) {
      if (hasParent) node.parent[parentSide] = null;
    } else if (!node.left || !node.right) {
      const child = node.left || node.right;
      if (hasParent) {
        child.parent = node.parent;
        node.parent[parentSide] = child;
      }
    } else {
      const replacement = node.right._findMin();
      node.remove(replacement);
      node.key = replacement.key;
      node.value = replacement.value;
    }
  }
}

const test = new BinarySearchTree(20, "hey");
test.insert(15, "don't");
test.insert(17, "write");
test.insert(16, "yourself");
test.insert(21, "off");
test.insert(23, "yet");

console.log(test);
test.remove(15);
console.log(test);
