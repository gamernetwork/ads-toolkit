import 'core-js/fn/string/includes';

import {applyBaseStyles} from './js/components/base-styles';
import {syncIframes} from './js/components/sync-iframes';
import {videoLightbox} from './js/components/video-player';
import {addAnalytics} from './js/components/analytics';

import './css/main.css';

addAnalytics();

let lightbox;

export const init = (props, clickUrlEsc) => {
  // Apply skin styles if not in local dev mode
  !props.dev && (
    applyBaseStyles({
      site: props.site, 
      pageWrapper: props.pageWrapper, 
      takeoverBGColor: props.takeoverBGColor, 
      skinImg: props.skinImage,
      skinLink: props.skinLink,
      skinHeight: props.skinHeight,
      skinTopOffset: props.skinTopOffset,
      leaderboardHeight: props.leaderboardHeight,
      supersize: props.supersize,
      skinlong: props.skinLong,
    }, clickUrlEsc)
  );
  syncIframes(props.site, props.skinImage);

  lightbox = el => {
    videoLightbox(el, props.analytics);
  }
}

export {lightbox};