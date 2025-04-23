class Paddle {
  constructor() {
    this.w = 100;
    this.h = 20;
    this.reset();
  }

  reset() {
    this.x = width / 2 - this.w / 2;
    this.y = height - 40;
    this.speed = 7;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    this.x = constrain(this.x, 0, width - this.w);
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}
