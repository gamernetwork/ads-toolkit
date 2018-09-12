import {applyBaseStyles} from './js/components/base-styles';
import {syncIframes} from './js/components/sync-iframes';

import './css/main.css';

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
}




