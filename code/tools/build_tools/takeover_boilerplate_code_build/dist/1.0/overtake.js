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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

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
        console.log('Could not interact with parent IFrame, or parent IFrame does not exist');
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
function syncIframes(site) {
  console.log(site);
}
// EXTERNAL MODULE: ./src/css/main.css
var main = __webpack_require__(0);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return src_init; });



var src_init = function init(props, clickUrlEsc) {
  // Apply skin styles if not in local dev mode
  !props.dev && applyBaseStyles({
    site: props.site,
    pageWrapper: props.pageWrapper,
    takeoverBGColor: props.takeoverBGColor,
    skinImg: props.skinImage,
    skinLink: props.skinLink,
    skinHeight: props.skinHeight,
    skinTopOffset: props.skinTopOffset,
    leaderboardHeight: props.leaderboardHeight,
    supersize: props.supersize,
    skinlong: props.skinLong
  }, clickUrlEsc);
  syncIframes(props.site);
};

/***/ })
/******/ ]);