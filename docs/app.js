"use strict";
const app = () => {
    // Based on https://stackoverflow.com/a/6274381/369171
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    const newSelectionRandomizer = (exercises) => () => {
        // Make a copy so we don't mutate the original
        const selectedExercises = exercises.map((e) => e);
        // Now shuffle the copy
        shuffle(selectedExercises);
        // Select 5 exercises
        return selectedExercises.slice(0, 5);
    };
    const loadConfig = (path) => {
        return fetch(path).then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                return Promise.reject(new Error(`Failed to load exercise list. ` +
                    `${response.status} ${response.statusText} ${response.url}`));
            }
        });
    };
    class UserInterface {
        get button() {
            return this.queryElement("#randomize");
        }
        get list() {
            return this.queryElement("#exercise-list");
        }
        get notes() {
            return this.queryElement("#set-notes");
        }
        get selector() {
            return this.queryElement("#set-selector");
        }
        onSelectorChange(callback) {
            this.selector.addEventListener("change", () => {
                const selectedOption = this.selector.options[this.selector.selectedIndex];
                const index = parseInt(selectedOption.value, 10);
                callback(index);
            });
        }
        onButtonClick(callback) {
            this.button.addEventListener("click", callback);
        }
        setExerciseList(exercises) {
            const listElem = this.list;
            this.clearChildren(listElem);
            exercises.forEach((exerciseName) => {
                const newLi = document.createElement("li");
                newLi.innerHTML = exerciseName;
                listElem.appendChild(newLi);
            });
        }
        initExerciseSetSelector(exerciseSets) {
            const selectorElement = this.selector;
            this.clearChildren(selectorElement);
            exerciseSets.forEach((exerciseSet, index) => {
                const newOpt = document.createElement("option");
                newOpt.innerHTML = exerciseSet.title;
                newOpt.setAttribute("value", index.toString());
                selectorElement.appendChild(newOpt);
            });
        }
        queryElement(selector) {
            const element = document.querySelector(selector);
            if (null !== element) {
                return element;
            }
            else {
                throw new Error(`Could not locate '${selector}' element`);
            }
        }
        clearChildren(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    class Application {
        constructor(ui, exercises) {
            this.ui = ui;
            this.exerciseSets = exercises;
        }
        run() {
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
    const init = (exercisesUrl) => {
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
//# sourceMappingURL=app.js.map