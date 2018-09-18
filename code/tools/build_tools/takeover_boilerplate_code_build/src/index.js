import 'core-js/fn/string/includes';

import {applyBaseStyles} from './js/components/base-styles';
import {syncIframes} from './js/components/sync-iframes';
import {videoLightbox, appendLightboxSource} from './js/components/video-player';
import {addAnalytics} from './js/components/analytics';

import './css/main.css';

addAnalytics();

let lightbox;

export const init = (props, clickUrlEsc) => {
  // Apply skin styles if not in local dev mode
  !props.dev && (
    applyBaseStyles({
      site: props.site, 
      pageWrapper: props.pageWrapper != null ? props.pageWrapper : '#page-wrapper', 
      takeoverBGColor: props.takeoverBGColor != null ? props.takeoverBGColor : 'black', 
      skinImg: props.skinImg,
      skinLink: props.skinLink,
      skinHeight: props.skinHeight != null ? props.skinHeight : 1300,
      skinTopOffset: props.skinTopOffset != null ? props.skinTopOffset: '0',
      leaderboardHeight: props.leaderboardHeight != null ? props.leaderboardHeight : '250',
      supersize: props.supersize != null ? props.supersize : false,
      skinlong: props.skinLong != null ? props.skinLong : true,
    }, clickUrlEsc)
  );
  appendLightboxSource();
  syncIframes(props.site, props.skinImg, props.dev);

  lightbox = el => {
    videoLightbox(el, props.analytics);
  };
};

export {lightbox};