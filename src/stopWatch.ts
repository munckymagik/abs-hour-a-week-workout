import { queryElement } from "./domHelpers";

class StopWatch {
  private display: Element;
  private stop: Element;
  private start: Element;
  private reset: Element;

  private startTimeMillis: number = 0;
  private intervalId?: number;

  constructor(selectorPrefix: string) {
    this.display = queryElement(`.${selectorPrefix}-display`);
    this.start = queryElement(`.${selectorPrefix}-start`);
    this.stop = queryElement(`.${selectorPrefix}-stop`);
    this.reset = queryElement(`.${selectorPrefix}-reset`);

    const self = this;

    this.start.addEventListener("click", () => {
      self.startTimeMillis = Date.now();
      self.intervalId = setInterval(() => {
        self.update();
      }, Math.floor(1000 / 30));
    });
    this.stop.addEventListener("click", () => {
      if (self.intervalId) {
        clearInterval(self.intervalId);
      }
    });
    this.reset.addEventListener("click", () => {
      self.startTimeMillis = 0;
    });
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
