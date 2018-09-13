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
      site: props.site !== undefined ? props.site : '%%SITE%%', 
      pageWrapper: props.pageWrapper !== undefined ? props.pageWrapper : '#page-wrapper', 
      takeoverBGColor: props.takeoverBGColor !== undefined ? props.takeoverBGColor : 'black', 
      skinImg: props.skinImg !== undefined ? props.skinImage : '%%FILE:SKIN%%',
      skinLink: props.skinLink !== undefined ? props.skinLink : '%%DEST_URL%%',
      skinHeight: props.skinHeight !== undefined ? props.skinHeight : 1300,
      skinTopOffset: props.skinTopOffset !== undefined ? props.skinTopOffset: '0',
      leaderboardHeight: props.leaderboardHeight !== undefined ? props.leaderboardHeight : '250',
      supersize: props.supersize !== undefined ? props.supersize : false,
      skinlong: props.skinLong !== undefined ? props.skinLong : true,
    }, clickUrlEsc)
  );
  syncIframes(props.site, props.skinImage);

  lightbox = el => {
    videoLightbox(el, props.analytics);
  }
}

export {lightbox};