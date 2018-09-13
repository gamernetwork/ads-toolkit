var overtake =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(24)('wks');
var uid = __webpack_require__(6);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(1).String.includes;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(10);
var context = __webpack_require__(21);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(27)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var hide = __webpack_require__(4);
var redefine = __webpack_require__(17);
var ctx = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(13);
var toPrimitive = __webpack_require__(15);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(5)(function () {
  return Object.defineProperty(__webpack_require__(14)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(4);
var has = __webpack_require__(18);
var SRC = __webpack_require__(6)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(1).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(20);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(22);
var defined = __webpack_require__(26);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(2);
var cof = __webpack_require__(23);
var MATCH = __webpack_require__(7)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(25) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(7)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/fn/string/includes.js
var includes = __webpack_require__(8);

// CONCATENATED MODULE: ./src/js/components/base-styles.js
function applyBaseStyles(props, clickUrlEsc) {
  var this_site = props.site;
  var page_wrapper = props.pageWrapper;
  var takeover_bg_color = props.takeoverBGColor;
  var takeover_skin_image = props.skinImg;
  var takeover_skin_link = props.skinLink;
  var skin_height = props.skinHeight;
  var leaderboard_height = props.leaderboardHeight;
  var supersize_me = props.supersize;
  var extendHalfpageNLPS = props.skinLong;
  var skin_top_offset = props.skinTopOffset; // Apply metabomb styles

  if (this_site == 'metabomb.net') {
    page_wrapper = '#page-wrapper';
    parent.jQuery('.billboard').css({
      'max-width': '1260px'
    });
    parent.jQuery('.billboard-container').css({
      'padding': '0'
    });
  } // Apply nintendolife and pushsquare styles


  if (this_site == 'nintendolife.com' || this_site == 'pushsquare.com') {
    page_wrapper = '#page';
    parent.jQuery('.inset').css({
      'position': 'relative'
    });
    parent.jQuery('.insert.for-desktop').css({
      'padding': '0'
    });
    parent.jQuery('.masthead .insert').css({
      'min-height': 'auto'
    });
    window.frameElement.style.width = '1280px';
  } // Apply indiedb specific styles


  if (this_site == 'indiedb.com') {
    skin_top_offset = '-38';
  } // Apply road to vr specific styles


  if (this_site == 'roadtovr.com') {
    page_wrapper = '#td-outer-wrap > .td-outer-container';
  } // Apply mod / indie specific styles


  if (this_site == 'moddb.com' || this_site == 'indiedb.com') {
    parent.$('body').css('background', takeover_bg_color + ' url(' + takeover_skin_image + ') no-repeat center ' + skin_top_offset + 'px').prepend("<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; z-index: 1; width: 100%; height: 100%;'></div>");
    parent.$('#gn_takeover').click(function () {
      window.open(clickUrlEsc + takeover_skin_link, '_blank');
    });
  } else {
    // EG / RPS / general takeover styling
    if (page_wrapper !== '#site-wrapper') {
      parent.jQuery('body').addClass('skin');
    } // Add takeover to page wrapper


    parent.jQuery(page_wrapper).prepend("<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; width: 100%; height: " + skin_height + "px;'></div>"); // Apply styles to #gn_takeover

    parent.jQuery('#gn_takeover').each(function () {
      this.style.setProperty('background-color', takeover_bg_color, 'important');
      this.style.setProperty('background-image', 'url(' + takeover_skin_image + ')', 'important');
      this.style.setProperty('background-position', 'center ' + skin_top_offset + 'px', 'important');
      this.style.setProperty('background-repeat', 'no-repeat', 'important');
    }); // gn_takeover metabomb specific styling

    if (this_site === 'metabomb.net') {
      parent.jQuery('#gn_takeover').css('z-index', '1');
      parent.jQuery('.billboard-container').css('position', 'relative');
      parent.jQuery('.billboard-container').css('z-index', '1');
    } // gn_takeover rps specific styling


    if (this_site == 'rockpapershotgun.com') {
      parent.jQuery('#gn_takeover').css('height', '1316px');
      parent.jQuery('#gn_takeover').css('z-index', '-1');
    }

    if (this_site == 'eurogamer.net') {
      parent.jQuery('#gn_takeover').css('height', '1316px');
    } // Attatch click listener to #gn_takeover


    parent.jQuery('#gn_takeover').click(function () {
      window.open(clickUrlEsc + takeover_skin_link, '_blank');
    }); // Adjust leaderboard height and padding

    parent.jQuery('#leaderboard').css({
      'height': leaderboard_height + 'px',
      'min-height': leaderboard_height + 'px'
    });
    parent.jQuery('.advert.leaderboard.landscape').css({
      'height': leaderboard_height + 'px'
    });
    parent.jQuery('.leaderboard-container').css({
      'padding': '0'
    }); // Metabomb specific document styling

    if (this_site == 'metabomb.net') {
      parent.jQuery('.document').css({
        'padding': '0'
      });
      parent.jQuery('.billboard-container').css({
        'padding': '0'
      });
      parent.jQuery('.billboard.advert').css({
        'padding': '0',
        'width': '1260px'
      }); // Resize leaderboatd iframe size for metabomb 

      window.frameElement.style.width = '1260px';
    } // If new leaderboard height is defined, attempt to resize


    if (leaderboard_height) {
      // Catch error so that creatives will still display in dfp
      try {
        window.frameElement.style.height = leaderboard_height + 'px';
      } catch (e) {
        console.warn('Could not interact with parent IFrame, or parent IFrame does not exist'); // eslint-disable-line no-console
      }

      parent.jQuery(page_wrapper).each(function () {
        this.style.setProperty('position', 'relative');
      });
    } // Supersize code


    if (supersize_me) {
      parent.jQuery(".right-sidebar").remove();
      parent.jQuery(page_wrapper).each(function () {
        this.style.setProperty('background-color', takeover_bg_color, 'important');
      });
    } // Add skin-long class to nintendolife and pushsquare


    if (extendHalfpageNLPS) {
      parent.jQuery('body').addClass('skin-long');
    } // Ensure cursor is pointer for #gn_takeover


    parent.jQuery('html').bind('mousemove', function (e) {
      if (e.target == parent.jQuery(page_wrapper)[0] && e.pageY <= skin_height + parent.jQuery(page_wrapper).position().top) {
        parent.jQuery('html').css({
          'cursor': 'pointer'
        });
      } else {
        parent.jQuery('html').css({
          'cursor': 'auto'
        });
      }
    }); // Ensure a click on #gn_takeover opens the click url

    parent.jQuery('html').bind('click', function (e) {
      if (e.target == parent.jQuery(page_wrapper)[0] && e.pageY <= skin_height + parent.jQuery(page_wrapper).position().top) {
        window.open(clickUrlEsc + takeover_skin_link, '_blank');
      }
    });
  }
}
// CONCATENATED MODULE: ./src/js/components/sync-iframes.js
function syncIframes(site, skinImg) {
  var this_site = site;
  var takeover_skin_image = skinImg; // Check if unit is a halfpage or leaderboard

  var is_halfpage = document.querySelector('#ad-wrapper').getAttribute('rel').includes('halfpage');
  var targetHalfpageContentWindow; // Leaderboard Code

  if (!is_halfpage) {
    var halfpageContainer = '#skyscraper'; // Set target halfpage for post message based on host site

    switch (this_site) {
      case 'usgamer.net':
        halfpageContainer = '.advert.halfpage';
        break;

      case 'moddb.com':
      case 'indiedb.com':
        halfpageContainer = '.column.span-300.last';
        break;

      case 'metabomb.net':
        halfpageContainer = 'aside';
        break;

      case 'pushsquare.com':
        halfpageContainer = '.col-2';
        break;

      case 'nintendolife.com':
        halfpageContainer = '.col-2';
        break;

      case 'vg247.com':
        halfpageContainer = '#skyscraper';
        break;
    } // Try catch block so that post code does not error out 


    try {
      // Find iFrame within target halfpage
      var targetHalfpage = parent.jQuery(halfpageContainer).find('iframe'); // Nintendolife features different halfpage wrappers for the home screen and articles

      if (targetHalfpage.length < 1) {
        if (this_site == 'nintendolife.com' || this_site === 'pushsquare.com') {
          targetHalfpage = parent.jQuery('#page-sidebar').find('iframe');
        }
      }

      targetHalfpageContentWindow = targetHalfpage[0].contentWindow;
    } catch (e) {
      console.warn('Could not find target halfpage'); // eslint-disable-line no-console
    } // Check if skin image has loaded


    document.querySelector('#skin-load-test').src = takeover_skin_image;
    document.body.classList.add('js-loading'); // Post message and trigger animations on load

    window.addEventListener('load', function () {
      document.body.classList.remove('js-loading');
      document.body.style.display = 'block';

      try {
        targetHalfpageContentWindow.postMessage('leaderboard+skin_loaded', window.parent.window.location.href);
      } catch (e) {
        console.warn('Target halfpage not defined, postMessage failed'); // eslint-disable-line no-console
      }
    });
  } else {
    // Halfpage Code
    window.addEventListener('load', function () {
      // If no post message is received within a timeout time, show the creative
      setTimeout(function () {
        if (document.body.style.display === 'none') {
          document.body.classList.remove('js-loading');
          document.body.style.display = 'block';
        }
      }, 2500);
    }); // Resume animations and display on post message

    window.addEventListener('message', function (e) {
      if (e.data.indexOf('leaderboard+skin_loaded') >= 0) {
        document.body.classList.remove('js-loading');
        document.body.style.display = 'block';
      }
    });
  }
}
// CONCATENATED MODULE: ./src/js/components/video-player.js
function videoLightbox(el, analytics) {
  // Youtube Iframe api
  var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  var analytics_ref = analytics;
  var this_site = '%%SITE%%'; // Video Popup

  var videoLink;
  var getDur;
  var watchTime = 0;
  var hasEnded = false;
  parent.jQuery('head').append("<script type='text/javascript' src='//images.eurogamer.net/2014/plugins/fancybox/jquery.fancybox.min.js'></script>");
  parent.jQuery('head').append("<link rel='stylesheet' href='//images.eurogamer.net/2014/plugins/fancybox/styles/jquery.fancybox.css' type='text/css' media='screen'/>"); // Tracking Code

  window.onYouTubeIframeAPIReady = function () {
    // eslint-disable-line no-unused-vars
    jQuery(document).ready(function () {
      var $LINK = jQuery(el);
      $LINK.on('click', function (e) {
        e.preventDefault();
        videoLink = this.href;
        window.ga('showcase.send', 'event', {
          'eventCategory': analytics_ref,
          'eventAction': 'Video Started Playing',
          'eventLabel': '%%SITE%%'
        });
        hasEnded = false;
        parent.jQuery.fancybox({
          type: 'iframe',
          href: videoLink + '?enablejsapi=1&autoplay=1',
          controls: 0,
          maxWidth: 1262,
          maxHeight: 710,
          fitToView: false,
          width: '90%',
          height: '90%',
          autoSize: false,
          scrolling: 'no',
          padding: '0',
          afterShow: function afterShow() {
            if (videoLink.includes('youtube')) {
              var $VIDEO_IFRAME = parent.jQuery('.fancybox-inner').find('iframe').attr('id');
              var iframeSelection = parent.jQuery('#' + $VIDEO_IFRAME + '')[0];
              player = new YT.Player(iframeSelection, {
                // eslint-disable-line no-undef
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
              });
            }
          },
          afterClose: function afterClose() {
            if (!hasEnded) {
              clearInterval(getDur);
            }
          }
        });
      });

      function onPlayerReady(event) {
        // eslint-disable-line no-unused-vars
        var VIDEO_TIME = player.getDuration();
        var VIDEO_QUARTILE = VIDEO_TIME / 4;
        var hasHit25 = false;
        var hasHit50 = false;
        var hasHit75 = false;
        getDur = setInterval(function () {
          watchTime = parseInt(player.getCurrentTime().toFixed(0));

          if (watchTime > VIDEO_QUARTILE && watchTime < VIDEO_QUARTILE * 2) {
            if (!hasHit25) {
              sendAnalytics(25);
              hasHit25 = true;
            }
          } else if (watchTime > VIDEO_QUARTILE * 2 && watchTime < VIDEO_QUARTILE * 3) {
            if (!hasHit50) {
              sendAnalytics(50);
              hasHit50 = true;
            }
          } else if (watchTime > VIDEO_QUARTILE * 3 && watchTime < VIDEO_QUARTILE * 4) {
            if (!hasHit75) {
              sendAnalytics(75);
              hasHit75 = true;
            }
          } else {
            return false;
          }
        }, 100);
      }

      function onPlayerStateChange(event) {
        if (event.data === 0) {
          clearInterval(getDur);
          hasEnded = true;
          sendAnalytics(100);
        }
      }
    });

    function sendAnalytics(percent) {
      window.ga('showcase.send', 'event', {
        'eventCategory': analytics_ref,
        'eventAction': 'Overlay Video: Watched ' + percent + '%',
        'eventLabel': this_site
      });
    }
  };
}
// CONCATENATED MODULE: ./src/js/components/analytics.js
function addAnalytics() {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0]; // eslint-disable-line semi

    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m); // eslint-disable-line semi
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  window.ga('create', 'UA-23103987-1', 'auto', {
    'name': 'showcase'
  });
}
// EXTERNAL MODULE: ./src/css/main.css
var main = __webpack_require__(28);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return src_init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightbox", function() { return src_lightbox; });






addAnalytics();
var src_lightbox;
var src_init = function init(props, clickUrlEsc) {
  // Apply skin styles if not in local dev mode
  !props.dev && applyBaseStyles({
    site: props.site,
    pageWrapper: props.pageWrapper != null ? props.pageWrapper : '#page-wrapper',
    takeoverBGColor: props.takeoverBGColor != null ? props.takeoverBGColor : 'black',
    skinImg: props.skinImg,
    skinLink: props.skinLink,
    skinHeight: props.skinHeight != null ? props.skinHeight : 1300,
    skinTopOffset: props.skinTopOffset != null ? props.skinTopOffset : '0',
    leaderboardHeight: props.leaderboardHeight != null ? props.leaderboardHeight : '250',
    supersize: props.supersize != null ? props.supersize : false,
    skinlong: props.skinLong != null ? props.skinLong : true
  }, clickUrlEsc);
  syncIframes(props.site, props.skinImg);

  src_lightbox = function lightbox(el) {
    videoLightbox(el, props.analytics);
  };
};


/***/ })
/******/ ]);