
function waitForBBW() {
  return new Promise((resolve) => {
    if (typeof bluebillywig !== "undefined" && $$wrapper) {
      return resolve();
    }

    const observer = new MutationObserver((mutations) => {
      if (typeof bluebillywig !== "undefined" && $$wrapper) {
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
    bbwVideoBg,
    bbwVideoBgText,
    nextTitle;
  let bbwBgHeight = (window.innerWidth * 0.45) / 1.78 + 4 + 4;

  function openBBWPlayer() {
    bbwVideoBg.style.transform = `translate3d(0,${bbwBgHeight}px,0)`;
    bbwVideoBg.style.opacity = "1";
    bbwVideoBgText.style.opacity = "1";
    bbwVideoBgText.style.transform = "scaleY(1) translate3d(0,0,0)";
    bbwCloseButton.style.top = "-2px";
    bbwCloseButton.style.right = "-53.5vw";
    bbwCloseButton.style.opacity = "0";
    bbwCloseButton.style.borderRadius = "0";
    bbwCloseButton.style.padding = "20px";
    bbwVideoPlayer.style.top = "4px";
    bbwVideoPlayer.style.left = "4px";
  }
  function closeBBWPlayer() {
    bbwVideoBg.style.transform = "translate3d(0,0,0)";
    bbwVideoBg.style.opacity = "0";
    bbwVideoBgText.style.opacity = "0";
    bbwVideoBgText.style.transform = "scaleY(0) translate3d(0,0,0)";
    bbwWrapper.style.width = "100%";
    bbwWrapper.style.height = "100%";
  }

  nextTitle = document
    .querySelector(".bb_iawr")
    .querySelector('.bb-item-prop[itemprop="name"]').content;

  function checkTitleLength(title) {
    title.length > 94 ? (title = title.slice(0, 94) + "...") : "";
    return title;
  }

  const separator = () => (nextTitle.indexOf(":") > -1 ? " - " : ": ");

  // Add bg
  document
    .querySelector(".page_content")
    .insertAdjacentHTML(
      "afterbegin",
      `<div class="bbw_video_bg" style="position:fixed; top:${-bbwBgHeight}px; left: 0; width:100vw; height:${bbwBgHeight}px; z-index: 9; opacity: 0; background: #44208d; pointer-events: none; transform-origin: top;"><div style="position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; border-radius: 25px; line-height: 20px; font-size: 21px; font-weight: bold;border-width:2px;border-style:solid;border-color:rgb(39,134,106); color: rgb(39, 134, 106); text-align: center; display:flex; justify-content:center; align-items:center;">×</div></div>`
    );

  // Add text
  document
    .querySelector(".page_content")
    .insertAdjacentHTML(
      "afterbegin",
      `<div class="bbw_video_bg_text" style="position:fixed; top: 0; right: 4vw; width: 47vw; z-index: 11;padding: 4px 4px 4px 0;line-height: 1.4; transform: translate3d(0,${-bbwBgHeight}px,0) scaleY(0); transform-origin: center top; opacity: 0; pointer-events: none; height:${bbwBgHeight}px; display:flex; justify-content: center; flex-direction: column;"><p style="color:white; font-size: 3.6vw;"><span class="bb_player_text_prefix"><strong>Playing next${separator()}</strong></span>${checkTitleLength(
        nextTitle
      )}</p></div>`
    );

  $$wrapper.on("outview.bbskin", (e) => {
    if (top.document.querySelector(".bb-float-close-button")) {
      top.document.querySelector(".bb-float-close-button").style.opacity = "0";
    }
  });

  $$wrapper.on("resized.bbskin", (e) => {
    bbwWrapper = document.querySelector(".bb_iawr");
    bbwVideoPlayer = document.querySelector(".bb-media");
    bbwCloseButton = bbwWrapper.querySelector(".bb-float-close-button");
    bbwVideoBg = document.querySelector(".bbw_video_bg");
    bbwVideoBgText = document.querySelector(".bbw_video_bg_text");

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
    ) {
      top.document.querySelector(
        ".bb_player_text_prefix"
      ).innerHTML = `<strong>Now Playing${separator()}</strong>`;
    }
    if (
      typeof bluebillywig.players[0] !== "undefined" &&
      $$api.getPhase() == "EXIT"
    ) {
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