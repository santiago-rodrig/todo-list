const createElement = (type, classes = null, attributes = null) => {
  const element = document.createElement(type);

  if (classes) {
    classes.forEach(className => {
      element.classList.add(className);
    });
  }

  if (attributes) {
    attributes.forEach(({ prop, value }) => {
      element.setAttribute(prop, value);
    });
  }

  return element;
};

const emptyElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export { createElement, emptyElement };
