export function videoLightbox(el, analytics, site) {
  // Youtube Iframe api
  let tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;

  const analytics_ref = analytics;
  const this_site = site;

  // Video Popup
  let videoLink;
  let getDur;
  let watchTime = 0;
  let hasEnded = false;

  // Tracking Code
  window.onYouTubeIframeAPIReady = function() { // eslint-disable-line no-unused-vars
    jQuery(document).ready(function () {
      const $LINK = jQuery(el);
      $LINK.on('click', function (e) {
        e.preventDefault();
        videoLink = this.href;
        window.ga('showcase.send', 'event', {
          'eventCategory': analytics_ref,
          'eventAction': 'Video Started Playing',
          'eventLabel': this_site
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
              player = new YT.Player(iframeSelection, { // eslint-disable-line no-undef
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
              });
            }
          },
          afterClose: function () {
            if (!hasEnded) {
              clearInterval(getDur);
            }
          }
        });
      });

      function onPlayerReady(event) { // eslint-disable-line no-unused-vars
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

export function appendLightboxSource() {
  parent.jQuery('head').append(
    "<script type='text/javascript' src='//images.eurogamer.net/2014/plugins/fancybox/jquery.fancybox.min.js'></script>"
  );
  parent.jQuery('head').append(
    "<link rel='stylesheet' href='//images.eurogamer.net/2014/plugins/fancybox/styles/jquery.fancybox.css' type='text/css' media='screen'/>"
  );
}