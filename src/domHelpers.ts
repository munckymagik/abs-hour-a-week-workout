const queryElement = (selector: string): Element => {
  const element = document.querySelector(selector);
  if (null !== element) {
    return element;
  } else {
    throw new Error(`Could not locate '${selector}' element`);
  }
};

const clearChildren = (parent: Node) => {
  while (parent.firstChild) { parent.removeChild(parent.firstChild); }
};

export {
  queryElement,
  clearChildren,
};
