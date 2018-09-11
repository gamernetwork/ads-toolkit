var analytics_ref = 'ANALYTICS_REF_HERE';
var takeover_skin_image = '%%FILE:SKIN%%';
var skin_top_offset = '0';
var leaderboard_height = '250';
var supersize_me = false;
var takeover_bg_color = 'black';
/******** Toggle for dev / prod ********/
var IS_DEV = true;
var IS_HALFPAGE = document.querySelector('.ad-wrapper').getAttribute('rel').indexOf('halfpage') >= 0;
// Add if halfpage = 300x1050 on Pushsquare / Nintendolife
var extendHalfpageNLPS = true;
// Youtube Iframe api
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
// Video Popup
var videoLink;
var getDur;
var watchTime = 0;
var hasEnded = false;
/******** Leave This Stuff ********/
var takeover_skin_link = '%%DEST_URL%%';
var page_wrapper = '#page-wrapper';
var this_site = '%%SITE%%';
var skin_height = 1300;
/******** Animation sync ********/
var has_skin_loaded = false;
// Adjust skin height
if (this_site.indexOf('eurogamer') >= 0) {
  skin_height = 1316;
} else {
  skin_height = 1300;
}
// Pause animation and hide till assets and skin image have loaded (leaderboard code)
if (!IS_HALFPAGE) {
  // Target halfpage iframe to be sent postMessage alerting that leaderboard and skin have loaded
  if (!IS_DEV) {
    var halfpageContainer = '#skyscraper';
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
    }
    var targetHalfpage = parent.jQuery(halfpageContainer).find('iframe');
    if (targetHalfpage.length < 1) {
      if (this_site == 'nintendolife.com' || this_site === 'pushsquare.com') {
        targetHalfpage = parent.jQuery('#page-sidebar').find('iframe');
      }
    }
    try {
      var targetHalfpageContentWindow = targetHalfpage[0].contentWindow;
    } catch (e) {
      console.log('Could not find target halfpage')
    }
  }
  document.querySelector('.skin-load-test').src = takeover_skin_image;
  document.body.classList.add('js-loading');
  window.addEventListener('load', function () {
    document.body.classList.remove('js-loading');
    document.body.style.display = 'block';
    if (!IS_DEV) {
      try {
        targetHalfpageContentWindow.postMessage('leaderboard+skin_loaded', window.parent.window.location.href);
      } catch (e) {
        console.log('Target halfpage not defined, postMessage failed')
      }
    }
  });
}
if (IS_HALFPAGE) {
  if (!IS_DEV) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (document.body.style.display === 'none') {
          document.body.classList.remove('js-loading');
          document.body.style.display = 'block';
        }
      }, 2500);
    });
    window.addEventListener('message', function (e) {
      if (e.data.indexOf('leaderboard+skin_loaded') >= 0) {
        document.body.classList.remove('js-loading');
        document.body.style.display = 'block';
      }
    });
  } else {
    document.body.classList.remove('js-loading');
    document.body.style.display = 'block';
  }
}
/******** Takeover setup code ********/
if (!IS_DEV && !IS_HALFPAGE) {
  if (this_site == 'metabomb.net') {
    page_wrapper = '#page-wrapper';
    parent.jQuery('.billboard').css({
      'max-width': '1260px'
    });
    parent.jQuery('.billboard-container').css({
      'padding': '0'
    });
  }
  if (this_site == 'nintendolife.com' || this_site == 'pushsquare.com') {
    var page_wrapper = '#page';
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
  }
  if (this_site == 'indiedb.com') {
    var skin_top_offset = '-38';
  }
  if (this_site == 'roadtovr.com') {
    var page_wrapper = '#td-outer-wrap > .td-outer-container';
  }
  if (this_site == 'moddb.com' || this_site == 'indiedb.com') {
    parent.$('body').css('background', takeover_bg_color + ' url(' + takeover_skin_image + ') no-repeat center ' +
      skin_top_offset + 'px').prepend(
      "<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; z-index: 1; width: 100%; height: 100%;'></div>"
    );
    parent.$('#gn_takeover').click(function () {
      window.open('%%CLICK_URL_ESC%%' + takeover_skin_link, '_blank');
    });
  } else {
    if (page_wrapper !== '#site-wrapper') {
      parent.jQuery('body').addClass('skin');
    }
    parent.jQuery(page_wrapper).prepend(
      "<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; width: 100%; height: " +
      skin_height + "px;'></div>");
    parent.jQuery('#gn_takeover').each(function () {
      this.style.setProperty('background-color', takeover_bg_color, 'important');
      this.style.setProperty('background-image', 'url(' + takeover_skin_image + ')', 'important');
      this.style.setProperty('background-position', 'center ' + skin_top_offset + 'px', 'important');
      this.style.setProperty('background-repeat', 'no-repeat', 'important');
    });
    if (this_site === 'metabomb.net') {
      parent.jQuery('#gn_takeover').css('z-index', '1');
      parent.jQuery('.billboard-container').css('position', 'relative');
      parent.jQuery('.billboard-container').css('z-index', '1');
    }
    if (this_site == 'rockpapershotgun.com') {
      parent.jQuery('#gn_takeover').css('height', '1316px');
      parent.jQuery('#gn_takeover').css('z-index', '-1');
    }
    parent.jQuery('#gn_takeover').click(function () {
      window.open('%%CLICK_URL_ESC%%' + takeover_skin_link, '_blank');
    });
    parent.jQuery('#leaderboard').css({
      'height': leaderboard_height + 'px',
      'min-height': leaderboard_height + 'px'
    });
    parent.jQuery('.advert.leaderboard.landscape').css({
      'height': leaderboard_height + 'px'
    });
    parent.jQuery('.leaderboard-container').css({
      'padding': '0'
    });
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
      });
      window.frameElement.style.width = '1260px';
    }
    if (leaderboard_height) {
      try {
        window.frameElement.style.height = leaderboard_height + 'px';
      } catch (e) {
        console.log('Could not interact with parent IFrame, or parent IFrame does not exist');
      }
      parent.jQuery(page_wrapper).each(function () {
        this.style.setProperty('position', 'relative');
      });
    }
    if (supersize_me) {
      parent.jQuery(".right-sidebar").remove();
      parent.jQuery(page_wrapper).each(function () {
        this.style.setProperty('background-color', takeover_bg_color, 'important');
      });
    }

    if (extendHalfpageNLPS) {
      parent.jQuery('body').addClass('skin-long');
    }
    parent.jQuery('html').bind('mousemove', function (e) {
      if ((e.target == parent.jQuery(page_wrapper)[0]) && (e.pageY <= skin_height + parent.jQuery(page_wrapper)
          .position().top)) {
        parent.jQuery('html').css({
          'cursor': 'pointer'
        });
      } else {
        parent.jQuery('html').css({
          'cursor': 'auto'
        });
      }
    });
    parent.jQuery('html').bind('click', function (e) {
      if ((e.target == parent.jQuery(page_wrapper)[0]) && (e.pageY <= skin_height + parent.jQuery(page_wrapper)
          .position().top)) {
        window.open('%%CLICK_URL_ESC%%' + takeover_skin_link, '_blank');
      }
    });
  }
}
// Video Code 
parent.jQuery('head').append(
  "<script type='text/javascript' src='//images.eurogamer.net/2014/plugins/fancybox/jquery.fancybox.min.js'><\/script>"
);
parent.jQuery('head').append(
  "<link rel='stylesheet' href='//images.eurogamer.net/2014/plugins/fancybox/styles/jquery.fancybox.css' type='text/css' media='screen' \/>"
);
// Tracking Code
function onYouTubeIframeAPIReady() {
  jQuery(document).ready(function () {
    var $LINK = jQuery('.video-overlay-link');
    $LINK.on('click', function (e) {
      e.preventDefault();
      videoLink = this.href;
      ga('showcase.send', 'event', {
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
        afterShow: function () {
          if (videoLink.includes('youtube')) {
            var $VIDEO_IFRAME = parent.jQuery('.fancybox-inner').find('iframe').attr('id');
            var iframeSelection = parent.jQuery('#' + $VIDEO_IFRAME + '')[0];
            player = new YT.Player(iframeSelection, {
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });

            function onPlayerReady(event) {
              var VIDEO_TIME = player.getDuration();
              var VIDEO_QUARTILE = VIDEO_TIME / 4;
              var hasHit25 = false;
              var hasHit50 = false;
              var hasHit75 = false;
              var hasHit100 = false;
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
          } 
        },
        afterClose: function () {
          if (!hasEnded) {
            clearInterval(getDur);
          }
        }
      });
    });
  });

  function sendAnalytics(percent) {
    ga('showcase.send', 'event', {
      'eventCategory': analytics_ref,
      'eventAction': 'Overlay Video: Watched ' + percent + '%',
      'eventLabel': this_site
    });
  }
}
// Play / pause button code
var AUTOPLAYING_BUTTON = document.querySelector('.autoplaying-video__button');
var AUTOPLAYING_VIDEO = document.querySelector('.autoplaying-video');
var AUTOPLAYING_WRAPPER = document.querySelector('.autoplaying-video-wrapper');
AUTOPLAYING_BUTTON.addEventListener('click', function (e) {
  e.preventDefault();
  if (this.classList.contains('pause')) {
    this.classList.remove('pause');
    AUTOPLAYING_VIDEO.play();
  } else {
    this.classList.add('pause');
    AUTOPLAYING_VIDEO.pause();
  }
});
// Hide / show video with intersection observer 
if ('IntersectionObserver' in window) {
  processIntersection = function (entries) {
    if (AUTOPLAYING_VIDEO) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0.5) {
          AUTOPLAYING_VIDEO.style.display = 'block';
        } else {
          AUTOPLAYING_VIDEO.style.display = 'none';
        }
      });
    }
  };
  var options_dict = {
    threshold: 0.5
  };
  var observer = new IntersectionObserver(processIntersection, options_dict);
  observer.observe(AUTOPLAYING_WRAPPER);
}
// Window focus / blur 
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
// This is useful for carousels etc
function handleVisibilityChange() {
  if (document[hidden]) {

  } else {

  }
}
document.addEventListener(visibilityChange, handleVisibilityChange, false);