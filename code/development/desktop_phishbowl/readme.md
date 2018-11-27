# The "Phishbowl"

## What is this unit? 

This unit is a revised verison of the original 'desktop fishbowl' which now includes scroll-based animation timelines, allowing for a far more impactful and versatile creative. 

## How to develop a new creative

As this unit requires bespoke animation elements, there is not a template in GAM as it would not really be possible to develop efficiently without getting instant visual feedback to your changes. For this reason, a local dev enviroment has been created. 

In order to create a new creative using this template: 

+ Fork / clone this repository
+ Navigate to `dist/`
+ Make a copy of the contents
+ Open up `index.html` with a live reload tool of you choice...
+ You will now see a blank page, scroll down to view the phishbowl unit,
which will be displaying in an iframe
+ Navigate to `dist/phishbowl.html` and locate the `<script></script>` tag
+ Any changes you make here to the 'keyframes' objects within
this script tag will determine the animation timeline's for each individual 
element (`#item-1` etc...)
+ The images with the classname `.item` are the animatable elements
+ When you are done and happy with the animation sequences, just copy and paste
the contents of `phishbowl.html` into a new custom creative within GAM

** Be sure to add `phishbowl.min.js` as a file macro **

## How to edit the lib

If you wish to make any optimisations or additions to the code code, this is what you want to do... 

+ Clone this repository 
+ Run `npm install` to install node dependancies
+ To spin up a dev server, run `npm run dev`
+ Make changes in `src/phishbowl.js`, these will be reflected instantly in the browser
+ When you are done, run `npm run build`
+ Once built, navigate to `dist/` and follow the previous instructions to build a new creative

## Development notes 

+ Each animation sequence's playback position is mapped to the on-screen position of the 
ad-unit. This means that as the user scrolls past the creative, each sequence will always 
run through it's entire duration. A good way to see this in action is to view the 
example url at https://bit.ly/2R6MbiI
+ You will notice that the `keyframe` animations specified in `phishbowl.html` always contain
4 keyframes. This is not required, however it is quite nice as it ensures that the animated item will always have reached its 'end' keyframe as the unit is in the center of the page.

## Additional Documentation

+ Performance table: https://docs.google.com/spreadsheets/d/1GCsphzBeFJplWSF3z9jZPp3yYVh9uwsQvpFD0grk8ho/edit#gid=0

+ Development docs: 
https://docs.google.com/document/d/1Q4_dm6MmvVespzVEokCCyF4JJ-VbtXr7-4kr6OdPxGc/edit