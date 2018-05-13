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

  const init = (exercises: string[]) => {
    const parent = document.querySelector("#exercise-list");
    if (null === parent) {
      throw new Error("Could not locate #exercise-list element");
    }

    const randomize = document.querySelector("#randomize");
    if (null === randomize) {
      throw new Error("Could not locate #randomize element");
    }

    const randomizeSelection = newSelectionRandomizer(exercises, parent);
    randomize.addEventListener("click", randomizeSelection);
    randomizeSelection();
  };

  return {
    init,
  };
};
