/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/application.ts":
/*!****************************!*\
  !*** ./src/application.ts ***!
  \****************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Application\", function() { return Application; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.ts\");\n\nclass Application {\n    constructor(ui, exercises) {\n        this.ui = ui;\n        this.exerciseSets = exercises;\n        this.selectedSet = this.exerciseSets[0];\n        this.refreshSelection = Object(_data__WEBPACK_IMPORTED_MODULE_0__[\"newSelectionRandomizer\"])(this.selectedSet.choices);\n    }\n    run() {\n        this.ui.initExerciseSetSelector(this.exerciseSets);\n        this.ui.onSelectorChange((index) => {\n            this.setState(index);\n            this.update();\n        });\n        this.ui.onButtonClick(() => this.update());\n        this.update();\n    }\n    update() {\n        this.ui.setNotes(this.selectedSet.notes);\n        this.ui.setExerciseList(this.refreshSelection());\n    }\n    setState(selectedIndex) {\n        this.selectedSet = this.exerciseSets[selectedIndex];\n        this.refreshSelection = Object(_data__WEBPACK_IMPORTED_MODULE_0__[\"newSelectionRandomizer\"])(this.selectedSet.choices);\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/application.ts?");

/***/ }),

/***/ "./src/data.ts":
/*!*********************!*\
  !*** ./src/data.ts ***!
  \*********************/
/*! exports provided: newSelectionRandomizer, loadConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newSelectionRandomizer\", function() { return newSelectionRandomizer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadConfig\", function() { return loadConfig; });\n// Based on https://stackoverflow.com/a/6274381/369171\nfunction shuffle(a) {\n    for (let i = a.length - 1; i > 0; i--) {\n        const j = Math.floor(Math.random() * (i + 1));\n        [a[i], a[j]] = [a[j], a[i]];\n    }\n    return a;\n}\nconst newSelectionRandomizer = (exercises) => () => {\n    // Make a copy so we don't mutate the original\n    const selectedExercises = exercises.map((e) => e);\n    // Now shuffle the copy\n    shuffle(selectedExercises);\n    // Select 5 exercises\n    return selectedExercises.slice(0, 5);\n};\nconst loadConfig = (path) => {\n    return fetch(path).then((response) => {\n        if (response.ok) {\n            return response.json();\n        }\n        else {\n            return Promise.reject(new Error(`Failed to load exercise list. ` +\n                `${response.status} ${response.statusText} ${response.url}`));\n        }\n    });\n};\n\n\n\n//# sourceURL=webpack:///./src/data.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application */ \"./src/application.ts\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./src/data.ts\");\n/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userInterface */ \"./src/userInterface.ts\");\n\n\n\nconst init = (exercisesUrl) => {\n    Object(_data__WEBPACK_IMPORTED_MODULE_1__[\"loadConfig\"])(exercisesUrl).then((exerciseSets) => {\n        const ui = new _userInterface__WEBPACK_IMPORTED_MODULE_2__[\"UserInterface\"]();\n        const application = new _application__WEBPACK_IMPORTED_MODULE_0__[\"Application\"](ui, exerciseSets);\n        application.run();\n    });\n};\nwindow.addEventListener(\"load\", () => init(\"./exercises.json\"));\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/userInterface.ts":
/*!******************************!*\
  !*** ./src/userInterface.ts ***!
  \******************************/
/*! exports provided: UserInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserInterface\", function() { return UserInterface; });\nclass UserInterface {\n    constructor() {\n        this.button = this.queryElement(\"#randomize\");\n        this.list = this.queryElement(\"#exercise-list\");\n        this.notes = this.queryElement(\"#set-notes\");\n        this.selector = this.queryElement(\"#set-selector\");\n    }\n    onSelectorChange(callback) {\n        this.selector.addEventListener(\"change\", () => {\n            const selectedOption = this.selector.options[this.selector.selectedIndex];\n            const index = parseInt(selectedOption.value, 10);\n            callback(index);\n        });\n    }\n    onButtonClick(callback) {\n        this.button.addEventListener(\"click\", callback);\n    }\n    setNotes(notes) {\n        this.notes.innerHTML = notes;\n    }\n    setExerciseList(exercises) {\n        const listElem = this.list;\n        this.clearChildren(listElem);\n        exercises.forEach((exerciseName) => {\n            const newLi = document.createElement(\"li\");\n            newLi.innerHTML = exerciseName;\n            listElem.appendChild(newLi);\n        });\n    }\n    initExerciseSetSelector(exerciseSets) {\n        const selectorElement = this.selector;\n        this.clearChildren(selectorElement);\n        exerciseSets.forEach((exerciseSet, index) => {\n            const newOpt = document.createElement(\"option\");\n            newOpt.innerHTML = exerciseSet.title;\n            newOpt.setAttribute(\"value\", index.toString());\n            selectorElement.appendChild(newOpt);\n        });\n    }\n    queryElement(selector) {\n        const element = document.querySelector(selector);\n        if (null !== element) {\n            return element;\n        }\n        else {\n            throw new Error(`Could not locate '${selector}' element`);\n        }\n    }\n    clearChildren(parent) {\n        while (parent.firstChild) {\n            parent.removeChild(parent.firstChild);\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/userInterface.ts?");

/***/ })

/******/ });