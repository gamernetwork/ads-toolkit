function waitForBBW() {
  return new Promise((resolve) => {
     if (typeof bluebillywig !== "undefined" && $$wrapper) {
  //  if (typeof bluebillywig !== "undefined" && bluebillywig.players[0]) {
      return resolve();
    }

    const observer = new MutationObserver((mutations) => {
       if (typeof bluebillywig !== "undefined" && $$wrapper) {
     // if (typeof bluebillywig !== "undefined" && bluebillywig.players[0]) {
        resolve();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

waitForBBW().then(() => {
  let bbwWrapper,
    bbwVideoPlayer,
    bbwCloseButton,
    bbwVideoSidebarText,
    bbwVideoMainText,
    nextTitle;

  document.getElementById("first_sidebar_ad_container").style.cssText =
    "padding: 6px 6px 4px; width: 300px; background: white; margin-bottom: 0.4em; border-radius: 3px;";
  document.getElementById("first_sidebar_ad").style.cssText =
    "width: 288px; height: 165px;";

  function openBBWPlayer() {
    document.getElementById("first_sidebar_ad_container").style.background =
      "#44208d";

    const textContainerHeight = parseInt(
      getComputedStyle(bbwVideoSidebarText).height,
      10
    );

    bbwVideoSidebarText.style.opacity = "1";
    // bbwCloseButton.style.top = "-50px";
    bbwCloseButton.style.top = `${-textContainerHeight - 11}px`;
    bbwCloseButton.style.right = "-3px";
    bbwCloseButton.style.margin = "3px";
  }
  function closeBBWPlayer() {
    document.getElementById("first_sidebar_ad_container").style.background =
      "white";

    bbwVideoSidebarText.style.opacity = "0";
  }

  nextTitle = document
    .querySelector(".bb_iawr")
    .querySelector('.bb-item-prop[itemprop="name"]').content;

  function checkTitleLength(title) {
    title.length > 94 ? (title = title.slice(0, 94) + "...") : "";
    return title;
  }

  const separator = () => (nextTitle.indexOf(":") > -1 ? " - " : ": ");

  // Add text
  document
    .querySelector("#first_sidebar_ad")
    .insertAdjacentHTML(
      "beforebegin",
      `<div class="bbw_video_sidebar_text" style="width: 300px; margin-bottom: 0.4em; opacity: 0;"><p style="color:white; font-size: 0.9em; line-height: 1.3; padding: 0.1em 0.2em 0.2em; width: 268px;"><span class="bb_player_text_prefix"><strong>Playing next${separator()}</strong></span>${checkTitleLength(
        nextTitle
      )}</p></div>`
    );

   $$wrapper.on("outview.bbskin", (e) => {
  //bluebillywig.players[0].on("outview.bbskin", (e) => {
    // if (top.document.querySelector(".bb-float-close-button")) {
    // top.document.querySelector(".bb-float-close-button").style.opacity = "0";
    // }
  });

   $$wrapper.on("resized.bbskin", (e) => {
  //bluebillywig.players[0].on("resized.bbskin", (e) => {
    bbwWrapper = document.querySelector(".bb_iawr");
    bbwVideoPlayer = document.querySelector(".bb-media");
    bbwCloseButton = bbwWrapper.querySelector(".bb-float-close-button");
    bbwVideoMainText = document.querySelector(".bbw_video_main_text");
    bbwVideoSidebarText = document.querySelector(".bbw_video_sidebar_text");

    if (e.target.style.position === "fixed") {
      openBBWPlayer();
    }
    if (e.target.style.position === "relative") {
      closeBBWPlayer();
    }
  });

  window.addEventListener("phasechange", () => {
    if (
      typeof bluebillywig.players[0] !== "undefined" &&
       $$api.getPhase() == "MAIN"
      //bluebillywig.players[0].getPhase() == "MAIN"
    ) {
      top.document
        .querySelectorAll(".bb_player_text_prefix")
        .forEach(
          (el) => (el.innerHTML = `<strong>Now Playing${separator()}</strong>`)
        );
    }
    if (
      typeof bluebillywig.players[0] !== "undefined" &&
       $$api.getPhase() == "EXIT"
      //bluebillywig.players[0].getPhase() == "EXIT"
    ) {
      console.log('EXIT')
      document.querySelector(".bb-media").style.position = "relative";
      closeBBWPlayer();
    }
  });
});

// S: PARSELY BBW TRACKING
function checkLoaded () {
  var playoutData = $$api.getPlayoutData();
  if (playoutData.autoPlayOnlyWithPrerollAd) {
    ga('create', playoutData.googleAnalyticsId, 'auto');
    ga('send', 'event', 'Video', 'Autoplay Embed Ready');
  }
}

function videoMetaData (playedVideoMetadata) {
  return {
      title: playedVideoMetadata.title,
      image_url: 'https://gamernetwork.bbvms.com/mediaclip/'+ playedVideoMetadata.id + '/pthumbnail/640/360.jpg',
      duration: playedVideoMetadata.length * 1000,
      pub_date_tmsp: Math.floor(new Date(playedVideoMetadata.publisheddate)),
      authors: [playedVideoMetadata.author],
      section: window?.BrockmanBlueBillywig?.settings?.article_type || '',
      tags: playedVideoMetadata.cat
  }
}

function trackPlay () {
  if($$api.getPhase() === 'MAIN') {
    var playedVideoMetadata = $$api.getClipData();
    PARSELY.video.trackPlay(playedVideoMetadata.id, videoMetaData(playedVideoMetadata));
  }
}

function trackPause () {
  if($$api.getPhase() === 'MAIN') {
    var playedVideoMetadata = $$api.getClipData();
    PARSELY.video.trackPause(playedVideoMetadata.id, videoMetaData(playedVideoMetadata));
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
