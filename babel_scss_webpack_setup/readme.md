# Webpack setup for new format / microsite creation 

## Features 

+ ESLint config based on Airbnb's JS guidelines. Adapted a bit for ads-purposes. 
+ Full Babel support 
+ Can produce bundled .js files for microsites or insert bundled scripts internally for ad-formats / templates

## Usage

+ Work in src/ 
+ Use index.js as the entrypoint, other than that, any file structure / setup is fine

### Dev

+ `npm run dev` launches a dev server at localhost:8080 and cleans the dist/ dir 

### Prod 

+ `npm run build` cleans the dist/ directory and generated optimized, minified (if desired) `.js` files
+ These files can be inserted into internal `style` tags or bundles into standalone `.js` files

## Installation 

+ `git clone`
+ `cd babel_scss_webpack_setup`
+ `npm install`