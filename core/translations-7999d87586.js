"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TranslateService = {
  lang: "uk",
  setLang: function setLang(lang) {
    this.lang = lang;
  },
  translate: function translate(key) {
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var properties = key.split(".");
    var value = this.translations[lang || this.lang];

    var _iterator = _createForOfIteratorHelper(properties),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prop = _step.value;
        value = value[prop] || key;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return value;
  },
  translations: {
    uk: {
      day: "????????",
      atTime: "o",
      newsList: "C???????????? ??????????",
      map: "WarMapUA Info",
      info: {
        blue: "??????????????????, ?????????????????? ???? ?????????????? ?????? ??????????",
        green: "?????????????????? ??????????????????",
        gray: "??????????????????, ???? ???????????????? ??????????????????",
        red: "?????????????????? ?????????????????? ??????????????????",
        purple: "?????????????????? ?????????? ???? ??????????",
        pink: "?????????????????? ??????????????????????'??",
        legend: "??????????????????",
        sendForUs: "???????????????????? ????????????????????",
        message: "?? ?????????????? ???????? ???? ???????????????????????????? ?????????? ?????? ?????????????????????? ?????????????????? ??????????????????, ?????????????????? ???????????????????????? ???????????????? ????????????????????, ?????????? ???????????????? ??????????.",
        showMail: "???????????????? ???????????????????? ??????????"
      },
      siteRights: {
        respectOurWork: "???? ?????????????????? ?????????????????? ???????? ??????????, ?????????????????? ???????? ????????????!",
        win: "?????????????????? ?????????????????? ???????????????????? ????????????!",
        ok: "??????????????????!"
      },
      subscribe: {
        telegram: "?????????????????????? ???? ????????????????-?????????? ??????????????",
        label: "??????????????????????"
      },
      noResults: "?????????????????????? ???? ????????????????",
      updated: "????????????????",
      historyDescription: "???????? ????????",
      descriptionEmpty: "?? ?????????????? ???????? ???????????????? ???????? ???? ????????.",
      updating: "",
      ruler: {
        firstPressOnMap: "?????????????????? ?????? ???????????? ??????????",
        continuePressing: "?????????????????????? ?????????????????? ?????? ?????????????????? ??????????, ?????????? ?????????? ????????????????????",
        totalDistance: "???????????????? ????????????????"
      },
      layers: {
        dialogTitle: "???????????? ????????",
        layerDefault: "??????????????????",
        layerTerrain: "??????????????????????????",
        layerSatellite: "?????? ?? ??????????????????",
        copyright: "???????????? ????????????: "
      },
      total: "????????????",
      online: "?????????????????????? ????????????",
      controlTitle: {
        ruler: "????????????????",
        history: {
          calendar: "????????????????",
          timeline: "???????????? ????????"
        },
        legend: "??????????????",
        filter: "????????????",
        posts: "???????????? ??????????",
        online: "?????????????????????? ????????????",
        layers: "?????? ????????",
        icons: {
          hide: "?????????????????? ????????????",
          show: "???????????????? ????????????"
        },
        rail: {
          hide: "?????????????????? ??????????????????",
          show: "???????????????? ??????????????????"
        },
        bayraktar: "??????????????????",
        firms: "????????????",
        firmsLegendHours: "??????.",
        firmsToggleHint: "?????????????????? ???? ???????????????? ?????? ?????????????????? ?????????? ????????????",
        arty: "??????????????????",
        calcArea: "??????????: "
      },
      loadMore: "?????????????????????? ????????????",
      fallbackRevisionApplied: "???????????? ??????????????????????. ?????????????????????? ???????????? ?????? ",
      fallbackRevisionUnavailable: "???????????? ?????????????????????? ?? ?????????? ???????????????????? ????????????. ?????????????????? ??????????????.",
      artyUi: {
        artyDialogTitle: "?????????????? ?????????? ????????????????",
        changeArty: "< ?????????????? ?????????? ????????????????",
        changeRound: "?????????????? ????????????/????????????",
        roundDialogTitle: "?????????????? ????????????/????????????",
        wikiBtn: "????????????????????",
        capable: "???? ??????????????????",
        notCapable: "???? ???? ??????????????????",
        rangeUnits: " ????",
        allTypes: "?????? ????????"
      }
    },
    en: {
      day: "Day",
      atTime: "at",
      newsList: "News List",
      map: "DeepState Map",
      info: {
        blue: "liberated less than 2 weeks ago",
        green: "liberated",
        gray: "territory with unknown status",
        red: "territory occupied by russians",
        purple: "territory of Crimea and occupied in 2014-2015",
        pink: "the territory of Transnistria",
        unit: "enemy unit",
        headquarters: "enemy headquarters",
        airfields: "enemy airfields",
        fleet: "enemy fleet",
        directions: "enemy directions",
        legend: "LEGEND",
        sendForUs: "Submit information",
        railway: "railways",
        message: "Never use this map to make safe routes. Use the green corridors offered by the authorities.",
        showMail: "Show e-mail"
      },
      siteRights: {
        respectOurWork: "Don't forget to mention our map, respect our work!",
        win: "Together we will defeat the enemy!",
        ok: "OK!"
      },
      subscribe: {
        telegram: "Subscribe to the authors' telegram channel",
        label: "Subscribe"
      },
      noResults: "No results found",
      updated: "Updated",
      historyDescription: "History Description",
      descriptionEmpty: "There were no map updates on the selected date",
      updating: "Updating...",
      ruler: {
        firstPressOnMap: "Click on the map to add the first point",
        continuePressing: "Keep clicking to add more points. Points are draggable.",
        totalDistance: "Total Distance"
      },
      layers: {
        dialogTitle: "Map layer",
        layerDefault: "Default",
        layerTerrain: "Topo",
        layerSatellite: "Satellite",
        copyright: "Cartographic data provided by "
      },
      online: "Users online",
      total: "Total",
      controlTitle: {
        filter: "Filter",
        ruler: "Rule",
        history: {
          calendar: "History Calendar",
          timeline: "History Timeline"
        },
        legend: "Map Legend",
        posts: "Posts",
        online: "Users online",
        layers: "Map Layer",
        icons: {
          hide: "Hide Icons",
          show: "Show Icons"
        },
        rail: {
          hide: "Hide railways",
          show: "Show railways"
        },
        bayraktar: "Bayraktar",
        firms: "Fires",
        firmsLegendHours: "h",
        firmsToggleHint: "tap on a circle to hide odd fires",
        arty: "Artillery",
        calcArea: "Area: "
      },
      loadMore: "Load More",
      fallbackRevisionApplied: "Server is unreachable. Loaded version as of ",
      artyUi: {
        artyDialogTitle: "Choose artillery",
        changeArty: "< Change artillery",
        changeRound: "change ammo",
        roundDialogTitle: "Choose projectile",
        wikiBtn: "Read more",
        capable: "in service",
        notCapable: "not in service",
        rangeUnits: " km",
        allTypes: "All types"
      }
    }
  }
}; // TODO: rollup export default TranslateService;