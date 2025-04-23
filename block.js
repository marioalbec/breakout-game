class Block {
  constructor(x, y, strength = 1) {
    this.x = x;
    this.y = y;
    this.w = 78;
    this.h = 28;
    this.strength = strength;
    this.broken = false;
  }

  display() {
    if (this.broken) return;
    if (this.strength === -1) fill(120); // irrompible
    else fill(map(this.strength, 1, 3, 255, 100), 100, 200);
    rect(this.x, this.y, this.w, this.h);
  }

  hit() {
    if (this.strength === -1) return;
    this.strength--;
    if (this.strength <= 0) {
      this.broken = true;
      score++;
    }
  }
}
