import { queryElement } from "./domHelpers";

class StopWatch {
  private display: Element;
  private startButton: Element;
  private resetbutton: Element;

  private frameInterval: number = Math.floor(1000 / 30);

  private startTimeMillis: number = 0;
  private intervalId?: number;

  constructor(selectorPrefix: string) {
    this.display = queryElement(`.${selectorPrefix}-display`);
    this.startButton = queryElement(`.${selectorPrefix}-start`);
    this.resetbutton = queryElement(`.${selectorPrefix}-reset`);

    this.startButton.addEventListener("click", () => this.toggleState());
    this.resetbutton.addEventListener("click", () => this.reset());
  }

  private toggleState() {
    if (this.isStarted()) {
      this.stop();
    } else {
      this.start();
    }
  }

  private start() {
    this.startTimeMillis = Date.now();

    const self = this;
    this.intervalId = setInterval(() => {
      self.update();
    }, this.frameInterval);

    this.startButton.innerHTML = "Stop";
    this.resetbutton.setAttribute("disabled", "true");
  }

  private stop() {
    if (this.isStarted()) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;

      this.startButton.innerHTML = "Start";
      this.resetbutton.removeAttribute("disabled");
    }
  }

  private isStarted() {
    return typeof this.intervalId !== "undefined";
  }

  private reset() {
    this.startTimeMillis = 0;
    this.display.innerHTML = "00:00:00";
  }

  private update() {
    const pad = (n: number) => ("00" + n).slice(-2);
    const delta = Date.now() - this.startTimeMillis;
    const minutes = Math.floor(delta / 60000);
    const seconds = Math.floor((delta % 60000) / 1000);
    const centiseconds = Math.floor((delta % 1000) / 10);
    this.display.innerHTML = `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  }
}

export {
  StopWatch,
};
