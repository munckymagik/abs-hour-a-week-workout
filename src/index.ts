import { Application } from "./application";
import { loadConfig } from "./data";
import { StopWatch } from "./stopWatch";
import { UserInterface } from "./userInterface";

const init = (exercisesUrl: string) => {
  loadConfig(exercisesUrl).then((exerciseSets) => {
    const ui = new UserInterface();
    const application = new Application(ui, exerciseSets);
    application.run();

    const stopWatch = new StopWatch("stopwatch");
  });
};

window.addEventListener("load", () => init("./exercises.json"));
