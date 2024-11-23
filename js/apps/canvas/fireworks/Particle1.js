import CanvasOption from './CanvasOption.js';
export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDeg) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.gravity = 0.12;
    this.friction = 0.93;
    this.colorDeg = colorDeg
  }
  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.01;
  }
  draw() {
    this.context.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`;
    this.context.beginPath();
    this.context.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
  }
}
