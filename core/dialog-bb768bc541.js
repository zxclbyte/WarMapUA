"use strict";

var Dialog = {
  modal: {
    background: function background() {
      return DomUtil.find(".dialog-mask");
    },
    container: function container() {
      return DomUtil.find(".deep-dialog");
    },
    content: function content() {
      return DomUtil.find(".dialog-content");
    },
    header: function header() {
      return DomUtil.find(".dialog-header");
    },
    opened: false
  },
  opened: function opened() {
    return this.modal.opened;
  },
  open: function open() {
    var _this = this;

    var container = this.modal.container();
    container.classList.add("deep-dialog--active");
    this.modal.opened = true;

    var catchEscapeKeyUp = function catchEscapeKeyUp(event) {
      if (event.key === "Escape") {
        _this.close();

        document.removeEventListener("keyup", catchEscapeKeyUp, true);
      }
    };

    document.addEventListener("keyup", catchEscapeKeyUp, true);
  },
  close: function close() {
    var container = this.modal.background() || this.modal.container();
    this.modal.opened = false;

    if (container) {
      container.remove();
      container.dispatchEvent(new Event("close"));
    }
  },
  addHeader: function addHeader() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var titleHtml = "<span class=\"title\">".concat(title, "</span>");
    var closeHtml = "<div class=\"close\" onClick=\"Dialog.close()\"></div>";
    return DomUtil.createElement("div", {
      styleClass: "deep-header",
      innerHTML: "".concat(titleHtml).concat(closeHtml)
    });
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$header = _ref.header,
        header = _ref$header === void 0 ? "" : _ref$header,
        _ref$content = _ref.content,
        content = _ref$content === void 0 ? "" : _ref$content,
        _ref$mask = _ref.mask,
        mask = _ref$mask === void 0 ? true : _ref$mask,
        _ref$styleClass = _ref.styleClass,
        styleClass = _ref$styleClass === void 0 ? "" : _ref$styleClass,
        _ref$dismissMask = _ref.dismissMask,
        dismissMask = _ref$dismissMask === void 0 ? false : _ref$dismissMask,
        _ref$zIndex = _ref.zIndex,
        zIndex = _ref$zIndex === void 0 ? 1600 : _ref$zIndex,
        _ref$open = _ref.open,
        open = _ref$open === void 0 ? false : _ref$open;

    var background = this.modal.background();

    if (background) {
      background.innerHTML = "";
    }

    var modal = DomUtil.createElement("div", {
      styleClass: "deep-dialog",
      style: {
        "z-index": zIndex
      }
    });

    if (styleClass) {
      modal.classList.add(styleClass);
    }

    document.body.appendChild(modal);

    if (header) {
      var headerContainer = this.addHeader(header);
      modal.appendChild(headerContainer);
    }

    var contentContainer = DomUtil.createElement("div", {
      styleClass: "dialog-content"
    });
    modal.appendChild(contentContainer);

    if (mask) {
      var _modal = this.modal.container();

      if (!background) {
        background = DomUtil.createElement("div", {
          styleClass: "dialog-mask",
          style: {
            "z-index": zIndex
          }
        });
      }

      background.appendChild(_modal);
      document.body.appendChild(background);
    }

    if (content) {
      this.updateContent(content);
    }

    if (dismissMask) {
      this.closeOnMaskClick();
    }

    if (open) {
      this.open();
    }
  },
  updateContent: function updateContent(content) {
    var contentContainer = this.modal.content();

    if (typeof content === "string") {
      contentContainer.innerHTML = content;
    } else {
      contentContainer.innerHTML = "";
      contentContainer.appendChild(content);
    }
  },
  closeOnMaskClick: function closeOnMaskClick() {
    var _this2 = this;

    var mask = this.modal.background();

    if (mask) {
      var dismissMask = function dismissMask(event) {
        var target = event.target;

        if (target === mask) {
          _this2.close();

          mask.removeEventListener("click", dismissMask, true);
        }
      };

      mask.addEventListener("click", dismissMask, true);
    }
  },
  on: function on(event, listener) {
    var container = this.modal.background() || this.modal.container();
    container.addEventListener(event, listener, true);
  }
}; // TODO: rollup export default Dialog;
