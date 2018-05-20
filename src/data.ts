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

export {
  IExerciseSet,
  newSelectionRandomizer,
  loadConfig,
};
