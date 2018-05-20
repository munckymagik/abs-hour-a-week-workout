import { queryElement } from "./domHelpers";

const zeroPad = (n: number) => ("00" + n).slice(-2);

class StopWatch {
  private container: Element;
  private display: Element;
  private startButton: Element;
  private resetbutton: Element;

  private frameInterval: number = Math.floor(1000 / 30);

  private startTimeMillis: number = 0;
  private stopTimeMillis: number = 0;
  private intervalId?: number;

  constructor(selectorPrefix: string) {
    this.container = queryElement(`#${selectorPrefix}`);
    this.display = queryElement(`.${selectorPrefix}-display`);
    this.startButton = queryElement(`.${selectorPrefix}-start`);
    this.resetbutton = queryElement(`.${selectorPrefix}-reset`);

    this.container.addEventListener("click", () => this.toggleState());
    this.resetbutton.addEventListener("click", (ev: Event) => {
      ev.stopPropagation();
      this.reset();
    });
  }

  private toggleState() {
    if (this.isStarted()) {
      this.stop();
    } else {
      this.start();
    }
  }

  private start() {
    if (this.stopTimeMillis === 0) {
      this.startTimeMillis = Date.now();
    } else {
      this.startTimeMillis += Date.now() - this.stopTimeMillis;
    }

    const self = this;
    this.intervalId = setInterval(() => {
      self.update();
    }, this.frameInterval);

    this.renderButtons();
  }

  private stop() {
    if (this.isStarted()) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;

      this.stopTimeMillis = Date.now();

      this.renderButtons();
    }
  }

  private isStarted() {
    return typeof this.intervalId !== "undefined";
  }

  private reset() {
    this.startTimeMillis = 0;
    this.stopTimeMillis = 0;

    this.renderDisplay(0, 0, 0);
  }

  private update() {
    const delta = Date.now() - this.startTimeMillis;

    const minutes = Math.floor(delta / 60000);
    const seconds = Math.floor((delta % 60000) / 1000);
    const centiseconds = Math.floor((delta % 1000) / 10);

    this.renderDisplay(minutes, seconds, centiseconds);
  }

  private renderDisplay(mins: number, secs: number, centis: number) {
    this.display.innerHTML = `${zeroPad(mins)}:${zeroPad(secs)}:${zeroPad(centis)}`;
  }

  private renderButtons() {
    if (this.isStarted()) {
      this.startButton.innerHTML = "Stop";
      this.resetbutton.setAttribute("disabled", "true");
    } else {
      this.startButton.innerHTML = "Start";
      this.resetbutton.removeAttribute("disabled");
    }
  }
}

export {
  StopWatch,
};
