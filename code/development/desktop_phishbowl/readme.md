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
