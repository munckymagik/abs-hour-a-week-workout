const app = () => {
  // Based on https://stackoverflow.com/a/6274381/369171
  function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const newSelectionRandomizer = (exercises: string[], parent: Node) => () => {
    while (parent.firstChild) { parent.removeChild(parent.firstChild); }

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

  interface IExerciseSet {
    readonly type: string;
    readonly nodes: string;
    readonly choices: string[];
  }

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

  const selectElement = (selector: string): Promise<Element> => {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (null !== element) {
        resolve(element);
      } else {
        reject(new Error(`Could not locate '${selector}' element`));
      }
    });
  };

  const init = (exercisesUrl: string, setIndex: number) => {
    const promisedConfig = loadConfig(exercisesUrl);
    const promisedListElem = selectElement("#exercise-list");
    const promisedButton = selectElement("#randomize");

    Promise
      .all([promisedConfig, promisedListElem, promisedButton])
      .then(([exercises, listElem, button]) => {
        const randomizeSelection = newSelectionRandomizer(exercises[setIndex].choices, listElem);
        button.addEventListener("click", randomizeSelection);
        randomizeSelection();
      });
  };

  return {
    init,
  };
};
