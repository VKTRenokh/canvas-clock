import { BaseComponent } from "./BaseComponent";
import "./index.scss";
import { Clock } from "@/clock";

class App extends BaseComponent<"div"> {
  clock: Clock;

  constructor(parent: HTMLElement) {
    super(parent, "div");
    this.clock = new Clock(this.node, window.innerWidth, window.innerHeight);
  }
}

new App(document.body);
