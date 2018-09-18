export function syncIframes(site, skinImg, dev) {
  const this_site = site;
  const takeover_skin_image = skinImg;
  const is_dev = dev;
  // Check if unit is a halfpage or leaderboard
  const is_halfpage = document.querySelector('#ad-wrapper').getAttribute('rel').includes('halfpage');
  let targetHalfpageContentWindow;

  // Leaderboard Code
  if (!is_halfpage) {
    let halfpageContainer = '#skyscraper';
    // Set target halfpage for post message based on host site
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

    // Try catch block so that post code does not error out 
    try {
      // Find iFrame within target halfpage
      let targetHalfpage = parent.jQuery(halfpageContainer).find('iframe');
      // Nintendolife features different halfpage wrappers for the home screen and articles
      if (targetHalfpage.length < 1) {
        if (this_site == 'nintendolife.com' || this_site === 'pushsquare.com') {
          targetHalfpage = parent.jQuery('#page-sidebar').find('iframe');
        }
      }
      targetHalfpageContentWindow = targetHalfpage[0].contentWindow;
    } catch (e) {
      console.warn('Could not find target halfpage'); // eslint-disable-line no-console
    }

    // Check if skin image has loaded
    document.querySelector('#skin-load-test').src = takeover_skin_image;
    document.body.classList.add('js-loading');
    // Post message and trigger animations on load
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
    if(is_dev) {
      document.body.classList.remove('js-loading');
      document.body.style.display = 'block';
    }
    window.addEventListener('load', function () {
      // If no post message is received within a timeout time, show the creative
      setTimeout(function () {
        if (document.body.style.display === 'none') {
          document.body.classList.remove('js-loading');
          document.body.style.display = 'block';
        }
      }, 2500);
    });
    // Resume animations and display on post message
    window.addEventListener('message', function (e) {
      if (e.data.indexOf('leaderboard+skin_loaded') >= 0) {
        document.body.classList.remove('js-loading');
        document.body.style.display = 'block';
      }
    });
  }
}