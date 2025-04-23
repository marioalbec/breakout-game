class Ball {
  constructor() {
    this.r = 12;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height - 60;
    this.vx = random([-4, 4]);
    this.vy = -5;
  }

  speedUp(level) {
    this.vy -= level; // más velocidad por nivel
  }

  update(paddle, blocks) {
    this.x += this.vx;
    this.y += this.vy;

    // colisiones con bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0) this.vy *= -1;

    // paddle
    if (
      this.y + this.r > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.w
    ) {
      this.vy *= -1;
      this.y = paddle.y - this.r;
    }

    // bloques
    blocks.forEach(block => {
      if (!block.broken &&
          this.x > block.x &&
          this.x < block.x + block.w &&
          this.y - this.r < block.y + block.h &&
          this.y + this.r > block.y
      ) {
        block.hit();
        this.vy *= -1;
      }
    });
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.r * 2);
  }
}
