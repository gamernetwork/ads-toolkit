// S: BBW TRACKING
function checkLoaded () {
  var playoutData = $$api.getPlayoutData();
  if (playoutData.autoPlayOnlyWithPrerollAd) {
    ga('create', playoutData.googleAnalyticsId, 'auto');
    ga('send', 'event', 'Video', 'Autoplay Embed Ready');
  }
}

function initVideoAnalytics() {
  checkLoaded();
}

initVideoAnalytics();
// E: BBW TRACKING