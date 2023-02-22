"use strict";

var DomUtil = {
  find: function find() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return document.querySelector(selector);
  },
  createElement: function createElement(tag) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? null : _ref$style,
        _ref$styleClass = _ref.styleClass,
        styleClass = _ref$styleClass === void 0 ? "" : _ref$styleClass,
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes,
        _ref$innerText = _ref.innerText,
        innerText = _ref$innerText === void 0 ? null : _ref$innerText,
        _ref$innerHTML = _ref.innerHTML,
        innerHTML = _ref$innerHTML === void 0 ? null : _ref$innerHTML;

    var element = document.createElement(tag);

    if (styleClass) {
      element.className = styleClass;
    }

    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    if (style) {
      var styles = "";

      for (var _key in style) {
        styles += "".concat(_key, ":").concat(style[_key], ";");
      }

      element.setAttribute("style", styles);
    }

    if (innerHTML) {
      element.innerHTML = innerHTML;
    }

    if (innerText) {
      element.innerText = innerText;
    }

    return element;
  },
  removeClass: function removeClass(element, className) {
    element.classList.remove(className);
  }
}; // TODO: rollup export default DomUtil;