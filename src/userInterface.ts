import { IExerciseSet } from "./data";

class UserInterface {
  private button: Element;
  private list: Element;
  private notes: Element;
  private selector: HTMLSelectElement;

  constructor() {
    this.button = this.queryElement("#randomize");
    this.list = this.queryElement("#exercise-list");
    this.notes = this.queryElement("#set-notes");
    this.selector = this.queryElement("#set-selector") as HTMLSelectElement;
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

  public setNotes(notes: string) {
    this.notes.innerHTML = notes;
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

export {
  UserInterface,
};
