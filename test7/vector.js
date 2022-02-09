
export class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  dot(other) {
    return this.x*other.x + this.y*other.y;
  }

  cross(other) {
    return this.x*other.y - other.x*this.y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}

