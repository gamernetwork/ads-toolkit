import $ from 'jquery';
import 'web-animations-js';

document.addEventListener('DOMContentLoaded', function() {
  // dom stuff
  const frame = frameElement;
  let frameTopDist = $(frame).offset().top;
  const targetFrameWidth = 1200;
  const targetFrameHeight = 500;
  const animDuration = 1000;
  const parentWindow = window.parent.window;
  const parentWindowHeight = parentWindow.innerHeight;
  const bg = document.querySelector('#bg');
  const item1 = document.querySelector('#item-1');
  const item2 = document.querySelector('#item-2');
  const item3 = document.querySelector('#item-3');
  const item4 = document.querySelector('#item-4');
  // scroll pos calculation
  let calcRaf;
  let lastScrollTop = 0;
  let mappedScrollVal = 0;
  let currScrollTop = 0;
  // lerp
  let scrollPerc = 0;
  let lerpedScrollVal = 0;
  const lerpAmount = 0.1; // lower the smooter
  // bg anim keyframes
  const bgKeyframes = [
    {
      transform: `translate3d(0px, 0px, 0px)`
    },
    {
      transform: `translate3d(0px, 250px, 0px)`
    }
  ];
  // bg anim
  const bgAnimation = bg.animate(bgKeyframes, {
    duration: animDuration,
    fill: `forwards`,
    easing: `linear`
  });
  // pause bg animation as will iterate on scroll
  bgAnimation.pause();
  // resize parent iframe
  const initFrame = () => {
    frame.width = `${targetFrameWidth}px`;
    frame.height = `${targetFrameHeight}px`;
  }
  initFrame();
  // scale an input to a new range
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
  // setup intersection observer
  const setupObserver = () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.isIntersecting ? (
          calculateFrameDistances(entry)
        ) : (
          cancelAnimationFrame(calcRaf)
        )
      })
    });
    observer.observe(frame);
  }
  // check if intersectionobserver is supported by default
  if('IntersectionObserver' in window) {
    setupObserver();
  } else {
    // add fallback / polyfill
    calculateFrameDistances()
  }
  // calculate distances
  function calculateFrameDistances ()  {
    currScrollTop = parentWindow.pageYOffset;
    // only run if the parent scroll value has changed
    if(currScrollTop !== lastScrollTop) {
      mappedScrollVal = scale((currScrollTop + parentWindowHeight) - frameTopDist, 0, parentWindowHeight + targetFrameHeight, 0, animDuration);
      lastScrollTop = currScrollTop;
    }
    calcRaf = requestAnimationFrame(calculateFrameDistances);
  }
  // additional animations
  const item1Animation = item1.animate(item1Keyframes, {
    duration: animDuration,
    fill: `forwards`,
    easing: `ease-in-out`
  });
  const item2Animation = item2.animate(item2Keyframes, {
    duration: animDuration,
    fill: `forwards`,
    easing: `ease-in-out`
  });
  const item3Animation = item3.animate(item3Keyframes, {
    duration: animDuration,
    fill: `forwards`,
    easing: `ease-in-out`
  });
  const item4Animation = item4.animate(item4Keyframes, {
    duration: animDuration,
    fill: `forwards`,
    easing: `ease-in-out`
  })
  item1Animation.pause();
  item2Animation.pause();
  item3Animation.pause();
  item4Animation.pause();
  // animate everything
  const animate = (scrollVal) => {
    let animVal = Math.round(scrollVal);
    bgAnimation.currentTime = animVal;
    item1Animation.currentTime = animVal;
    item2Animation.currentTime = animVal;
    item3Animation.currentTime = animVal;
    item4Animation.currentTime = animVal;
  }
  // smooth out the janky mcjankerson
  function lerpScrollInput ()  {
    scrollPerc = mappedScrollVal || 0;
    lerpedScrollVal += (scrollPerc-lerpedScrollVal)*lerpAmount;
    animate(lerpedScrollVal);
    requestAnimationFrame(lerpScrollInput);
  }
  lerpScrollInput();
});