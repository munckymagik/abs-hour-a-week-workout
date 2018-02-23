var app = (context) => {
  // From https://stackoverflow.com/a/6274381/369171
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let newSelectionRandomizer = (exercises, parent) => () => {
    while (parent.firstChild) { parent.removeChild(parent.firstChild) }

    let selectedExercises = exercises.map(e => e)
    shuffle(selectedExercises)

    selectedExercises.slice(0, 5).forEach(exerciseName => {
      let newLi = document.createElement('li')
      newLi.innerHTML = exerciseName
      parent.appendChild(newLi)
    })
  }

  let init = (exercises) => {
    let parent = document.querySelector('#exercise-list')
    let randomize = document.querySelector('#randomize')
    let randomizeSelection = newSelectionRandomizer(exercises, parent)

    randomize.addEventListener('click', randomizeSelection)

    randomizeSelection()
  }

  return {
    init
  }
}
