import { BaseComponent } from "./BaseComponent";

class Clock extends BaseComponent<"canvas"> {
  ctx: CanvasRenderingContext2D | null;
  frame: number | null = null;

  constructor(
    parent: HTMLElement,
    private clockColor: string,
    private fontSize: number
  ) {
    super(parent, "canvas");
    this.node.width = screen.availWidth;
    this.node.height = screen.availHeight;
    this.ctx = this.node.getContext("2d");

    const animate = () => {
      this.redraw();

      this.frame = requestAnimationFrame(animate);
    };

    animate();
  }

  redraw() {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.node.width, this.node.height);

    const date = new Date().toString();

    this.ctx.font = `${this.fontSize}px Aerial`;

    this.ctx.fillStyle = this.clockColor;

    this.ctx.textAlign = "center";

    this.ctx.fillText(date, this.node.width * 0.5, this.node.height * 0.5);
  }

  destroy(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }

    super.destroy();
  }
}

export { Clock };
