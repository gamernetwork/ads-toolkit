import {applyBaseStyles} from './components/base-styles';

export const init = props => {
  // Apply skin styles if not in local dev mode
  !props.dev && (
    applyBaseStyles({
      site: props.site, 
      pageWrapper: props.pageWrapper, 
      takeoverBGColor: props.takeoverBGColor, 
      skinImg: props.skinImage,
      skinLink: props.skinLink,
      skinHeight: props.skinHeight,
      leaderboardHeight: props.leaderboardHeight,
      supersize: props.supersize,
      skinlong: props.skinLong
    })
  );
}




