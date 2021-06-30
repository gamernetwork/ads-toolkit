// S: PARSELY BBW TRACKING
function checkLoaded () {
  var playoutData = $$api.getPlayoutData();
  if (playoutData.autoPlayOnlyWithPrerollAd) {
    ga('create', playoutData.googleAnalyticsId, 'auto');
    ga('send', 'event', 'Video', 'Autoplay Embed Ready');
  }
}

function trackPlay () {
  if($$api.getPhase() === 'MAIN') {
    var playedVideoMetadata = $$api.getClipData();
    PARSELY.video.trackPlay(playedVideoMetadata.id, {
      title: playedVideoMetadata.title,
      image_url: 'https://gamernetwork.bbvms.com/mediaclip/'+ playedVideoMetadata.id + '/pthumbnail/640/360.jpg',
      duration: playedVideoMetadata.length * 1000,
      pub_date_tmsp: Math.floor(new Date(playedVideoMetadata.publisheddate)),
      authors: [playedVideoMetadata.author],
      section: window.BrockmanBlueBillywig.settings.article_type,
      tags: playedVideoMetadata.cat
    })
  }
}

function trackPause () {
  if($$api.getPhase() === 'MAIN') {
    var playedVideoMetadata = $$api.getClipData();
    PARSELY.video.trackPause(playedVideoMetadata.id, {
      title: playedVideoMetadata.title,
      image_url: 'https://gamernetwork.bbvms.com/mediaclip/'+ playedVideoMetadata.id + '/pthumbnail/640/360.jpg',
      duration: playedVideoMetadata.length * 1000,
      pub_date_tmsp: Math.floor(new Date(playedVideoMetadata.publisheddate)),
      authors: [playedVideoMetadata.author],
      section: window.BrockmanBlueBillywig.settings.article_type,
      tags: playedVideoMetadata.cat
    })
  }
}

function initVideoAnalytics() {
  checkLoaded();

  $$api.on('playing', () => {
      trackPlay();
  });

  $$api.on('pause', () => {
    trackPause();
  });
}

PARSELY = window.PARSELY || {};
initVideoAnalytics();

// E: PARSELY BBW TRACKING