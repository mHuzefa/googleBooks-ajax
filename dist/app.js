const API_KEY = "";
const DOM_STRINGS = {
  searchInput: document.getElementById("searchBook"),
  submitButton: document.getElementById("submitButton"),
};

let domValues = {
  searchValue: DOM_STRINGS.searchInput.value,
};
DOM_STRINGS.searchInput.addEventListener("change", (e) => {
  domValues.searchValue = e.target.value;
});

DOM_STRINGS.submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let response = new XMLHttpRequest();
  response.open(
    "GET",
    `https://www.googleapis.com/books/v1/volumes?q=${domValues.searchValue}&printType=books&key=${API_KEY}`,
    true
  );
  response.onload = () => {
    if (response.readyState === 4) {
      if (response.status === 200) {
        var json = JSON.parse(response.responseText);
        console.log(response);
        if (json.items.length !== 0) {
          json.items.forEach((item) => {
            const parent = Dom.parentElement("div");
            Dom.childElement(parent, "img", {
              src: item.volumeInfo.imageLinks.smallThumbnail,
            });
            Dom.childElement(
              parent,
              "a",
              { href: item.volumeInfo.infoLink },
              item.volumeInfo.title
            );
          });
        }
      } else {
        console.error(response.statusText);
      }
    }
  };
  response.onerror = () => console.error(response.statusText);
  response.send();
});

const Dom = (function () {
  return {
    parentElement(element, attributes = null, textContent) {
      const parentElem = document.createElement(element);
      if (attributes !== null && typeof attributes === "object") {
        for (let attribute in attributes) {
          parentElem.setAttribute(attribute, attributes[attribute]);
        }
      }
      if (textContent !== undefined) {
        parentElem.textContent = textContent;
      }

      document.body.appendChild(parentElem);
      return parentElem;
    },
    childElement(parent, childElement, attributes = null, textContent) {
      const childElem = document.createElement(childElement);
      parent.appendChild(childElem);

      if (attributes !== null && typeof attributes === "object") {
        for (let attribute in attributes) {
          childElem.setAttribute(attribute, attributes[attribute]);
        }
      }
      if (textContent !== undefined) {
        childElem.textContent = textContent;
      }
      return childElem;
    },
  };
})();

const parent = Dom.parentElement("div", {});
const child = Dom.childElement(parent, "h3", {}, "h3");
const childchild = Dom.childElement(child, "p", {}, "Hello p");
Dom.childElement(childchild, "p", { class: "hello" }, "Hello p2");
