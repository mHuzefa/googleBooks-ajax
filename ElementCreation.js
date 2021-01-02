const DomCreation = () => {
  function parentElement(element, attributes = null, textContent) {
    const parentElem = document.createElement(element);
    if (attributes !== null && typeof attributes === "object") {
      for (let attribute in attributes) {
        parentElem.setAttribute(attribute, attributes[attribute]);
      }
    }
    parentElem.textContent = textContent;
    document.body.appendChild(parentElem);
    return parentElem;
  }
  function childElement(parent, childElement, attributes = null, textContent) {
    const childElem = document.createElement(childElement);
    parent.appendChild(childElem);

    if (attributes !== null && typeof attributes === "object") {
      for (let attribute in attributes) {
        childElem.setAttribute(attribute, attributes[attribute]);
      }
    }
    childElem.textContent = textContent;
    return childElem;
  }
};
exports.default = DomCreation();
