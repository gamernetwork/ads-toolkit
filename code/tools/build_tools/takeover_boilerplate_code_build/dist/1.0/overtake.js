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
  console.log(analytics); // Youtube Iframe api

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
// EXTERNAL MODULE: ./src/css/main.css
var main = __webpack_require__(0);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return src_init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightbox", function() { return src_lightbox; });




var src_lightbox;
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
  syncIframes(props.site, props.skinImage);

  src_lightbox = function lightbox(el) {
    videoLightbox(el, props.analytics);
  };
};


/***/ })
/******/ ]);