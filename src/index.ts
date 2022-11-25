import './index.scss';
import {Control} from "@/Control";
import {Clock} from "@/clock";

class App extends Control<"div">{
    clock: Clock

    constructor(parent: HTMLElement) {
        super(parent, "div")
        this.clock = new Clock(this.node)
    }
}

new App(document.body)
