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
    const clearChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };
    const newSelectionRandomizer = (exercises, parent) => () => {
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
    const initExerciseSetSelector = (selectElem, exerciseSets) => {
        clearChildren(selectElem);
        exerciseSets.forEach((exerciseSet, index) => {
            const newOpt = document.createElement("option");
            newOpt.innerHTML = exerciseSet.title;
            newOpt.setAttribute("value", index.toString());
            selectElem.appendChild(newOpt);
        });
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
            return this.selectElement("#randomize");
        }
        get list() {
            return this.selectElement("#exercise-list");
        }
        get notes() {
            return this.selectElement("#set-notes");
        }
        get selector() {
            return this.selectElement("#set-selector");
        }
        selectElement(selector) {
            const element = document.querySelector(selector);
            if (null !== element) {
                return element;
            }
            else {
                throw new Error(`Could not locate '${selector}' element`);
            }
        }
    }
    const init = (exercisesUrl, setIndex) => {
        const promisedConfig = loadConfig(exercisesUrl);
        const ui = new UserInterface();
        promisedConfig.then((exercises) => {
            initExerciseSetSelector(ui.selector, exercises);
            let mutSelectedSet = exercises[0];
            let mutRefreshSelection = newSelectionRandomizer(mutSelectedSet.choices, ui.list);
            const update = () => {
                ui.notes.innerHTML = mutSelectedSet.notes;
                mutRefreshSelection();
            };
            ui.selector.addEventListener("change", () => {
                const selector = ui.selector;
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
//# sourceMappingURL=app.js.map