"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// TODO: rollup 

/*import Dialog from '../../core/dialog';
import DomUtil from '../../core/dom-util';
import Posts from '../../core/posts';
import TranslateService from '../../core/translations';*/
var map = null;
var jsonLayer = null;
var features = [];
var jsonLayerRailway = null;
var currentBaseLayer = null;
var baseLayers = {
  terrain: null,
  "default": terrain,
  terrain: null,
  satellite: null
};
var onlineUsers = "...";
var onlineUsersBreakdown = null;
var latestHistoryId = null;
var lang = "uk";
var isWebVersion = window && window.localStorage;

Object.values = Object.values || function (x) {
  return Object.keys(x).map(function (k) {
    return x[k];
  });
};

if (isWebVersion) {
  if (/en/.test(window.location.pathname)) {
    lang = "en";
    TranslateService.setLang(lang);
  }

  latestHistoryId = JSON.parse(localStorage.getItem("dsm-latest-ver"));
}

function debounce(func) {
  var _this = this;

  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(_this, args);
    }, timeout);
  };
} // polyfill


if (!String.fromCodePoint) {
  String.fromCodePoint = function (x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;

    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + " is not a valid code point");
      elements[i] = code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00);
    }

    return join(elements, "");
  };
}

function getFlagEmoji(countryCode) {
  var codePoints = countryCode.toUpperCase().split("").map(function (_char) {
    return 127397 + _char.charCodeAt();
  });
  return String.fromCodePoint.apply(String, _toConsumableArray(codePoints));
}

var Bayraktar = {
  icon: "/images/bayraktar.png",
  bayraktar: null,
  isInPatrol: false,
  isActive: false,
  border: [{
    lat: 51.29196038457911,
    lng: 30.573153927713673
  }, {
    lat: 51.89041359924119,
    lng: 24.32727420522115
  }, {
    lat: 48.397582230123305,
    lng: 22.105481169608172
  }, {
    lat: 48.5180017,
    lng: 23.5055065
  }, // хата модга
  {
    lat: 48.397582230123305,
    lng: 22.105481169608172
  }, {
    lat: 47.72262449179665,
    lng: 25.01090283156361
  }, {
    lat: 47.77485861190158,
    lng: 28.864082361857502
  }, {
    lat: 46.34611189111612,
    lng: 29.982747386781526
  }, {
    lat: 45.426864503301296,
    lng: 28.04062060739956
  }, {
    lat: 44.20352415444205,
    lng: 33.15229829073296
  }, {
    lat: 44.845984704705664,
    lng: 36.539367393975176
  }, {
    lat: 46.29245955582152,
    lng: 37.191921991847515
  }, {
    lat: 47.11287507651251,
    lng: 38.372735073711766
  }, {
    lat: 49.62045979362867,
    lng: 40.035195596862756
  }, {
    lat: 50.40916576329188,
    lng: 35.529461468696525
  }, {
    lat: 51.23362673871385,
    lng: 35.12549909858508
  }, {
    lat: 52.35781885776366,
    lng: 33.88253795978059
  }, {
    lat: 52.119959329491046,
    lng: 30.977116297825116
  }, {
    lat: 51.30167546199394,
    lng: 30.51100587077343
  }],
  backToBase: function backToBase() {
    var _this2 = this;

    this.bayraktar.moveTo(this.border[0], 2000);
    this.bayraktar.once("end", function () {
      _this2.patrol(null, 3000);
    });
  },
  init: function init() {
    if (!DomUtil.find('script[src="/core/movie-marker.js"]')) {
      var script = DomUtil.createElement("script", {
        attributes: {
          src: "/core/movie-marker.js"
        }
      });
      document.head.appendChild(script);
    }
  },
  destroy: function destroy() {
    if (this.bayraktar) {
      this.bayraktar.remove();
      this.bayraktar = null;
      this.isActive = false;
      Filter.filterPoints();
    }
  },
  fire: function fire() {
    var coords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var cotton = L.icon({
      iconUrl: "/images/cotton.gif",
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    });
    var point = coords || this.bayraktar.getLatLng();
    var explosion = L.marker(point, {
      icon: cotton
    });
    explosion.addTo(map);
    this.backToBase();
    setTimeout(function () {
      map.removeLayer(explosion);
    }, 1500);
  },
  attackPoint: function attackPoint(marker) {
    var _this3 = this;

    if (this.isInPatrol) {
      this.isInPatrol = false;
      var coords = marker.getLatLng();
      this.bayraktar.moveTo(_objectSpread(_objectSpread({}, coords), {}, {
        lat: coords.lat + 0.1
      }), 2000);
      this.bayraktar.once("end", function (e) {
        _this3.fire(coords);

        marker.remove();
      });
    }
  },
  patrol: function patrol(coordinates) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    this.isInPatrol = true;
    this.isActive = true;

    if (!coordinates) {
      coordinates = this.border;
    }

    var icon = L.icon({
      iconUrl: this.icon,
      iconSize: [100, 50]
    });

    if (!this.bayraktar) {
      this.bayraktar = L.Marker.movingMarker(coordinates, coordinates.length * speed, {
        autostart: true,
        icon: icon,
        loop: true
      }).addTo(map);
    } else {
      this.bayraktar.remove();
      this.bayraktar = null;
      this.bayraktar = L.Marker.movingMarker(coordinates, coordinates.length * speed, {
        autostart: true,
        icon: icon,
        loop: true
      }).addTo(map);
    }
  }
};
var PopUpManager = {
  keys: {
    visit: "visits",
    disclaimer: "dscl-bp"
  },
  visits: function visits() {
    return JSON.parse(localStorage.getItem(this.keys.visit)) || 0;
  },
  init: function init() {
    var _this4 = this;

    if (isWebVersion) {
      setTimeout(function () {
        return _this4.updateDisclaimer();
      });
      setTimeout(function () {
        return _this4.openSiteRightsPopUp();
      }, 2500);
    }
  },
  updateDisclaimer: function updateDisclaimer() {
    var _this5 = this;

    var disclaimer = DomUtil.find(".disclaimer");
    var visits = this.visits();

    if (!visits) {
      disclaimer.style.display = "flex";
      disclaimer.querySelector(".disagree").addEventener("click", function () {
        window.location.href = "https://google.com";
      });
      disclaimer.querySelector(".agree").addEventListener("click", function () {
        localStorage.setItem(_this5.keys.disclaimer, JSON.stringify(true));
        disclaimer.style.display = "none";

        _this5.updateVisit();
      });
    } else {
      this.updateVisit();
    }
  },
  updateVisit: function updateVisit() {
    var visits = this.visits();
    localStorage.setItem(this.keys.visit, ++visits);
    return visits;
  },
  openSiteRightsPopUp: function openSiteRightsPopUp() {
    var visits = this.visits();

    if (visits && (visits === 5 || visits % 25 === 0)) {
      Dialog.init({
        dismissMask: true,
        open: true
      });
    }
  }
};
var Search = {
  map: null,
  // or Map
  input: DomUtil.find("input.search-bar"),
  searchClear: DomUtil.find(".search-clear"),
  container: {
    wrapper: DomUtil.find(".search-bar-wrap")
  },
  marker: null,
  // or Marker
  show: function show() {
    this.container.wrapper.classList.add("search-bar-wrap--opened");
    this.overlay.element.style.display = "flex";
  },
  hide: function hide() {
    this.container.wrapper.classList.remove("search-bar-wrap--opened");
    this.overlay.element.style.display = "none";
  },
  clear: function clear() {
    this.container.wrapper.classList.remove("search-bar-wrap--opened");
    this.overlay.element.innerHTML = "";
    this.overlay.element.style.display = "none";
  },
  overlay: {
    element: DomUtil.find(".search-results"),
    items: function items() {
      return _toConsumableArray(this.element.querySelectorAll(".result-row"));
    },
    addNotFoundItem: function addNotFoundItem(message) {
      var child = "<div class=\"no-results-row\" data-point=\"\">".concat(message, "</div>");
      this.element.innerHTML = child;
      Search.show();
    },
    addItem: function addItem(label, coords) {
      var child = "<div class=\"result-row\" data-point=\"".concat(coords.lat, ",").concat(coords.lng, "\">").concat(label, "</div>");
      this.element.innerHTML = this.element.innerHTML + child;
    },
    clear: function clear() {
      this.element.innerHTML = "";
      this.element.style.display = "none";
    }
  },
  init: function init(map) {
    var _this6 = this;

    this.map = map;
    this.input.addEventListener("keyup", debounce(function () {
      var term = _this6.input.value;

      if (term.length < 4) {
        return _this6.overlay.clear();
      }

      var latLonRegexp = /([0-9]{2}\.[0-9]{4,16}),\s*([0-9]{2}\.[0-9]{4,16})/;
      var latLonRegexpExec = latLonRegexp.exec(term);

      if (latLonRegexpExec) {
        return Search.find([{
          geometry: {
            coordinates: [parseFloat(latLonRegexpExec[2]), parseFloat(latLonRegexpExec[1])],
            type: "Point"
          },
          type: "Feature",
          properties: {
            name: term
          }
        }]);
      }

      $.ajax({
        dataType: "json",
        url: "https://deepstatemap.live/kowalski/api?q=".concat(term, "&osm_tag=place:city&osm_tag=place:village&osm_tag=place:town&osm_tag=place:settlement"),
        success: function success(results) {
          return Search.find(results.features || []);
        }
      });
    }, 500));
    this.input.addEventListener("keyup", function () {
      if (_this6.input.value.length) {
        _this6.searchClear.style["display"] = "block";
      } else {
        _this6.searchClear.style["display"] = "none";
      }
    });
    this.input.addEventListener("click", function () {
      if (_this6.input.value.length > 4 && Search.overlay.items().length > 0) {
        Search.show();
      }
    });
    this.input.addEventListener("focusout", function () {
      setTimeout(function () {
        Search.hide();
      }, 500);
    });
    this.searchClear.addEventListener("click", function () {
      _this6.input.value = "";

      _this6.input.focus();

      _this6.searchClear.style["display"] = "none";

      _this6.overlay.clear();
    });
  },
  find: function find() {
    var _this7 = this;

    var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (results.length === 0) {
      this.overlay.addNotFoundItem(TranslateService.translate("noResults"));
      return;
    }

    var getTitle = function getTitle(result) {
      return [result.properties.name, result.properties.county, result.properties.state].filter(function (value) {
        return value;
      }).join(", ");
    };

    var uniqueResultTitles = [];
    var uniqueResults = [];

    var _iterator = _createForOfIteratorHelper(results),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var result = _step.value;
        var title = getTitle(result);

        if (uniqueResultTitles.indexOf(title) === -1) {
          uniqueResultTitles.push(title);
          uniqueResults.push(result);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    results = uniqueResults;
    this.clear();

    var _iterator2 = _createForOfIteratorHelper(results),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _result = _step2.value;

        var _title = getTitle(_result);

        if (_result.geometry && _result.geometry.coordinates) {
          var coords = {
            lat: _result.geometry.coordinates[1],
            lng: _result.geometry.coordinates[0]
          };
          this.overlay.addItem(_title, coords);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this.show();
    var rows = this.overlay.items();

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row.addEventListener("click", function (event) {
        var _event$target$getAttr = event.target.getAttribute("data-point").split(","),
            _event$target$getAttr2 = _slicedToArray(_event$target$getAttr, 2),
            lat = _event$target$getAttr2[0],
            lng = _event$target$getAttr2[1];

        var text = event.target.innerText;

        _this7.navigate(lat, lng, text);
      });
    }
  },
  navigate: function navigate(lat, lng) {
    var tooltipText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      this.marker = L.marker([lat, lng], {}).addTo(map);
    }

    if (tooltipText) {
      this.marker.bindTooltip(tooltipText);
    }

    map.flyTo([lat, lng], 10);
  }
};
var History = {
  apiUrl: "",
  latestVersionId: null,
  historyRecords: [],
  activeIndex: null,
  activeDate: null,
  currentRevisionId: null,
  isCalendarActivated: false,
  interval: null,
  element: {
    container: DomUtil.find(".history-range"),
    datePicker: DomUtil.find('input[type="date"]'),
    play: DomUtil.find(".play"),
    updated: function updated() {
      return DomUtil.find(".history");
    },
    clock: function clock() {
      return DomUtil.find(".history__clock");
    },
    nav: {
      next: DomUtil.find(".history-nav.history-next"),
      prev: DomUtil.find(".history-nav.history-prev")
    }
  },
  init: function init(map) {
    var _this8 = this;

    this.element.datePicker.addEventListener("input", function (e) {
      _this8.activeDate = e.target.value;

      _this8.showDialog(_this8.activeDate, _this8.prepareHistoryList());
    });
    this.element.nav.next.addEventListener("click", function (e) {
      _this8.selectVersionByIndex(++_this8.activeIndex);
    });
    this.element.nav.prev.addEventListener("click", function (e) {
      _this8.selectVersionByIndex(--_this8.activeIndex);
    });
    this.element.play.addEventListener("click", function () {
      _this8.playHistory();
    });
    this.element.nav.next.innerHTML = '<img style="width:100%" src="/images/arrow-next.png">';
    this.element.nav.prev.innerHTML = '<img style="width:100%" src="/images/arrow-prev.png">';
    this.element.play.innerHTML = '<img style="width:100%" src="/images/play.svg">';
    this.queryLastVersion();
    L.control.custom({
      position: "bottomright",
      classes: "history custom-control",
      events: {
        click: function click(_ref) {
          var target = _ref.target;

          if (target === _this8.element.clock()) {
            _this8.activateCalendar();
          } else {
            _this8.showRevisionDescription();

            _this8.checkHistoryUpdates(true);
          }
        }
      }
    }).addTo(map);
  },
  stopHistory: function stopHistory() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.element.play.innerHTML = '<img style="width:100%" src="/images/play.svg">';
    }
  },
  playHistory: function playHistory() {
    if (this.interval) {
      this.stopHistory();
      return;
    }

    this.element.play.innerHTML = '<img style="width:100%" src="/images/pause.svg">';
    var lastIndex = this.historyRecords.length - 1;
    this.interval = setInterval(function () {
      if (lastIndex === History.activeIndex) {
        History.stopHistory();
      } else {
        History.selectVersionByIndex(History.activeIndex + 1);
      }
    }, 1500);
  },
  findRevision: function findRevision(id) {
    return this.historyRecords.find(function (revision) {
      return revision.id === id;
    });
  },
  queryLastVersion: function queryLastVersion() {
    var _this9 = this;

    $.ajax({
      dataType: "json",
      url: "".concat(this.apiUrl, "/api/history/last"),
      success: function success(revision) {
        revision.datetime = _this9.formatDate(revision.id);

        _this9.navigationStatus(false, true);

        _this9.currentRevisionId = revision.id;
        _this9.latestVersionId = revision.id;

        _this9.updateStatus(revision, true);

        features = revision.map.features;
        Filter.filterPoints();
        ErrorHandler.saveFallbackRevision(revision);
      },
      error: function error(xhr, ajaxOptions, err) {
        console.error('queryLastVersion: ', err);
        var fallbackRevision = ErrorHandler.getFallbackRevision();

        if (fallbackRevision) {
          ErrorHandler.showError(TranslateService.translate("fallbackRevisionApplied") + _this9.formatDate(fallbackRevision.id, true));
          fallbackRevision.datetime = _this9.formatDate(fallbackRevision.id);

          _this9.navigationStatus(false, true);

          _this9.currentRevisionId = fallbackRevision.id;
          _this9.latestVersionId = fallbackRevision.id;

          _this9.updateStatus(fallbackRevision, true);

          features = fallbackRevision.map.features;
          Filter.filterPoints();
        } else {
          return
        }
      }
    });
  },
  queryVersionById: function queryVersionById(id) {
    var _this10 = this;

    this.currentRevisionId = id;
    var isLastVersion = this.latestVersionId === id;

    if (isLastVersion) {
      this.queryLastVersion();
    } else {
      $.ajax({
        dataType: "json",
        url: "".concat(this.apiUrl, "/api/history/").concat(id, "/geojson"),
        success: function success(data) {
          _this10.navigationStatus(false, false);

          _this10.updateStatus(_this10.findRevision(id), isLastVersion);

          features = data.features;
          Filter.filterPoints();
        }
      });
    }
  },
  queryVersions: function queryVersions(cb) {
    var _this11 = this;

    $.ajax({
      dataType: "json",
      url: "".concat(this.apiUrl, "/api/history/public"),
      success: function success(data) {
        _this11.historyRecords = data.map(function (h) {
          return _objectSpread(_objectSpread({}, h), {}, {
            datetime: _this11.formatDate(h.id),
            description: isEnglish() ? h.descriptionEn : h.description
          });
        });

        if (data.length > 0) {
          cb(data);
        }
      },
      error: function error(err) {
        History.historyRecords = [];
      }
    });
  },
  checkHistoryUpdates: function checkHistoryUpdates() {
    var replace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var badge = DomUtil.find(".history .badge");

    if (latestHistoryId === this.latestVersionId) {
      badge.classList.remove("badge--active");
    } else {
      badge.classList.add("badge--active");
    }

    if (replace) {
      localStorage.setItem("dsm-latest-ver", this.latestVersionId);
      latestHistoryId = this.latestVersionId;
    }
  },
  updateStatus: function updateStatus(revision, isNew) {
    var clockClass = this.isCalendarActivated ? "history__clock history__clock--active" : "history__clock";
    this.element.updated().innerHTML = "<img src=\"/images/history.png\" title=\"".concat(TranslateService.translate("controlTitle.history.calendar"), "\" class=\"").concat(clockClass, "\">\n    <span class=\"history__text\" title=\"").concat(TranslateService.translate("controlTitle.history.timeline"), "\" > <span class=\"badge\"></span> ").concat(TranslateService.translate("updated"), " ").concat(this.formatDate(revision.id, false, TranslateService.translate("atTime")), " <span class=\"history__status\">\n    ").concat(isNew ? "🟢" : "🔵", "\n      </span>\n    </span>");
    this.checkHistoryUpdates();
    this.updateDatePicker();
  },
  updateDatePicker: function updateDatePicker() {
    if (this.historyRecords.length) {
      var lastIndex = this.historyRecords.length - 1;
      var min = this.convertToInputDate(this.historyRecords[0].createdAt);
      var max = this.convertToInputDate(this.historyRecords[this.historyRecords.length - 1].createdAt);
      var currentVersion = this.historyRecords[this.activeIndex];
      var current;

      if (currentVersion) {
        current = this.convertToInputDate(currentVersion.createdAt);
        this.activeDate = current;
      }

      this.element.datePicker.setAttribute("min", min);
      this.element.datePicker.setAttribute("max", max);

      if (max === current && this.activeIndex === lastIndex) {
        this.navigationStatus(false, true);
        this.stopHistory();
      }

      if (min === current && this.activeIndex === 0) {
        this.navigationStatus(true, false);
      }

      this.element.datePicker.value = current || max;
    }
  },
  selectVersionById: function selectVersionById(id) {
    var index = this.historyRecords.findIndex(function (r) {
      return r.id === id;
    });

    if (index !== -1) {
      Dialog.close();
      this.selectVersionByIndex(index);
    }
  },
  selectVersionByIndex: function selectVersionByIndex(index) {
    var revision = this.historyRecords[index];

    if (revision) {
      this.navigationStatus(true, true);
      this.activeIndex = index;
      this.element.datePicker.setAttribute("value", this.convertToInputDate(revision.createdAt));
      this.queryVersionById(revision.id);
    }
  },
  showRevisionDescription: function showRevisionDescription() {
    var _this12 = this;

    if (this.historyRecords.length) {
      this.showDialog(null, this.prepareHistoryList());
    } else {
      this.queryVersions(function (data) {
        var maxIndex = data.length - 1;
        _this12.activeIndex = maxIndex;

        _this12.updateDatePicker();

        _this12.showDialog();
      });
    }

    this.checkHistoryUpdates(true);
  },
  activateCalendar: function activateCalendar() {
    var _this13 = this;

    this.toggleCalendar();

    if (!this.historyRecords.length) {
      this.queryVersions(function (data) {
        var maxIndex = data.length - 1;
        _this13.activeIndex = maxIndex;

        _this13.updateDatePicker();

        _this13.prepareHistoryList();
      });
    }
  },
  toggleCalendar: function toggleCalendar() {
    this.isCalendarActivated = !this.isCalendarActivated;

    if (this.isCalendarActivated) {
      this.element.container.classList.add("history-range--visible");
      this.element.clock().classList.add("history__clock--active");
      document.addEventListener("keyup", this.handleKeyUp, true);
      this.element.play.focus({
        preventScroll: false
      });
    } else {
      this.element.container.classList.remove("history-range--visible");
      this.element.clock().classList.remove("history__clock--active");
      document.removeEventListener("keyup", this.handleKeyUp, true);
    }
  },
  navigationStatus: function navigationStatus(prev, next) {
    this.element.nav.next.disabled = next;
    this.element.nav.prev.disabled = prev;
  },
  handleKeyUp: function handleKeyUp(event) {
    switch (event.key) {
      case "ArrowLeft":
        History.selectVersionByIndex(History.activeIndex - 1);
        break;

      case "ArrowDown":
        History.selectVersionByIndex(History.activeIndex - 1);
        break;

      case "ArrowRight":
        History.selectVersionByIndex(History.activeIndex + 1);
        break;

      case "ArrowUp":
        History.selectVersionByIndex(History.activeIndex + 1);
        break;
    }
  },
  showDialog: function showDialog(header, content) {
    var _this14 = this;

    Dialog.init({
      header: header || TranslateService.translate("historyDescription"),
      content: content || this.prepareHistoryList(),
      styleClass: "history-dialog",
      dismissMask: true,
      open: true
    });
    Dialog.on("close", function (e) {
      _this14.updateDatePicker();
    });
  },
  historiesByDate: function historiesByDate() {
    var _this15 = this;

    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return this.historyRecords.filter(function (h) {
      var historyDate = _this15.convertToInputDate(h.createdAt);

      return historyDate.includes(date || _this15.activeDate);
    });
  },
  prepareHistoryList: function prepareHistoryList() {
    var versions = this.historiesByDate(this.activeDate);
    var list = DomUtil.createElement("ul", {
      styleClass: "history-list"
    });

    if (versions.length) {
      var _iterator3 = _createForOfIteratorHelper(versions),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var version = _step3.value;
          var li = DomUtil.createElement("li", {
            styleClass: "history-version"
          });
          var dateTime = DomUtil.createElement("div", {
            styleClass: this.currentRevisionId === version.id ? "history__datetime history__datetime--active" : "history__datetime",
            attributes: {
              onclick: "History.selectVersionById(".concat(version.id, ")")
            },
            innerText: version.datetime
          });
          var description = DomUtil.createElement("div", {
            styleClass: "history__description",
            innerHTML: version.description
          });
          li.appendChild(dateTime);
          li.appendChild(description);
          list.appendChild(li);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } else {
      list.innerHTML = TranslateService.translate("descriptionEmpty");
    }

    return list;
  },
  formatDate: function formatDate(id) {
    var year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var textBetween = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var date = id * 1000;
    var day = new Date(date).toLocaleDateString([], {
      day: "numeric",
      month: "numeric",
      year: year ? "numeric" : undefined
    });
    var time = new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    return "".concat(day, " ").concat(textBetween, " ").concat(time);
  },
  convertToInputDate: function convertToInputDate(date) {
    date = new Date(date);
    var dd = ("0" + date.getDate()).slice(-2);
    var mm = ("0" + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
  }
};

var MapContainer = {
  dragableMarker: null,
  init: function init() {
    this.initMap();
    this.initTileLayer(); // this.initOutlineLayer();

    this.initRailwayLayer();
    this.initJsonLayer();
    this.initControls();
    this.initDynamicMarker();
  },
  initDynamicMarker: function initDynamicMarker() {
    var _this16 = this;

    document.addEventListener("keydown", function (e) {
      if (e.code === "KeyM") {
        if (_this16.dragableMarker) {
          _this16.dragableMarker.remove();

          _this16.dragableMarker = null;
          /*this.dragableMarkerPopup.remove();
          this.dragableMarkerPopup = null;*/
        } else {
          map.on("click", function (e) {
            if (!_this16.dragableMarker) {
              _this16.dragableMarker = L.marker(e.latlng, {
                draggable: true
              });

              _this16.dragableMarker.addTo(map);
            }
          });
        }
      }
    });
    /*MapContainer.dragableMarkerPopup = L.popup()
          .addTo(map);
    MapContainer.dragableMarker.on("click", (clickE) => {
      MapContainer.dragableMarkerPopup
        .setLatLng(clickE.latlng)
        .setContent("latLon" + clickE.latlng.lat + ",<br>" + clickE.latlng.lng);
      MapContainer.dragableMarkerPopup.toggle();
    });
    map.on("click", (e) => {
      if (!this.dragableMarker) {
        this.dragableMarker = L.marker(e.latlng, { draggable: true });
        this.dragableMarker.addTo(map);
      }
    });*/
  },
  initMap: function initMap() {
    var minZoom = window.innerWidth >= 1024 ? 6 : 5;
    map = L.map("map", {
      minZoom: minZoom,
      zoomSnap: 0.25,
      zoomDelta: 0.25,
      maxZoom: 16,
      zoomControl: false // maxBounds: L.latLngBounds([12.111, 27.169], [52.0508, 61.0202]),

    }).on("load", function () {
      Search.init(map);
    });
    map.setView([49.43832, 32.05268], 6);
    new L.Hash(map);
    Bayraktar.init();
  },
  initOutlineLayer: function initOutlineLayer() {
    $.ajax({
      dataType: "json",
      url: "/outline.json",
      success: function success(data) {
        new L.geoJson(data, {
          style: function style(feature) {
            return {
              weight: 2,
              fillColor: "#474745",
              fillOpacity: 0.4,
              color: "#474745"
            };
          }
        }).addTo(map);
      }
    });
  },
  initRailwayLayer: function initRailwayLayer() {
    $.ajax({
      dataType: "json",
      url: "/railways.json",
      success: function success(data) {
        jsonLayerRailway = new L.geoJson(data, {
          style: function style() {
            return {
              weight: 2,
              fillColor: "#F1F3F4",
              color: "#F1F3F4"
            };
          }
        });
      }
    });
  },
  styleJsonLayer: function styleJsonLayer(feature) {
    return {
      weight: 1,
      fillColor: feature.properties.fill,
      fillOpacity: feature.properties["fill-opacity"] - 0.1,
      color: feature.properties.stroke
    };
  },
  initJsonLayer: function initJsonLayer() {
    jsonLayer = new L.geoJson(null, {
      style: MapContainer.styleJsonLayer,
      pointToLayer: function pointToLayer(feature, latlng) {
        var iconUrl = "/" + feature.properties.icon;
        var iconSize = 24;
        var iconRegex = /\{icon=([A-Za-z0-9_]+)(?:,size=([0-9]{1,3}))*\}/gm;
        var regexMatch = iconRegex.exec(feature.properties.description);

        if (feature.properties.description && regexMatch !== null) {
          iconUrl = "/images/custom/" + regexMatch[1] + ".png";

          if (regexMatch[2]) {
            iconSize = +regexMatch[2];
          }
        }

        var icon = L.icon({
          iconUrl: iconUrl,
          iconSize: [iconSize, iconSize],
          tooltipAnchor: [12, 0]
        });
        var content = preparePopUpContent(feature.properties.description ? feature.properties.description.replace(iconRegex, "") : "", feature.properties.name);
        var marker;

        if (content) {
          var popup = L.popup({
            closeButton: false
          }).setContent(content);
          marker = L.marker(latlng, {
            icon: icon
          }).bindPopup(popup);
        } else {
          marker = L.marker(latlng, {
            icon: icon
          });
        }

        marker.on("click", function (e) {
          var isUrkaineCapital = iconUrl.includes("ukrainecapital");

          if (Bayraktar.isActive && !isUrkaineCapital) {
            Bayraktar.attackPoint(marker);
          }

          if (isUrkaineCapital) {
            setTimeout(function () {
              marker.closePopup();
            }, 1500);

            if (!Bayraktar.isActive) {
              Bayraktar.patrol();
            } else {
              Bayraktar.destroy();
            }
          }
        });
        return marker;
      },
      onEachFeature: function onEachFeature(feature, layer) {
        if (feature.geometry.type === "Polygon") {
          var area = AreaUtils.geometry(feature.geometry) / 1000000;
          var content = preparePopUpContent(feature.properties.description, feature.properties.name, area ? area.toFixed(2) : null);

          if (content) {
            var popup = L.popup({
              closeButton: false
            }).setContent(content);
            layer.bindPopup(popup);
            layer.off("click");
            layer.on("click", function (e) {
              if (!Ruler.rulerActive && !ArtyShooter.active) {
                layer.togglePopup();
              } else if (Ruler.rulerActive) {
                Ruler.handleMapClick(e);
              } else if (ArtyShooter.active) {
                ArtyShooter.handleMapClick(e);
              }
            });
          }
        }
      }
    }).addTo(map);
  },
  initControls: function initControls() {
    // Top Right Controls
    // INFO
    var infoBtn = L.control.custom({
      position: "topright",
      classes: "btn-info",
      style: {
        cursor: "pointer",
        width: "40px"
      },
      events: {
        click: function click() {
          Dialog.init({
            header: TranslateService.translate("map"),
            styleClass: "legend-dialog",
            content: " \n              ".concat(TranslateService.translate("info.legend"), ":\n              <ul class=\"legend-list\">\n             <li class=\"legend__item\"> <div class=\"area area--green\"></div><span class=\"legend__description\"> - ").concat(TranslateService.translate("info.green"), "; </span></li>\n              <li class=\"legend__item\"> <div class=\"area area--red\"></div><span class=\"legend__description\"> - ").concat(TranslateService.translate("info.red"), "; </span></li>\n </span></li>\n"),
            dismissMask: true
          });
          Dialog.open();
          document.querySelector("a[data-show-mail]").addEventListener("click", showMail);
        }
      }
    }).addTo(map); // WarMapUAUA

    L.control.custom({
      position: "bottomright",
      content: '<a href="https://t.me/Project_WarMapUA"  title="WarMapUA" target="_blank"><img style="width:100%" alt="WarMapUA" src="http://belomorskaya23.ru/wp-content/uploads/2021/03/telegram-black.png" /></a>',
      classes: "btn-info",
      style: {
        cursor: "pointer",
        width: "40px"
      }
    }).addTo(map);


    // HISTORY  


    History.init(map); // ZOOM

    L.control.zoom({
      position: "bottomright"
    }).addTo(map); // RULER

    Ruler.init(map); // LAYERS

    var layersIcon = "<div style=\"width: 30px; height: 30px; line-height: 30px; text-align: center; border-radius: 8px; background-color: #fff; cursor: pointer\" title=\"".concat(TranslateService.translate("controlTitle.layers"), "\">\n    <img style=\"width: auto; height: 22px; margin-top: 4px\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqGFE-Rc8eKtbidRgG5jeXpJDBRWAdYu453FT_8zLa3A&s\" alt=\"Cartographic data provided by MapTiler\" style=\"width: 110px;\">\n</div>");
    L.control.custom({
      id: "layers-control",
      position: "bottomright",
      classes: "leaflet-bar",
      content: layersIcon,
      style: {
        cursor: "pointer",
        display: mapboxgl.supported() ? "block" : "none"
      },
      events: {
        click: function click() {
          var content = "\n              <div class=\"base-layer-row\" onClick=\"MapContainer.switchBaseLayer('default');\">\n                <div class=\"base-layer-preview ".concat(currentBaseLayer === "default" ? "active" : "", "\">\n                  <div class=\"preview-default\"></div>\n                </div>\n                <div class=\"base-layer-title\">\n                  <div>").concat(TranslateService.translate("layers.layerDefault"), "</div>\n                </div>\n              </div>\n              <div class=\"base-layer-row\" onClick=\"MapContainer.switchBaseLayer('terrain');\">\n                <div class=\"base-layer-preview ").concat(currentBaseLayer === "terrain" ? "active" : "", "\">\n                  <div class=\"preview-terrain\"></div>\n                </div>\n                <div class=\"base-layer-title\">\n                  <div>").concat(TranslateService.translate("layers.layerTerrain"), "</div>\n                </div>\n              </div>\n              <div class=\"base-layer-row\" onClick=\"MapContainer.switchBaseLayer('satellite');\">\n                <div class=\"base-layer-preview ").concat(currentBaseLayer === "satellite" ? "active" : "", "\">\n                  <div class=\"preview-satellite\"></div>\n                </div>\n                <div class=\"base-layer-title\">\n                  <div>").concat(TranslateService.translate("layers.layerSatellite"), "</div>\n                </div>\n              </div>\n              <br />\n              <div style=\"text-align: center; margin-bottom: 1rem;\">\n                ").concat(TranslateService.translate("layers.copyright"), "<a href=\"https://www.maptiler.com/\" target=\"_blank\">MapTiler</a>\n              </div>\n            ");
          Dialog.init({
            header: TranslateService.translate("layers.dialogTitle"),
            styleClass: "layers-dialog",
            dismissMask: true,
            content: content,
            open: true
          });
        }
      }
    }).addTo(map); // bottom left

    L.control.custom({
      id: "maptiler-copyright",
      position: "bottomleft",
      content: "<a href=\"https://www.maptiler.com\" target=\"_blank\">\n          <img src=\"https://api.maptiler.com/resources/logo.svg\" alt=\"Cartographic data provided by MapTiler\" style=\"width: 110px;\">\n        </a>"
    }).addTo(map);
    L.control.scale({
      position: "bottomleft"
    }).addTo(map);
    FirmsLayer.init();

    if (isWebVersion) {
      if (localStorage.getItem("firms-reload-callback") === "yep") {
        FirmsLayer.enable();
        localStorage.removeItem("firms-reload-callback");
      }
    }

    ArtyShooter.init();
    var iconUser = "<div style=\"width: 12px; height: 14px; text-align: center; border-radius: 8px; background-color: #fff; cursor: pointer\" title=\"".concat(TranslateService.translate("controlTitle.online"), "\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d=\"M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z\"/></svg>\n    </div>");

    var buildOnlineCounter = function buildOnlineCounter(count) {
      return "<div style=\"font-size: 1rem; padding: 0 4px;\" title=\"".concat(TranslateService.translate("controlTitle.online"), "\">\n      <span class=\"online-users-count\">").concat(count, "</span>\n    </div>");
    };

    L.control.custom({
      id: "online-control",
      position: "bottomleft",
      classes: "leaflet-bar",
      content: iconUser + buildOnlineCounter(onlineUsers || ""),
      style: {
        cursor: "pointer",
        display: "none",
        padding: "4px 8px",
        "align-items": "center"
      },
      events: {
        click: function click() {
          if (!onlineUsersBreakdown) return;
          var table = DomUtil.createElement("table", {
            styleClass: "online-table"
          });
          var body = DomUtil.createElement("tbody");
          table.appendChild(body);
          var bodyRaw = "";

          var _iterator5 = _createForOfIteratorHelper(onlineUsersBreakdown),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var country = _step5.value;
              bodyRaw += "<tr> <td>".concat(getFlagEmoji(country.code), " ").concat(country.code, "</td> <td>").concat(country.count, "</td> </tr>");
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          bodyRaw += "<tr> <td style=\"font-weight:600\">".concat(TranslateService.translate("total"), ":</td> <td style=\"font-weight:600\">").concat(onlineUsers, "</td> </tr>");
          body.innerHTML = bodyRaw;
          Dialog.init({
            header: TranslateService.translate("online"),
            styleClass: "online-dialog",
            dismissMask: true,
            content: table,
            open: true
          });
        }
      }
    }).addTo(map);
  },
  initTileLayer: function initTileLayer() {
    var baseLayer = "default";

    if (isWebVersion) {
      var savedBaseLayer = localStorage.getItem("base-layer");
      if (savedBaseLayer !== null) baseLayer = savedBaseLayer;
    }

    MapContainer.switchBaseLayer(baseLayer);
  },
  bindMapEvents: function bindMapEvents() {// TODO: placeholder for custom context menu
  },
  switchBaseLayer: function switchBaseLayer(baseLayer) {
    if (!mapboxgl.supported()) return;

    if (["default", "terrain", "satellite"].indexOf(baseLayer) === -1) {
      return;
    }

    if (currentBaseLayer !== "default" && baseLayer === "default") {
      // Turning off other base layers
      if (baseLayers.terrain !== null) baseLayers.terrain.remove();
      if (baseLayers.satellite !== null) baseLayers.satellite.remove(); // init if not defined

      if (!baseLayers["default"]) {
        if (!mapboxgl.supported()) {
          baseLayers.defaultType = "raster";
          baseLayers["default"] = L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
        } else {
          baseLayers.defaultType = "vector";
          baseLayers["default"] = L.mapboxGL({
            attribution: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
            style: "https://tiles.deepstatemap.live/api/maps/".concat(isEnglish() ? "WarMapUAMapEn" : "DeepStateMap", "/style.json")
          }).addTo(map);
        }
      }

      currentBaseLayer = "default";
      baseLayers["default"].addTo(map);
    } else if (currentBaseLayer !== "terrain" && baseLayer === "terrain") {
      // Turning off other base layers
      if (baseLayers["default"] !== null) baseLayers["default"].remove();
      if (baseLayers.satellite !== null) baseLayers.satellite.remove(); // init if not defined

      if (baseLayers.terrain === null) {
        baseLayers.terrain = L.mapboxGL({
          attribution: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
          style: "https://tiles2.deepstatemap.live/api/maps/".concat(isEnglish() ? "DeepStateTopoEn" : "DeepStateTopo", "/style.json")
        });
      }

      currentBaseLayer = "terrain";
      baseLayers.terrain.addTo(map);
    } else if (currentBaseLayer !== "satellite" && baseLayer === "satellite") {
      // Turning off other base layers
      if (baseLayers["default"] !== null) baseLayers["default"].remove();
      if (baseLayers.terrain !== null) baseLayers.terrain.remove(); // init if not defined

      if (baseLayers.satellite === null) {
        baseLayers.satellite = L.mapboxGL({
          attribution: "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>",
          style: "https://tiles2.deepstatemap.live/api/maps/".concat(isEnglish() ? "DeepStateSatEn" : "DeepStateSat", "/style.json")
        });
      }

      currentBaseLayer = "satellite";
      baseLayers.satellite.addTo(map);
    }

    if (isWebVersion) {
      localStorage.setItem("base-layer", currentBaseLayer);
    }
  }
};
var ErrorHandler = {
  showError: function showError(text) {
    var container = document.querySelector(".error-modal");
    var errorText = document.querySelector(".error-modal .error-message");
    if (!container || !errorText) return;
    errorText.innerHTML = text;
    container.setAttribute("style", "display: block;");
  },
  hideError: function hideError() {
    var container = document.querySelector(".error-modal");
    var errorText = document.querySelector(".error-modal .error-message");
    if (!container || !errorText) return;
    errorText.innerHTML = "";
    container.setAttribute("style", "display: none;");
  },
  saveFallbackRevision: function saveFallbackRevision(revision) {
    if (!isWebVersion) return false;
    localStorage.setItem('fallback-revision', JSON.stringify(revision));
  },
  getFallbackRevision: function getFallbackRevision() {
    if (!isWebVersion) return false;
    var fallbackRevision = localStorage.getItem('fallback-revision');

    try {
      return JSON.parse(fallbackRevision);
    } catch (e) {
      return null;
    }
  }
};
var FirmsLayer = {
  apiRoot: "",
  firmsData: null,
  heatLayer: null,
  state: false,
  toggleIncrement: 0,
  init: function init() {
    // Add FIRMS control
    var iconFirms = "<div style=\"width: 12px; height: 14px; text-align: center; border-radius: 8px; cursor: pointer\" title=\"".concat(TranslateService.translate("controlTitle.firms"), "\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d=\"M384 319.1C384 425.9 297.9 512 192 512s-192-86.13-192-192c0-58.67 27.82-106.8 54.57-134.1C69.54 169.3 96 179.8 96 201.5v85.5c0 35.17 27.97 64.5 63.16 64.94C194.9 352.5 224 323.6 224 288c0-88-175.1-96.12-52.15-277.2c13.5-19.72 44.15-10.77 44.15 13.03C215.1 127 384 149.7 384 319.1z\"/></svg>\n    </div>\n    <div style=\"display: none; position: absolute; bottom: 0; left: 36px; width: 140px; background-color: #ffffff; border-radius: 8px; padding: 5px 8px; font-size: 0.9rem; box-shadow: 0 1px 4px rgb(0 0 0 / 30%);\" id=\"firms-legend\">\n      <div style=\"display: flex; align-items: center; user-select: none;\" data-firms-toggle=\"1\">\n        <div style=\"flex: 0 0 10px; width: 10px; height: 10px; border-radius: 10px; background-color: #B71C1C; border: 1px solid #888; margin-right: 8px;\" data-firms-toggle=\"1\"></div>\n        &lt;6&nbsp;").concat(TranslateService.translate("controlTitle.firmsLegendHours"), "\n      </div>\n      <div style=\"display: flex; align-items: center; user-select: none;\" data-firms-toggle=\"0.75\">\n        <div style=\"flex: 0 0 10px; width: 10px; height: 10px; border-radius: 10px; background-color: #F44336; border: 1px solid #888; margin-right: 8px;\" data-firms-toggle=\"0.75\"></div>\n        6-12&nbsp;").concat(TranslateService.translate("controlTitle.firmsLegendHours"), "\n      </div>\n      <div style=\"display: flex; align-items: center; user-select: none;\" data-firms-toggle=\"0.5\">\n        <div style=\"flex: 0 0 10px; width: 10px; height: 10px; border-radius: 10px; background-color: #F9A825; border: 1px solid #888; margin-right: 8px;\" data-firms-toggle=\"0.5\"></div>\n        12-24&nbsp;").concat(TranslateService.translate("controlTitle.firmsLegendHours"), "\n      </div>\n      <div style=\"display: flex; align-items: center; user-select: none;\" data-firms-toggle=\"0.25\">\n        <div style=\"flex: 0 0 10px; width: 10px; height: 10px; border-radius: 10px; background-color: #FFEB3B; border: 1px solid #888; margin-right: 8px;\" data-firms-toggle=\"0.25\"></div>\n        24-48&nbsp;").concat(TranslateService.translate("controlTitle.firmsLegendHours"), "\n      </div>\n      <div style=\"margin-top: 5px; font-size: 0.85rem; color: #aaa\">\n        ").concat(TranslateService.translate("controlTitle.firmsToggleHint"), "\n      </div>\n    </div>");
    L.control.custom({
      id: "firms-control",
      position: "bottomleft",
      classes: "leaflet-bar firms-control",
      events: {
        click: function click(event) {
          if (FirmsLayer.state) {
            FirmsLayer.disable();
          } else {
            FirmsLayer.enable();
          }
        }
      }
    }).addTo(map);
  },
  getFirmsToggleState: function getFirmsToggleState() {
    var defaultValues = {
      "0": true,
      "0.25": true,
      "0.5": true,
      "0.75": true,
      "1": true
    };
    if (!isWebVersion) return defaultValues;
    var lsValue = localStorage.getItem("firms-toggles");

    if (!lsValue) {
      localStorage.setItem("firms-toggles", JSON.stringify(defaultValues));
      return defaultValues;
    }

    var lsValueParsed = JSON.parse(lsValue);
    return lsValueParsed;
  },
  setFirmsToggleState: function setFirmsToggleState(state) {
    if (!isWebVersion) return;
    var str = JSON.stringify(state);
    localStorage.setItem("firms-toggles", str);
  },
  handleToggleClick: function handleToggleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var toggle = e.target;
    var attrVal = toggle.getAttribute("data-firms-toggle");
    var firmsToggleState = FirmsLayer.getFirmsToggleState();
    firmsToggleState[attrVal] = !firmsToggleState[attrVal];
    FirmsLayer.setFirmsToggleState(firmsToggleState);

    if (FirmsLayer.heatLayer === null) {
      FirmsLayer.heatLayer = FirmsLayer.getPixiLayer(FirmsLayer.firmsData.data).addTo(map);
    } else {
      if (FirmsLayer.heatLayer._renderer.type === 1) {
        try {
          FirmsLayer.heatLayer._renderer.gl.getExtension('WEBGL_lose_context').loseContext();

          console.log('lost context');
        } catch (_unused) {}
      }

      FirmsLayer.heatLayer.remove();
      FirmsLayer.heatLayer = FirmsLayer.getPixiLayer(FirmsLayer.firmsData.data).addTo(map);
    }

    FirmsLayer.dealWithLegend();
    /*FirmsLayer.toggleIncrement += 1;
      if (FirmsLayer.toggleIncrement > 10) {
      if (isWebVersion) {
        localStorage.setItem("firms-reload-callback", "yep");
      }
      location.reload();
    }*/
  },
  dealWithLegend: function dealWithLegend() {
    if (!isWebVersion) return;
    var firmsToggleState = FirmsLayer.getFirmsToggleState();

    var toggles = _toConsumableArray(document.querySelectorAll("[data-firms-toggle]"));

    var _iterator12 = _createForOfIteratorHelper(toggles),
        _step12;

    try {
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        var toggle = _step12.value;
        var attrVal = toggle.getAttribute("data-firms-toggle");

        if (firmsToggleState[attrVal] === false) {
          toggle.style["color"] = "#aaa";
          toggle.style["text-decoration"] = "line-through";
        } else {
          toggle.style["color"] = "#000";
          toggle.style["text-decoration"] = "none";
        }

        toggle.addEventListener("click", FirmsLayer.handleToggleClick);
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }
  },
  styleJsonLayerOverride: function styleJsonLayerOverride(feature) {
    return {
      weight: 1,
      fillColor: feature.properties.fill,
      fillOpacity: feature.properties["fill-opacity"] - 0.2,
      color: feature.properties.stroke
    };
  },
  getPixiLayer: function getPixiLayer(dotArray) {
    var frame = null;
    var firstDraw = true;
    var prevZoom;
    var circleRadius = 5;
    var firmsToggleState = FirmsLayer.getFirmsToggleState();
    dotArray = dotArray.filter(function (dot) {
      return +dot[2] === 0 || firmsToggleState[+dot[2]] == true;
    });
    var circles = dotArray.map(function (dot) {
      return new PIXI.Graphics();
    });
    var pixiContainer = new PIXI.Container();
    pixiContainer.interactive = false;

    var _iterator13 = _createForOfIteratorHelper(circles),
        _step13;

    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
        var circle = _step13.value;
        pixiContainer.addChild(circle);
      }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
    }

    ;
    return L.pixiOverlay(function (utils) {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = null;
      }

      var zoom = utils.getMap().getZoom();
      var container = utils.getContainer();
      var renderer = utils.getRenderer();
      var project = utils.latLngToLayerPoint;
      var scale = utils.getScale();

      if (firstDraw) {
        console.log('firstDraw', circleRadius, scale, circleRadius / scale); // circleRadius = circleRadius / scale;
      }

      if (firstDraw || prevZoom !== zoom) {
        var i = 0;

        var _iterator14 = _createForOfIteratorHelper(circles),
            _step14;

        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var circle = _step14.value;
            var projectedCenter = project([dotArray[i][0], dotArray[i][1]]);
            var color = void 0;
            if (dotArray[i][2] === 1) color = 'B71C1C'; // <6h
            else if (dotArray[i][2] === 0.75) color = 'F44336'; // 6-12
            else if (dotArray[i][2] === 0.5) color = 'F9A825'; // 12-24
            else if (dotArray[i][2] === 0.25) color = 'FFEB3B'; // 24+
            else color = 'FFEB3B'; // another / unknown

            circle.clear();
            circle.beginFill(parseInt(color, 16), 0.75);
            circle.x = projectedCenter.x;
            circle.y = projectedCenter.y;
            circle.lineStyle(1.5 / scale, 0x888888);
            circle.drawCircle(0, 0, circleRadius / scale);
            circle.endFill();
            i += 1;
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }
      }

      var duration = 100;
      var start;

      function animate(timestamp) {
        var progress;
        if (start === null) start = timestamp;
        progress = timestamp - start;
        var lambda = progress / duration;
        if (lambda > 1) lambda = 1;
        lambda = lambda * (0.4 + lambda * (2.2 + lambda * -1.6)); // marker.scale.set(marker.currentScale + lambda * (marker.targetScale - marker.currentScale));

        renderer.render(container);

        if (progress < duration) {
          frame = requestAnimationFrame(animate);
        }
      }

      if (!firstDraw && prevZoom !== zoom) {
        start = null;
        frame = requestAnimationFrame(animate);
      }

      firstDraw = false;
      prevZoom = zoom;
      renderer.render(container);
    }, pixiContainer, {
      doubleBuffering: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
      autoPreventDefault: false
    });
  },
  loadData: function loadData(callback) {
    $.ajax({
      dataType: "json",
      url: "".concat(FirmsLayer.apiRoot, "/api/firms"),
      success: function success(results) {
        FirmsLayer.firmsData = results;
        callback();
      }
    });
  },
  enable: function enable() {
    document.querySelector("#firms-control").style["background-color"] = "#c9c8c8";

    if (FirmsLayer.firmsData === null) {
      FirmsLayer.loadData(function () {
        FirmsLayer.enable();
      });
      return;
    }

    if (FirmsLayer.heatLayer === null) {
      FirmsLayer.heatLayer = FirmsLayer.getPixiLayer(FirmsLayer.firmsData.data).addTo(map);
    } else {
      FirmsLayer.heatLayer.addTo(map);
    }

    jsonLayer.setStyle(FirmsLayer.styleJsonLayerOverride);
    map.attributionControl.addAttribution("<a href=\"https://firms.modaps.eosdis.nasa.gov/map/\" target=\"_blank\">NASA FIRMS</a>");
    document.getElementById("firms-legend").style.display = 'block';
    FirmsLayer.dealWithLegend();
    FirmsLayer.state = true; // report to Google Tag Manager

    gtag('event', 'firms_click');
  },
  disable: function disable() {
    document.querySelector("#firms-control").style["background-color"] = "#ffffff";

    if (FirmsLayer.heatLayer !== null) {
      FirmsLayer.heatLayer.remove();
      jsonLayer.setStyle(MapContainer.styleJsonLayer);
      map.attributionControl.removeAttribution("<a href=\"https://firms.modaps.eosdis.nasa.gov/map/\" target=\"_blank\">NASA FIRMS</a>");
      document.getElementById("firms-legend").style.display = 'none';
      FirmsLayer.state = false;
    }
  }
};
var ArtyShooter = {
  apiRoot: "",
  active: false,
  dataset: null,
  ui: {
    modal: document.querySelector(".arty-modal")
  },
  selected: {
    arty: null,
    round: null
  },
  layers: {
    position: null,
    minCircle: null,
    maxCircle: null,
    auxPoint: null,
    radiusPolyline: null,
    artyName: null,
    rangeLabel: null
  },
  init: function init() {
    var iconArty = "<div style=\"width: 20px; height: 22px; text-align: center; border-radius: 8px; cursor: pointer\" title=\"".concat(TranslateService.translate("controlTitle.arty"), "\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" viewBox=\"0 0 512 512\" preserveAspectRatio=\"xMidYMid meet\">\n      <g transform=\"translate(0.000000,512.000000) scale(0.100000,-0.100000)\" fill=\"#000000\" stroke=\"none\">\n      <path d=\"M4468 4343 l-138 -137 -42 -128 -43 -128 173 -172 172 -173 128 43 128 42 137 138 137 139 0 113 0 114 -143 143 -143 143 -114 0 -113 0 -139 -137z m307 -208 c16 -15 25 -36 25 -55 0 -19 -9 -40 -25 -55 -15 -16 -36 -25 -55 -25 -19 0 -40 9 -55 25 -16 15 -25 36 -25 55 0 19 9 40 25 55 15 16 36 25 55 25 19 0 40 -9 55 -25z\"/>\n      <path d=\"M3582 3297 c-298 -298 -542 -547 -542 -552 0 -13 332 -345 345 -345 6 0 254 244 553 543 l542 542 -178 178 -177 177 -543 -543z\"/>\n      <path d=\"M1295 2786 c-37 -16 -70 -52 -84 -89 -7 -19 -11 -220 -11 -603 l0 -574 72 0 73 0 87 87 88 88 0 392 0 393 233 0 232 0 80 -80 80 -80 107 107 c60 59 108 112 108 118 0 16 -212 221 -247 239 -28 14 -83 16 -410 16 -293 -1 -385 -4 -408 -14z\"/>\n      <path d=\"M2765 2711 c-11 -5 -285 -275 -610 -600 l-590 -591 595 0 595 0 303 303 c278 279 302 305 302 337 0 31 -21 55 -257 292 -266 266 -287 282 -338 259z m170 -416 c50 -49 15 -135 -55 -135 -41 0 -80 39 -80 80 0 41 39 80 80 80 19 0 40 -9 55 -25z m-240 -240 c50 -49 15 -135 -55 -135 -41 0 -80 39 -80 80 0 41 39 80 80 80 19 0 40 -9 55 -25z m-240 -240 c50 -49 15 -135 -55 -135 -19 0 -40 9 -55 25 -16 15 -25 36 -25 55 0 19 9 40 25 55 15 16 36 25 55 25 19 0 40 -9 55 -25z\"/>\n      <path d=\"M3545 1905 c-305 -67 -520 -349 -502 -660 10 -164 70 -298 187 -415 36 -36 91 -80 122 -98 252 -149 568 -111 772 93 123 122 183 253 193 420 24 418 -363 750 -772 660z m286 -346 c67 -36 98 -68 137 -143 22 -43 26 -64 26 -136 1 -78 -2 -90 -33 -148 -38 -70 -70 -100 -145 -140 -43 -22 -64 -26 -136 -26 -72 0 -93 4 -136 26 -75 40 -107 70 -145 140 -31 58 -34 70 -33 148 0 72 4 93 26 136 38 73 69 106 129 139 71 38 102 45 182 40 51 -3 81 -11 128 -36z\"/>\n      <path d=\"M3615 1426 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z\"/>\n      <path d=\"M849 1337 c-24 -13 -212 -110 -416 -216 -248 -128 -381 -203 -398 -222 -89 -106 6 -276 144 -256 20 3 204 93 409 201 l373 196 199 0 200 0 0 160 0 160 -234 0 c-225 0 -235 -1 -277 -23z\"/>\n      <path d=\"M1520 1183 l0 -177 103 -103 103 -103 657 0 656 0 -39 63 c-75 119 -119 276 -120 425 l0 72 -680 0 -680 0 0 -177z\"/>\n      </g>\n    </svg>\n    </div>");
    L.control.custom({
      id: "arty-control",
      position: "bottomleft",
      classes: "leaflet-bar arty-control",
      events: {
        click: ArtyShooter.controlClick
      }
    }).addTo(map);
    map.on("click", function (event) {
      if (ArtyShooter.active) {
        L.DomEvent.stopPropagation(event);
        ArtyShooter.handleMapClick(event);
      }
    });
  },
  loadData: function loadData(callback) {
    $.ajax({
      dataType: "json",
      url: "/arty.json?v=5",
      success: function success(results) {
        ArtyShooter.dataset = results;
        console.log("[Arty] Data loaded: " + results.length);
        callback();
      }
    });
  },
  controlClick: function controlClick() {
    if (ArtyShooter.active) return ArtyShooter.cancel();
    if (Ruler.rulerActive) Ruler.clearMeasurement();
    document.querySelector("#arty-control").style["background-color"] = "#c9c8c8";

    if (ArtyShooter.dataset === null) {
      ArtyShooter.loadData(function () {
        ArtyShooter.controlClick();
      });
      return;
    }

    ArtyShooter.openArtySelectorDialog(); // report to Google Tag Manager

    gtag('event', 'arty_click');
  },
  openArtySelectorDialog: function openArtySelectorDialog() {
    Dialog.init({
      header: TranslateService.translate("artyUi.artyDialogTitle"),
      content: ArtyShooter.buildArtySelectorDialog(null),
      styleClass: "arty-first-dialog",
      dismissMask: true,
      open: true
    });
    Dialog.on("close", function (e) {
      document.querySelector("#arty-control").style["background-color"] = "#ffffff";
    });
  },
  filterArtyType: function filterArtyType(type) {
    var dialog = document.querySelector('.deep-dialog.arty-first-dialog .dialog-content');

    if (dialog) {
      dialog.innerHTML = ArtyShooter.buildArtySelectorDialog(type);
    }
  },
  buildArtySelectorDialog: function buildArtySelectorDialog(selectedType) {
    var html = "<div class=\"arty-ui arty-filter\">";
    var lang = TranslateService.lang;
    var allTypes = ArtyShooter.dataset.map(function (v) {
      return v.meta.type[lang];
    });
    html += "<div class=\"arty-filter-item ".concat(selectedType ? '' : 'active', "\" onclick=\"ArtyShooter.filterArtyType(null)\">\n      ").concat(TranslateService.translate("artyUi.allTypes"), " <strong>").concat(allTypes.length, "</strong>\n    </div>");

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var uniqueTypes = allTypes.filter(onlyUnique);

    var _iterator15 = _createForOfIteratorHelper(uniqueTypes),
        _step15;

    try {
      var _loop2 = function _loop2() {
        var type = _step15.value;
        var count = allTypes.filter(function (t) {
          return t === type;
        }).length;
        html += "<div class=\"arty-filter-item ".concat(selectedType === type ? 'active' : '', "\" onclick=\"ArtyShooter.filterArtyType('").concat(type, "')\">\n        ").concat(type, " <strong>").concat(count, "</strong>\n      </div>");
      };

      for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator15.e(err);
    } finally {
      _iterator15.f();
    }

    html += "</div>";
    html += "<div class=\"arty-ui arty-list\">";
    var filteredDataset = ArtyShooter.dataset;

    if (selectedType) {
      filteredDataset = filteredDataset.filter(function (v) {
        return v.meta.type[lang] === selectedType;
      });
    }

    var _iterator16 = _createForOfIteratorHelper(filteredDataset),
        _step16;

    try {
      var _loop3 = function _loop3() {
        var arty = _step16.value;
        var title = arty.meta.title[lang] || "—";
        var type = arty.meta.type[lang] || "—";
        var wikiLink = arty.meta.wikiLink[lang] || null;
        var capableBool = arty.capable;
        var capable = arty.capable ? TranslateService.translate("artyUi.capable") : TranslateService.translate("artyUi.notCapable");
        var availableIcons = ["th", "sph", "mlrs", "th_caesar_dana"];

        var getIconCode = function getIconCode() {
          if (availableIcons.indexOf(arty.type) !== -1) {
            return "<img src=\"/images/arty/".concat(arty.type, ".svg\" alt=\"").concat(arty.type, " icon\"></div>");
          } else {
            return "";
          }
        };

        html += "<div class=\"arty-ui arty-row\"><div>\n<h1 class=\"arty-ui arty-title\"><div class=\"arty-icon\">".concat(getIconCode()).concat(title, " <span class=\"calibre\">").concat(arty.calibre, "</span></h1>\n<div class=\"arty-ui arty-type\">").concat(type, "</div>");

        if (capableBool !== null) {
          html += "<div class=\"arty-ui arty-capable--".concat(capableBool ? 'yes' : 'no', "\">").concat(capable, "</div>");
        }

        if (wikiLink) {
          html += "<div class=\"arty-ui wiki-link\"><a target=\"_blank\" href=\"".concat(wikiLink, "\">\n          ").concat(TranslateService.translate("artyUi.wikiBtn"), "\n        </a></div>");
        }

        html += '</div>';
        html += "<div class=\"arty-ui arty-select\" onClick=\"ArtyShooter.selectArty('".concat(arty.id, "')\">&gt;</div>");
        html += '</div>';
      };

      for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
        _loop3();
      }
    } catch (err) {
      _iterator16.e(err);
    } finally {
      _iterator16.f();
    }

    html += "</div>";
    return html;
  },
  buildRoundSelectorDialog: function buildRoundSelectorDialog() {
    var arty = ArtyShooter.selected.arty;
    var lang = TranslateService.lang;
    var html = "<div class=\"arty-ui round-go-back\">\n      <span onclick=\"ArtyShooter.openArtySelectorDialog();\">\n      ".concat(TranslateService.translate("artyUi.changeArty"), "\n      </span>\n    </div>\n    <div class=\"arty-ui round-list\">");

    var _iterator17 = _createForOfIteratorHelper(arty.rounds),
        _step17;

    try {
      for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
        var round = _step17.value;
        var title = round.name || "—";
        var wikiLink = round.wikiLink[lang] || null;
        var capableBool = round.capable;
        var capable = round.capable ? TranslateService.translate("artyUi.capable") : TranslateService.translate("artyUi.notCapable");
        var range = (round.range.min / 1000).toFixed(2) + "-" + (round.range.max / 1000).toFixed(2) + TranslateService.translate("artyUi.rangeUnits");
        html += "<div class=\"arty-ui round-row\"><div>\n<h1 class=\"arty-ui round-title\">".concat(title, "</h1>\n<div class=\"arty-ui round-range\">").concat(range, "</div>");

        if (capableBool !== null) {
          html += "<div class=\"arty-ui arty-capable--".concat(capableBool ? 'yes' : 'no', "\">").concat(capable, "</div>");
        }

        if (wikiLink) {
          html += "<div class=\"arty-ui wiki-link\"><a target=\"_blank\" href=\"".concat(wikiLink, "\">\n          ").concat(TranslateService.translate("artyUi.wikiBtn"), "\n        </a></div>");
        }

        html += '</div>';
        html += "<div class=\"arty-ui round-select\" onClick=\"ArtyShooter.selectRound('".concat(arty.id, "', '").concat(round.id, "')\">&gt;</div>");
        html += '</div>';
      }
    } catch (err) {
      _iterator17.e(err);
    } finally {
      _iterator17.f();
    }

    html += "</div>";
    return html;
  },
  selectArty: function selectArty(artyId) {
    Dialog.close();
    var arty = ArtyShooter.dataset.find(function (arty) {
      return arty.id === artyId;
    });
    if (!arty) return;
    ArtyShooter.selected.arty = arty;
    console.log("[Arty] Selected arty: ", arty);
    Dialog.init({
      header: TranslateService.translate("artyUi.roundDialogTitle"),
      content: ArtyShooter.buildRoundSelectorDialog(),
      styleClass: "arty-second-dialog",
      dismissMask: true,
      open: true
    });
    Dialog.on("close", function (e) {
      document.querySelector("#arty-control").style["background-color"] = "#ffffff";
    });
  },
  selectRound: function selectRound(artyId, roundId) {
    Dialog.close();
    var arty = ArtyShooter.dataset.find(function (arty) {
      return arty.id === artyId;
    });
    if (!arty) return;
    var round = arty.rounds.find(function (round) {
      return round.id === roundId;
    });
    if (!round) return;
    ArtyShooter.selected.round = round;
    console.log("[Arty] Selected round: ", round);
    ArtyShooter.prepareToShoot();
  },
  prepareToShoot: function prepareToShoot() {
    document.querySelector("#arty-control").style["background-color"] = "#c9c8c8";
    ArtyShooter.ui.modal.style.display = "block";
    var arty = ArtyShooter.selected.arty;
    var round = ArtyShooter.selected.round;
    if (!arty || !round) return;
    var lang = TranslateService.lang;
    var artyTitle = arty.meta.title[lang] || "—";
    var artyType = arty.meta.type[lang] || "—";
    var roundTitle = round.name || "—";
    var roundRange = (round.range.min / 1000).toFixed(2) + "-" + (round.range.max / 1000).toFixed(2) + TranslateService.translate("artyUi.rangeUnits");
    ArtyShooter.ui.modal.querySelector(".arty-result").innerHTML = "".concat(artyType, " ").concat(artyTitle, "\n      <br />\n      ").concat(roundTitle, " (").concat(roundRange, ") \n      <br />\n      <span class=\"change-round\" onclick=\"ArtyShooter.selectArty('").concat(arty.id, "')\">(").concat(TranslateService.translate("artyUi.changeRound"), ")</span>");
    ArtyShooter.active = true;
  },
  cancel: function cancel() {
    // Enable control
    document.querySelector("#arty-control").style["background-color"] = "#ffffff"; // Hide modal

    ArtyShooter.ui.modal.querySelector(".arty-result").innerText = "";
    ArtyShooter.ui.modal.style.display = "none"; // Clear selections

    ArtyShooter.selected.arty = null;
    ArtyShooter.selected.round = null; // CLear map features

    ArtyShooter.clearFeatures();
    ArtyShooter.active = false;
  },
  addLatitude: function addLatitude(lat, lon, distance) {
    // vertical
    return lat + distance / 1000 / 6378.137 * (180 / Math.PI);
  },
  addLongitude: function addLongitude(lat, lon, distance) {
    // horizontal
    return lon + distance / 1000 / 6378.137 * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);
  },
  handleMapClick: function handleMapClick(e) {
    if (ArtyShooter.active && ArtyShooter.selected.arty && ArtyShooter.selected.round) {
      ArtyShooter.shoot(e.latlng.lat, e.latlng.lng, ArtyShooter.selected.arty, ArtyShooter.selected.round);
    }
  },
  clearFeatures: function clearFeatures() {
    if (ArtyShooter.layers.position) {
      ArtyShooter.layers.position.remove();
      ArtyShooter.layers.position = null;
    }

    if (ArtyShooter.layers.minCircle) {
      ArtyShooter.layers.minCircle.remove();
      ArtyShooter.layers.minCircle = null;
    }

    if (ArtyShooter.layers.maxCircle) {
      ArtyShooter.layers.maxCircle.remove();
      ArtyShooter.layers.maxCircle = null;
    }

    if (ArtyShooter.layers.auxPoint) {
      ArtyShooter.layers.auxPoint.remove();
      ArtyShooter.layers.auxPoint = null;
    }

    if (ArtyShooter.layers.radiusPolyline) {
      ArtyShooter.layers.radiusPolyline.remove();
      ArtyShooter.layers.radiusPolyline = null;
    }

    if (ArtyShooter.layers.artyName) {
      ArtyShooter.layers.artyName.remove();
      ArtyShooter.layers.artyName = null;
    }

    if (ArtyShooter.layers.rangeLabel) {
      ArtyShooter.layers.rangeLabel.remove();
      ArtyShooter.layers.rangeLabel = null;
    }
  },
  shoot: function shoot(lat, lon, arty, round) {
    var dotIcon = L.icon({
      iconUrl: "https://www.pngplay.com/wp-content/uploads/5/Dot-Symbol-Free-PNG.png",
      iconSize: [18, 18]
    });
    ArtyShooter.clearFeatures();
    var artyTitle = arty.meta.title[TranslateService.lang] || "—";
    var roundTitle = round.name || "—";
    var minRange = round.range.min;
    var maxRange = round.range.max;

    if (maxRange) {
      ArtyShooter.layers.position = L.marker([lat, lon], {
        icon: dotIcon
      }).addTo(map);
      ArtyShooter.layers.maxCircle = L.circle([lat, lon], {
        radius: maxRange,
        color: "#000",
        fillColor: "#333",
        fillOpacity: 0.3
      }).addTo(map);
      var maxRangePoint = [lat, ArtyShooter.addLongitude(lat, lon, maxRange)];
      ArtyShooter.layers.auxPoint = L.marker(maxRangePoint, {
        icon: dotIcon
      }).addTo(map);
      ArtyShooter.layers.auxPoint.bindTooltip("".concat(artyTitle, "<br>").concat(roundTitle), {
        permanent: true,
        direction: "right",
        offset: [10, 0]
      });
      ArtyShooter.layers.radiusPolyline = L.polyline([[lat, lon], maxRangePoint], {
        color: "black"
      }).addTo(map);
    }
    /*
    crcl.remove();
    crclMarker.remove();
    crcl = L.circle([49.4447888, 32.0587805], { radius: 10500 }).addTo(map);
    crclMarker = L.marker([49.4447888, addLongitude(49.4447888, 32.0587805, 10500)]).addTo(map);
    crclMarker.bindTooltip("M777", { permanent: true });
    */

  }
}; // adapted from https://github.com/mapbox/geojson-area (c) Mapbox

var AreaUtils = {
  RADIUS: 6378137,
  geometry: function geometry(_) {
    var area = 0,
        i;

    switch (_.type) {
      case 'Polygon':
        return AreaUtils.polygonArea(_.coordinates);

      case 'MultiPolygon':
        for (i = 0; i < _.coordinates.length; i++) {
          area += AreaUtils.polygonArea(_.coordinates[i]);
        }

        return area;

      case 'Point':
      case 'MultiPoint':
      case 'LineString':
      case 'MultiLineString':
        return 0;

      case 'GeometryCollection':
        for (i = 0; i < _.geometries.length; i++) {
          area += AreaUtils.geometry(_.geometries[i]);
        }

        return area;
    }
  },
  polygonArea: function polygonArea(coords) {
    var area = 0;

    if (coords && coords.length > 0) {
      area += Math.abs(AreaUtils.ringArea(coords[0]));

      for (var i = 1; i < coords.length; i++) {
        area -= Math.abs(AreaUtils.ringArea(coords[i]));
      }
    }

    return area;
  },
  ringArea: function ringArea(coords) {
    var p1,
        p2,
        p3,
        lowerIndex,
        middleIndex,
        upperIndex,
        i,
        area = 0,
        coordsLength = coords.length;

    if (coordsLength > 2) {
      for (i = 0; i < coordsLength; i++) {
        if (i === coordsLength - 2) {
          // i = N-2
          lowerIndex = coordsLength - 2;
          middleIndex = coordsLength - 1;
          upperIndex = 0;
        } else if (i === coordsLength - 1) {
          // i = N-1
          lowerIndex = coordsLength - 1;
          middleIndex = 0;
          upperIndex = 1;
        } else {
          // i = 0 to N-3
          lowerIndex = i;
          middleIndex = i + 1;
          upperIndex = i + 2;
        }

        p1 = coords[lowerIndex];
        p2 = coords[middleIndex];
        p3 = coords[upperIndex];
        area += (AreaUtils.rad(p3[0]) - AreaUtils.rad(p1[0])) * Math.sin(AreaUtils.rad(p2[1]));
      }

      area = area * AreaUtils.RADIUS * AreaUtils.RADIUS / 2;
    }

    return area;
  },
  rad: function rad(_) {
    return _ * Math.PI / 180;
  }
};

function preparePopUpContent(description, name) {
  var area = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  name = selectMultiLanguageValue(name);
  var content = "";

  if (description) {
    description = selectMultiLanguageValue(description);
    content = "<b>".concat(name, "</b><br><br>").concat(description);
  } else {
    content = name;
  }

  if (area) {
    content += "<br>\n<i>".concat(TranslateService.translate("controlTitle.calcArea")).concat(area, " ").concat(TranslateService.lang === "uk" ? "км" : "km", "</i><sup>2</sup>");
  }

  return content;
}

function selectMultiLanguageValue() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var versions = text.split("///");

  if (versions.length > 1) {
    return isEnglish() ? versions[1].trim() : versions[0].trim();
  }

  return text;
}

MapContainer.init();
Filter.init();
PopUpManager.init();

function updateRailwayLayer(enabled) {
  if (!jsonLayerRailway || !map) {
    return;
  }

  if (enabled) {
    jsonLayerRailway.addTo(map);
    jsonLayerRailway.bringToFront();
  } else {
    jsonLayerRailway.removeFrom(map);
  }
} // TODO: disabled, needs refactor

/*const pingServer = function () {
  $.ajax({
    dataType: "text",
    url: `/api/ping`,
    success: (data) => {},
    error: () => {},
    complete: () => {},
  });
};
const pinger = setInterval(pingServer, 10000);
pingServer();
const onlineUsersUpdate = function () {
  $.ajax({
    dataType: "json",
    url: `/api/online-accounts`,
    success: (data) => {
      onlineUsers = data.total;
      onlineUsersBreakdown = data.users;

      DomUtil.find(".online-users-count").innerHTML = onlineUsers;
    },
  });
};
const onlineUsersUpdater = setInterval(onlineUsersUpdate, 30000);
setTimeout(onlineUsersUpdate(), 5000);*/


function isEnglish() {
  return lang === "en";
}

var Snitch = {
  correlation: isWebVersion ? localStorage.getItem("snitch-correlation") : null,
  init: function init() {
    var snitchPacket = {
      app: "webapp",
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      correlation: Snitch.correlation || null,
      ua: Navigator.userAgent,
      assets: [],
      state: {}
    };

    var snitchAssets = _toConsumableArray(document.querySelectorAll("[snitch-asset]"));

    var _iterator18 = _createForOfIteratorHelper(snitchAssets),
        _step18;

    try {
      for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
        var asset = _step18.value;
        snitchPacket.assets.push({
          type: asset.tagName,
          src: asset.getAttribute("href") || asset.getAttribute("src")
        });
      }
    } catch (err) {
      _iterator18.e(err);
    } finally {
      _iterator18.f();
    }

    snitchPacket.state = {
      activeRevision: History.currentRevisionId
    };
    $.ajax({
      dataType: "json",
      data: JSON.stringify(snitchPacket),
      contentType: "application/json",
      url: "https://snitch.deepstatemap.live/hello",
      method: "POST",
      success: function success(data) {
        if (data.correlation && isWebVersion) {
          localStorage.setItem("snitch-correlation", data.correlation);
          Snitch.correlation = data.correlation;
        }
      }
    });
  }
};
Snitch.init();

function setDayOfWar() {
  var startAt = new Date(2022, 1, 24);
  var today = new Date();
  var difference = today.getTime() - startAt.getTime();
  var warDay = Math.ceil(difference / 60 / 60 / 24 / 1000);
  var title = DomUtil.find("title");
  var parts = title.innerHTML.split("|");
  title.innerHTML = "".concat(parts[0], " | ").concat(TranslateService.translate("day"), " ").concat(warDay, " | ").concat(parts[1]);
}

setTimeout(function () {
  setDayOfWar();
}, 5000);
setTimeout(function () {
  if (window.location.search) {
    var searchParams = new URLSearchParams(window.location.search);
    var infoParam = searchParams.get("info");

    if (infoParam === "true" && Dialog) {
      document.querySelector(".btn-info").click();
    }
  }
}, 1000);

function showMail(e) {
  var t = e.target;
  var d = "aW5mb0BkZWVwc3RhdGVtYXAubGl2ZQ==";
  t.setAttribute("href", "mailto:" + atob(d));
  t.setAttribute("target", "_blank");
  t.innerHTML = atob(d);
  t.removeEventListener("click");
}