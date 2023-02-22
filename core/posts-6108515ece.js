"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Posts = {
  apiUrl: "/api/posts",
  content: "",
  loadMoreButton: function loadMoreButton() {
    return DomUtil.find(".load-more");
  },
  query: {
    territoryCode: undefined,
    territoryId: undefined,
    encode: undefined,
    status: undefined,
    page: 1
  },
  loadMore: function loadMore() {
    var _this = this;

    this.loadMoreButton().innerText = TranslateService.translate("loadMore") + "...";
    this.query = _objectSpread(_objectSpread({}, this.query), {}, {
      page: this.query.page + 1
    });
    $.ajax({
      dataType: "json",
      url: this.apiUrl,
      data: this.parseQueries(this.query),
      cache: false,
      success: function success(posts) {
        _this.buildPosts(posts).then(function (content) {
          _this.emit("append", content);
        });
      }
    });
  },
  append: function append(element, posts) {
    if (element) {
      var newRecords = posts.querySelectorAll(".post-record");

      var _iterator = _createForOfIteratorHelper(newRecords),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var record = _step.value;
          element.appendChild(record);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!newRecords.length) {
        this.loadMoreButton().remove();
      } else {
        this.loadMoreButton().innerText = TranslateService.translate("loadMore");
        element.appendChild(this.loadMoreButton());
      }
    }
  },
  buildPosts: function buildPosts() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var content = DomUtil.createElement("div");
    return new Promise(function (resolve, reject) {
      var facebookFrame = function facebookFrame(post) {
        return DomUtil.createElement("div", {
          styleClass: "fb-post",
          attributes: {
            "data-href": post.url,
            "data-show-text": "true",
            "data-lazy": "false",
            "data-width": "414"
          }
        });
      };

      var telegramFrame = function telegramFrame(post) {
        return DomUtil.createElement("script", {
          attributes: {
            src: "https://telegram.org/js/telegram-widget.js?19",
            "data-telegram-post": post.url.replace(/.*me\//, ""),
            "data-width": "100%",
            "data-userpic": "false"
          }
        });
      };

      var twitterFrame = function twitterFrame(post) {
        var id = post.url.replace(/.*status\//, "");
        var container = DomUtil.createElement("div", {
          attributes: {
            id: id
          }
        });
        DomUtil.createElement("script", {
          innerText: "".concat(twttr.widgets.createTweet(id, container).then(function (el) {
            container.appendChild(el);
          }))
        });
        return container;
      };

      var loadMore = DomUtil.createElement("button", {
        styleClass: "button load-more",
        attributes: {
          id: "load-more",
          onclick: "Posts.loadMore()"
        },
        innerText: TranslateService.translate("loadMore")
      });

      var _iterator2 = _createForOfIteratorHelper(posts.result),
          _step2;

      try {
        var _loop = function _loop() {
          var post = _step2.value;
          var record = DomUtil.createElement("div", {
            styleClass: "post-record"
          });

          switch (post.type) {
            case "Telegram":
              record.appendChild(telegramFrame(post));
              break;

            case "Facebook":
              record.appendChild(facebookFrame(post));
              setTimeout(function () {
                return FB.XFBML.parse(record);
              }, 2000);
              break;

            case "Twitter":
              record.appendChild(twitterFrame(post));
              break;
          }

          content.appendChild(record);
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      content.appendChild(loadMore);
      resolve(content);
    });
  },
  parseQueries: function parseQueries(query) {
    return Object.entries(query).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return value !== undefined || value !== null;
    }).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      return {
        key: key,
        value: value
      };
    }).reduce(function (obj, item) {
      return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, item.key, item.value));
    }, {});
  },
  emit: function emit(eventName, data) {
    var ev = new CustomEvent(eventName, {
      detail: data,
      bubbles: true,
      cancelable: true,
      composed: false
    });
    document.dispatchEvent(ev);
  },
  init: function init() {
    var _this2 = this;

    var apiUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/api/posts";
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.query;
    var twitterScript = DomUtil.createElement("script", {
      attributes: {
        src: "https://platform.twitter.com/widgets.js",
        charset: "utf-8"
      }
    });
    document.head.appendChild(twitterScript);

    twitterScript.onload = function () {
      _this2.apiUrl = apiUrl;
      $.ajax({
        dataType: "json",
        url: _this2.apiUrl,
        data: _this2.parseQueries(options),
        cache: false,
        success: function success(posts) {
          _this2.buildPosts(posts).then(function (content) {
            _this2.content = content;

            _this2.emit("loaded", content);
          });
        }
      });
    };
  },
  on: function on(event, listener) {
    document.addEventListener(event, listener, true);
  }
}; // TODO: rollup export default Posts;