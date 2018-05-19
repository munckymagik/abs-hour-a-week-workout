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

  const initExerciseSetSelector = (selectElem: Element, exerciseSets: IExerciseSet[]) => {
    clearChildren(selectElem);

    exerciseSets.forEach((exerciseSet, index) => {
      const newOpt = document.createElement("option");
      newOpt.innerHTML = exerciseSet.title;
      newOpt.setAttribute("value", index.toString());

      selectElem.appendChild(newOpt);
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

  interface IUserInterface {
    button: Element;
    list: Element;
    notes: Element;
    selector: Element;
  }

  type IUserInterfaceKey = keyof IUserInterface;

  const uiKeysAndSelectors: Array<[IUserInterfaceKey, string]> = [
    ["button", "#randomize"],
    ["list", "#exercise-list"],
    ["notes", "#set-notes"],
    ["selector", "#set-selector"],
  ];

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

  const initUI = (): Promise<IUserInterface> => {
    type KeyAndElement = [IUserInterfaceKey, Element];

    const promisedKeysAndElements: Array<Promise<KeyAndElement>> =
      uiKeysAndSelectors.map(([key, selector]): Promise<KeyAndElement> =>
          selectElement(selector).then((element): KeyAndElement => [key, element]),
      );

    return Promise.all(promisedKeysAndElements).then((elements: KeyAndElement[]) => {
      return elements.reduce((obj: any, [key, element]) => {
        obj[key] = element;
        return obj;
      }, {}) as IUserInterface;
    });
  };

  const init = (exercisesUrl: string, setIndex: number) => {
    const promisedConfig = loadConfig(exercisesUrl);
    const promisedUi = initUI();

    Promise
      .all([promisedConfig, promisedUi])
      .then(([exercises, ui]) => {
        initExerciseSetSelector(ui.selector, exercises);

        let mutSelectedSet = exercises[0];
        let mutRefreshSelection = newSelectionRandomizer(mutSelectedSet.choices, ui.list);

        const update = () => {
          ui.notes.innerHTML = mutSelectedSet.notes;
          mutRefreshSelection();
        };

        ui.selector.addEventListener("change", () => {
          const selector = ui.selector as HTMLSelectElement;
          const selectedOption = selector.options[selector.selectedIndex];
          const index = parseInt(selectedOption.value, 10);

          mutSelectedSet = exercises[index];
          mutRefreshSelection = newSelectionRandomizer(mutSelectedSet.choices, ui.list);

          update();
        });

        ui.button.addEventListener("click", () => { mutRefreshSelection(); });

        update();
      });
  };

  return {
    init,
  };
};
