export function applyBaseStyles(props, clickUrlEsc) {
  let this_site = props.site;
  let page_wrapper = props.pageWrapper;
  let takeover_bg_color = props.takeoverBGColor;
  let takeover_skin_image = props.skinImg;
  let takeover_skin_link = props.skinLink;
  let skin_height = props.skinHeight;
  let leaderboard_height = props.leaderboardHeight;
  let supersize_me = props.supersize;
  let extendHalfpageNLPS = props.skinLong;
  let skin_top_offset = props.skinTopOffset;

  // Apply metabomb styles
  if (this_site == 'metabomb.net') {
    page_wrapper = '#page-wrapper';
    parent.jQuery('.billboard').css({
      'max-width': '1260px'
    });
    parent.jQuery('.billboard-container').css({
      'padding': '0'
    });
  }

  // Apply nintendolife and pushsquare styles
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
  }

  // Apply indiedb specific styles
  if (this_site == 'indiedb.com') {
    skin_top_offset = '-38';
  }

  // Apply road to vr specific styles
  if (this_site == 'roadtovr.com') {
    page_wrapper = '#td-outer-wrap > .td-outer-container';
  }

  // Apply mod / indie specific styles
  if (this_site == 'moddb.com' || this_site == 'indiedb.com') {
    parent.$('body').css('background', takeover_bg_color + ' url(' + takeover_skin_image + ') no-repeat center ' +
      skin_top_offset + 'px').prepend(
      "<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; z-index: 1; width: 100%; height: 100%;'></div>"
    );

    parent.$('#gn_takeover').click(function () {
      window.open(clickUrlEsc + takeover_skin_link, '_blank');
    });
  } else {

    // EG / RPS / general takeover styling
    if (page_wrapper !== '#site-wrapper') {
      parent.jQuery('body').addClass('skin');
    }

    // Add takeover to page wrapper
    parent.jQuery(page_wrapper).prepend(
      "<div id='gn_takeover' style='cursor: pointer; position: absolute; display: block; top: 0; left: 0; width: 100%; height: " +
      skin_height + "px;'></div>");

    // Apply styles to #gn_takeover
    parent.jQuery('#gn_takeover').each(function () {
      this.style.setProperty('background-color', takeover_bg_color, 'important');
      this.style.setProperty('background-image', 'url(' + takeover_skin_image + ')', 'important');
      this.style.setProperty('background-position', 'center ' + skin_top_offset + 'px', 'important');
      this.style.setProperty('background-repeat', 'no-repeat', 'important');
    });

    // gn_takeover metabomb specific styling
    if (this_site === 'metabomb.net') {
      parent.jQuery('#gn_takeover').css('z-index', '1');
      parent.jQuery('.billboard-container').css('position', 'relative');
      parent.jQuery('.billboard-container').css('z-index', '1');
    }

    // gn_takeover rps specific styling
    if (this_site == 'rockpapershotgun.com') {
      parent.jQuery('#gn_takeover').css('height', '1316px');
      parent.jQuery('#gn_takeover').css('z-index', '-1');
    }

    if(this_site == 'eurogamer.net') {
      parent.jQuery('#gn_takeover').css('height', '1316px');
    }

    if(this_site == 'usgamer.net') {
      parent.jQuery('#gn_takeover').css('height', '1316px');
    }

    // Attatch click listener to #gn_takeover
    parent.jQuery('#gn_takeover').click(function () {
      window.open(clickUrlEsc + takeover_skin_link, '_blank');
    });

    // Adjust leaderboard height and padding
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

    // Metabomb specific document styling
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
      // Resize leaderboatd iframe size for metabomb 
      window.frameElement.style.width = '1260px';
    }

    // If new leaderboard height is defined, attempt to resize
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
    }

    // Supersize code
    if (supersize_me) {
      parent.jQuery(".right-sidebar").remove();
      parent.jQuery(page_wrapper).each(function () {
        this.style.setProperty('background-color', takeover_bg_color, 'important');
      });
    }

    // Add skin-long class to nintendolife and pushsquare
    if (extendHalfpageNLPS) {
      parent.jQuery('body').addClass('skin-long');
    }

    // Ensure cursor is pointer for #gn_takeover
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

    // Ensure a click on #gn_takeover opens the click url
    parent.jQuery('html').bind('click', function (e) {
      if ((e.target == parent.jQuery(page_wrapper)[0]) && (e.pageY <= skin_height + parent.jQuery(page_wrapper)
        .position().top)) {
        window.open(clickUrlEsc + takeover_skin_link, '_blank');
      }
    });
  }
}