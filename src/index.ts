import { BaseComponent } from "./BaseComponent";
import "./index.scss";
import { Clock } from "@/clock";

class App extends BaseComponent<"div"> {
  clock: Clock;

  constructor(parent: HTMLElement) {
    super(parent, "div");
    this.clock = new Clock(this.node, "000", 30);
  }
}

new App(document.body);
