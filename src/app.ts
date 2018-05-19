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

  const newSelectionRandomizer = (exercises: string[]) => (): string[] => {
    // Make a copy so we don't mutate the original
    const selectedExercises = exercises.map((e) => e);

    // Now shuffle the copy
    shuffle(selectedExercises);

    // Select 5 exercises
    return selectedExercises.slice(0, 5);
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

    public onSelectorChange(callback: (i: number) => void) {
      this.selector.addEventListener("change", () => {
        const selectedOption = this.selector.options[this.selector.selectedIndex];
        const index = parseInt(selectedOption.value, 10);
        callback(index);
      });
    }

    public onButtonClick(callback: () => void) {
      this.button.addEventListener("click", callback);
    }

    public setExerciseList(exercises: string[]) {
      const listElem = this.list;

      this.clearChildren(listElem);

      exercises.forEach((exerciseName) => {
        const newLi = document.createElement("li");
        newLi.innerHTML = exerciseName;
        listElem.appendChild(newLi);
      });
    }

    public initExerciseSetSelector(exerciseSets: IExerciseSet[]) {
      const selectorElement = this.selector;

      this.clearChildren(selectorElement);

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

    private clearChildren(parent: Node) {
      while (parent.firstChild) { parent.removeChild(parent.firstChild); }
    }
  }

  class Application {
    private ui: UserInterface;
    private exerciseSets: IExerciseSet[];

    constructor(ui: UserInterface, exercises: IExerciseSet[]) {
      this.ui = ui;
      this.exerciseSets = exercises;
    }

    public run() {
      this.ui.initExerciseSetSelector(this.exerciseSets);

      let mutSelectedSet = this.exerciseSets[0];
      let mutRefreshSelection = newSelectionRandomizer(mutSelectedSet.choices);

      const update = () => {
        this.ui.notes.innerHTML = mutSelectedSet.notes;
        const selectedExercises = mutRefreshSelection();
        this.ui.setExerciseList(selectedExercises);
      };

      this.ui.onSelectorChange((index) => {
        mutSelectedSet = this.exerciseSets[index];
        mutRefreshSelection = newSelectionRandomizer(mutSelectedSet.choices);

        update();
      });

      this.ui.onButtonClick(update);

      update();
    }
  }

  const init = (exercisesUrl: string) => {
    loadConfig(exercisesUrl).then((exerciseSets) => {
      const ui = new UserInterface();
      const application = new Application(ui, exerciseSets);
      application.run();
    });
  };

  return {
    init,
  };
};
