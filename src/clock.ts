import {Control} from "@/Control";

class Clock extends Control<'canvas'> {
    ctx: CanvasRenderingContext2D | null

    constructor(parent: HTMLElement) {
        super(parent, "canvas");
        this.node.width = screen.availWidth
        this.node.height = screen.availHeight
        this.ctx = this.node.getContext('2d')
        if (this.ctx) {
            // this.ctx.fillStyle = "#000"
            // this.ctx.fillRect(0, 0, this.node.width, this.node.height)
        }

        setInterval(() => this.tick())
    }

    tick(ctx?: CanvasRenderingContext2D) {
        const time = new Date().toLocaleTimeString();
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.node.width, this.node.height)
            this.ctx.font = "bold 70px verdana, sans-serif";
            // const textWidth = this.ctx.measureText(time).width
            this.ctx.fillStyle = "#f0f"; //<======= and here
            // this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(time, (this.node.width / 2), (this.node.height / 2));
        }
    }
}

export {
    Clock
}
