const app = () => {
  interface IExerciseSet {
    readonly title: string;
    readonly notes: string;
    readonly choices: string[];
  }

  // Based on https://stackoverflow.com/a/6274381/369171
  function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const clearChildren = (parent: Node) => {
    while (parent.firstChild) { parent.removeChild(parent.firstChild); }
  };

  const newSelectionRandomizer = (exercises: string[], parent: Node) => () => {
    clearChildren(parent);

    // Make a copy so we don't mutate the original
    const selectedExercises = exercises.map((e) => e);

    // Now shuffle the copy
    shuffle(selectedExercises);

    // Select 5 exercises
    selectedExercises.slice(0, 5).forEach((exerciseName) => {
      const newLi = document.createElement("li");
      newLi.innerHTML = exerciseName;
      parent.appendChild(newLi);
    });
  };

  const loadConfig = (path: string): Promise<IExerciseSet[]> => {
    return fetch(path).then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          new Error(
            `Failed to load exercise list. ` +
            `${response.status} ${response.statusText} ${response.url}`,
          ),
        );
      }
    });
  };

  class UserInterface {
    get button(): Element {
      return this.queryElement("#randomize");
    }

    get list(): Element {
      return this.queryElement("#exercise-list");
    }

    get notes(): Element {
      return this.queryElement("#set-notes");
    }

    get selector(): HTMLSelectElement {
      return this.queryElement("#set-selector") as HTMLSelectElement;
    }

    public initExerciseSetSelector(exerciseSets: IExerciseSet[]) {
      const selectorElement = this.selector;

      clearChildren(selectorElement);

      exerciseSets.forEach((exerciseSet, index) => {
        const newOpt = document.createElement("option");
        newOpt.innerHTML = exerciseSet.title;
        newOpt.setAttribute("value", index.toString());

        selectorElement.appendChild(newOpt);
      });
    }

    private queryElement(selector: string): Element {
      const element = document.querySelector(selector);
      if (null !== element) {
        return element;
      } else {
        throw new Error(`Could not locate '${selector}' element`);
      }
    }
  }

  class Application {
    private ui: UserInterface;
    private exercisesUrl: string;

    constructor(ui: UserInterface, exercisesUrl: string) {
      this.ui = ui;
      this.exercisesUrl = exercisesUrl;
    }

    public run() {
      const ui = this.ui;

      const promisedConfig = loadConfig(this.exercisesUrl);

      promisedConfig.then((exercises) => {
        ui.initExerciseSetSelector(exercises);

        let mutSelectedSet = exercises[0];
        let mutRefreshSelection = newSelectionRandomizer(mutSelectedSet.choices, ui.list);

        const update = () => {
          ui.notes.innerHTML = mutSelectedSet.notes;
          mutRefreshSelection();
        };

        ui.selector.addEventListener("change", () => {
          const selectedOption = ui.selector.options[ui.selector.selectedIndex];
          const index = parseInt(selectedOption.value, 10);

          mutSelectedSet = exercises[index];
          mutRefreshSelection = newSelectionRandomizer(mutSelectedSet.choices, ui.list);

          update();
        });

        ui.button.addEventListener("click", () => { mutRefreshSelection(); });

        update();
      });
    }
  }

  const init = (exercisesUrl: string) => {
    const ui = new UserInterface();
    const application = new Application(ui, exercisesUrl);
    application.run();
  };

  return {
    init,
  };
};
