import { IExerciseSet, loadConfig, newSelectionRandomizer } from "./data";
import { UserInterface } from "./userInterface";

class Application {
  private ui: UserInterface;
  private exerciseSets: IExerciseSet[];
  private selectedSet: IExerciseSet;
  private refreshSelection: () => string[];

  constructor(ui: UserInterface, exercises: IExerciseSet[]) {
    this.ui = ui;
    this.exerciseSets = exercises;
    this.selectedSet = this.exerciseSets[0];
    this.refreshSelection = newSelectionRandomizer(this.selectedSet.choices);
  }

  public run() {
    this.ui.initExerciseSetSelector(this.exerciseSets);

    this.ui.onSelectorChange((index) => {
      this.setState(index);
      this.update();
    });

    this.ui.onButtonClick(() => this.update());

    this.update();
  }

  private update() {
    this.ui.setNotes(this.selectedSet.notes);
    this.ui.setExerciseList(this.refreshSelection());
  }

  private setState(selectedIndex: number) {
    this.selectedSet = this.exerciseSets[selectedIndex];
    this.refreshSelection = newSelectionRandomizer(this.selectedSet.choices);
  }
}

export {
  Application,
};
