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

/***/ "./src/domHelpers.ts":
/*!***************************!*\
  !*** ./src/domHelpers.ts ***!
  \***************************/
/*! exports provided: queryElement, clearChildren */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"queryElement\", function() { return queryElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearChildren\", function() { return clearChildren; });\nconst queryElement = (selector) => {\n    const element = document.querySelector(selector);\n    if (null !== element) {\n        return element;\n    }\n    else {\n        throw new Error(`Could not locate '${selector}' element`);\n    }\n};\nconst clearChildren = (parent) => {\n    while (parent.firstChild) {\n        parent.removeChild(parent.firstChild);\n    }\n};\n\n\n\n//# sourceURL=webpack:///./src/domHelpers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application */ \"./src/application.ts\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./src/data.ts\");\n/* harmony import */ var _stopWatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stopWatch */ \"./src/stopWatch.ts\");\n/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userInterface */ \"./src/userInterface.ts\");\n\n\n\n\nconst init = (exercisesUrl) => {\n    Object(_data__WEBPACK_IMPORTED_MODULE_1__[\"loadConfig\"])(exercisesUrl).then((exerciseSets) => {\n        const ui = new _userInterface__WEBPACK_IMPORTED_MODULE_3__[\"UserInterface\"]();\n        const application = new _application__WEBPACK_IMPORTED_MODULE_0__[\"Application\"](ui, exerciseSets);\n        application.run();\n        const stopWatch = new _stopWatch__WEBPACK_IMPORTED_MODULE_2__[\"StopWatch\"](\"stopwatch\");\n    });\n};\nwindow.addEventListener(\"load\", () => init(\"./exercises.json\"));\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/stopWatch.ts":
/*!**************************!*\
  !*** ./src/stopWatch.ts ***!
  \**************************/
/*! exports provided: StopWatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StopWatch\", function() { return StopWatch; });\n/* harmony import */ var _domHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers */ \"./src/domHelpers.ts\");\n\nconst zeroPad = (n) => (\"00\" + n).slice(-2);\nclass StopWatch {\n    constructor(selectorPrefix) {\n        this.frameInterval = Math.floor(1000 / 30);\n        this.startTimeMillis = 0;\n        this.stopTimeMillis = 0;\n        this.display = Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"queryElement\"])(`.${selectorPrefix}-display`);\n        this.startButton = Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"queryElement\"])(`.${selectorPrefix}-start`);\n        this.resetbutton = Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"queryElement\"])(`.${selectorPrefix}-reset`);\n        this.startButton.addEventListener(\"click\", () => this.toggleState());\n        this.resetbutton.addEventListener(\"click\", () => this.reset());\n    }\n    toggleState() {\n        if (this.isStarted()) {\n            this.stop();\n        }\n        else {\n            this.start();\n        }\n    }\n    start() {\n        if (this.stopTimeMillis === 0) {\n            this.startTimeMillis = Date.now();\n        }\n        else {\n            this.startTimeMillis += Date.now() - this.stopTimeMillis;\n        }\n        const self = this;\n        this.intervalId = setInterval(() => {\n            self.update();\n        }, this.frameInterval);\n        this.renderButtons();\n    }\n    stop() {\n        if (this.isStarted()) {\n            clearInterval(this.intervalId);\n            this.intervalId = undefined;\n            this.stopTimeMillis = Date.now();\n            this.renderButtons();\n        }\n    }\n    isStarted() {\n        return typeof this.intervalId !== \"undefined\";\n    }\n    reset() {\n        this.startTimeMillis = 0;\n        this.stopTimeMillis = 0;\n        this.renderDisplay(0, 0, 0);\n    }\n    update() {\n        const delta = Date.now() - this.startTimeMillis;\n        const minutes = Math.floor(delta / 60000);\n        const seconds = Math.floor((delta % 60000) / 1000);\n        const centiseconds = Math.floor((delta % 1000) / 10);\n        this.renderDisplay(minutes, seconds, centiseconds);\n    }\n    renderDisplay(mins, secs, centis) {\n        this.display.innerHTML = `${zeroPad(mins)}:${zeroPad(secs)}:${zeroPad(centis)}`;\n    }\n    renderButtons() {\n        if (this.isStarted()) {\n            this.startButton.innerHTML = \"Stop\";\n            this.resetbutton.setAttribute(\"disabled\", \"true\");\n        }\n        else {\n            this.startButton.innerHTML = \"Start\";\n            this.resetbutton.removeAttribute(\"disabled\");\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/stopWatch.ts?");

/***/ }),

/***/ "./src/userInterface.ts":
/*!******************************!*\
  !*** ./src/userInterface.ts ***!
  \******************************/
/*! exports provided: UserInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserInterface\", function() { return UserInterface; });\n/* harmony import */ var _domHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers */ \"./src/domHelpers.ts\");\n\nclass UserInterface {\n    constructor() {\n        this.button = Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"queryElement\"])(\"#randomize\");\n        this.list = Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"queryElement\"])(\"#exercise-list\");\n        this.notes = Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"queryElement\"])(\"#set-notes\");\n        this.selector = Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"queryElement\"])(\"#set-selector\");\n    }\n    onSelectorChange(callback) {\n        this.selector.addEventListener(\"change\", () => {\n            const selectedOption = this.selector.options[this.selector.selectedIndex];\n            const index = parseInt(selectedOption.value, 10);\n            callback(index);\n        });\n    }\n    onButtonClick(callback) {\n        this.button.addEventListener(\"click\", callback);\n    }\n    setNotes(notes) {\n        this.notes.innerHTML = notes;\n    }\n    setExerciseList(exercises) {\n        const listElem = this.list;\n        Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"clearChildren\"])(listElem);\n        exercises.forEach((exerciseName) => {\n            const newLi = document.createElement(\"li\");\n            newLi.innerHTML = exerciseName;\n            listElem.appendChild(newLi);\n        });\n    }\n    initExerciseSetSelector(exerciseSets) {\n        const selectorElement = this.selector;\n        Object(_domHelpers__WEBPACK_IMPORTED_MODULE_0__[\"clearChildren\"])(selectorElement);\n        exerciseSets.forEach((exerciseSet, index) => {\n            const newOpt = document.createElement(\"option\");\n            newOpt.innerHTML = exerciseSet.title;\n            newOpt.setAttribute(\"value\", index.toString());\n            selectorElement.appendChild(newOpt);\n        });\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/userInterface.ts?");

/***/ })

/******/ });